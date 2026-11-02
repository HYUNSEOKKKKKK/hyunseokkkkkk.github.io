(() => {
  "use strict";
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const videos = [...document.querySelectorAll(".preview-video")];
  const youtubePreviews = [...document.querySelectorAll("[data-youtube-preview]")].map(element => ({
    element, player:null, ready:false, requested:false, unavailable:false, visible:false, timer:null
  }));
  const youtubeByElement = new Map(youtubePreviews.map(state => [state.element, state]));
  const mediaToggle = document.querySelector("[data-media-toggle]");
  let paused = motion.matches;
  let apiRequested = false;

  function command(state, func) {
    if (state.ready && typeof state.player?.[func] === "function") state.player[func]();
  }
  function showFallback(state) {
    if (state.element.classList.contains("has-player")) return;
    state.unavailable = true;
    const button = state.element.querySelector("[data-youtube-play]");
    button.textContent = "Watch on YouTube ↗";
    button.setAttribute("aria-label", "Watch the " + state.element.dataset.videoTitle + " video on YouTube");
  }
  function shouldPlay(state) {
    return !paused && state.visible && !document.hidden;
  }
  function mountYouTube(state) {
    if (state.player) return;
    state.requested = true;
    if (!state.timer) state.timer = window.setTimeout(() => showFallback(state), 15000);
    if (!window.YT?.Player) {
      if (!apiRequested) {
        apiRequested = true;
        window.onYouTubeIframeAPIReady = () => youtubePreviews.filter(item => item.requested).forEach(mountYouTube);
        const script = document.createElement("script");
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        script.addEventListener("error", () => youtubePreviews.filter(item => item.requested).forEach(showFallback));
        document.head.append(script);
      }
      return;
    }
    const mount = document.createElement("div");
    state.element.prepend(mount);
    const clip = {
      videoId:state.element.dataset.videoId,
      startSeconds:Number(state.element.dataset.start),
      endSeconds:Number(state.element.dataset.end)
    };
    state.player = new window.YT.Player(mount, {
      host:"https://www.youtube-nocookie.com", videoId:clip.videoId,
      playerVars:{autoplay:1, mute:1, controls:1, playsinline:1, rel:0, start:clip.startSeconds, end:clip.endSeconds, origin:location.origin},
      events:{
        onReady(event) {
          state.ready = true;
          event.target.getIframe().title = state.element.dataset.videoTitle + " — official DRCD Lab preview";
          event.target.mute();
          if (shouldPlay(state)) event.target.playVideo();
          else event.target.pauseVideo();
        },
        onStateChange(event) {
          if (event.data === window.YT.PlayerState.PLAYING) {
            if (!shouldPlay(state)) {
              event.target.pauseVideo();
              return;
            }
            state.unavailable = false;
            state.element.classList.add("has-player");
          }
          if (event.data === window.YT.PlayerState.ENDED && shouldPlay(state)) event.target.loadVideoById(clip);
        },
        onError() {
          state.element.classList.remove("has-player");
          showFallback(state);
        }
      }
    });
  }
  function syncVideo(video) {
    if (paused || document.hidden || video.dataset.visible !== "true") video.pause();
    else video.play()?.catch(() => {});
  }
  function syncAll() {
    videos.forEach(syncVideo);
    youtubePreviews.forEach(state => {
      if (shouldPlay(state)) {
        mountYouTube(state);
        command(state, "playVideo");
      } else command(state, "pauseVideo");
    });
    mediaToggle.textContent = paused ? "Play previews" : "Pause previews";
    mediaToggle.setAttribute("aria-pressed", String(paused));
  }
  videos.forEach(video => {
    video.muted = true;
    if (motion.matches) { video.removeAttribute("autoplay"); video.pause(); }
    video.addEventListener("error", () => {
      video.hidden = true;
      const poster = document.createElement("img");
      poster.src = video.poster;
      poster.alt = video.getAttribute("aria-label") || "Recorded robot experiment";
      video.parentElement.prepend(poster);
    }, {once:true});
  });
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      const state = youtubeByElement.get(entry.target);
      if (state) { state.visible = entry.isIntersecting; syncAll(); }
      else { entry.target.dataset.visible = String(entry.isIntersecting); syncVideo(entry.target); }
    }), {threshold:.25});
    videos.forEach(video => observer.observe(video));
    youtubePreviews.forEach(state => observer.observe(state.element));
  } else {
    videos.forEach(video => { video.dataset.visible = "true"; syncVideo(video); });
  }
  youtubePreviews.forEach(state => state.element.querySelector("[data-youtube-play]")?.addEventListener("click", () => {
    if (state.unavailable) {
      window.open("https://www.youtube.com/watch?v=" + state.element.dataset.videoId, "_blank", "noopener,noreferrer");
      return;
    }
    state.visible = true;
    paused = false;
    mountYouTube(state);
    syncAll();
  }));
  mediaToggle?.addEventListener("click", () => { paused = !paused; syncAll(); });
  motion.addEventListener("change", event => { paused = event.matches; syncAll(); });
  document.addEventListener("visibilitychange", syncAll);
  syncAll();

  const filters = [...document.querySelectorAll("[data-filter]")];
  const projects = [...document.querySelectorAll("[data-categories]")];
  document.querySelector(".research-filter").hidden = false;
  function filterProjects(category) {
    filters.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.filter === category)));
    let count = 0;
    projects.forEach(project => {
      project.hidden = category !== "all" && !project.dataset.categories.split(" ").includes(category);
      if (!project.hidden) count += 1;
    });
    document.querySelector("[data-filter-status]").textContent = count + (count === 1 ? " project shown." : " projects shown.");
  }
  filters.forEach(button => button.addEventListener("click", () => filterProjects(button.dataset.filter)));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", () => {
    if (projects.some(project => "#" + project.id === link.hash)) filterProjects("all");
  }));
  const cv = document.querySelector("#cv");
  function revealHash() {
    if (location.hash === "#cv") cv.open = true;
    if (location.hash === "#publications") filterProjects("all");
  }
  document.querySelector("[data-open-cv]").addEventListener("click", () => { cv.open = true; });
  window.addEventListener("hashchange", revealHash);
  revealHash();

  const bibToggle = document.querySelector("[data-bib-toggle]");
  const bibPanel = document.querySelector("#gcs-bibtex");
  bibToggle.addEventListener("click", () => {
    const open = bibToggle.getAttribute("aria-expanded") !== "true";
    bibToggle.setAttribute("aria-expanded", String(open));
    bibPanel.hidden = !open;
  });
  document.querySelector("[data-copy-bib]").addEventListener("click", async event => {
    const button = event.currentTarget;
    const code = document.querySelector("#citation-text");
    const status = document.querySelector("[data-copy-status]");
    try {
      await navigator.clipboard.writeText(code.textContent.trim());
      button.textContent = "Copied";
      status.textContent = "BibTeX citation copied.";
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);
      if (document.execCommand("copy")) {
        button.textContent = "Copied";
        status.textContent = "BibTeX citation copied.";
      } else {
        status.textContent = "Citation selected. Use your browser’s copy command.";
      }
    }
  });
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
})();

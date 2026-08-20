(() => {
  "use strict";

  const header = document.querySelector("[data-header]");
  const menuToggle = document.querySelector("[data-menu-toggle]");
  const navigation = document.querySelector("[data-navigation]");
  const navLinks = [...document.querySelectorAll("[data-nav-link]")];
  const sections = [...document.querySelectorAll("[data-section]")];
  const revealItems = [...document.querySelectorAll(".reveal")];
  const mobileQuery = window.matchMedia("(max-width: 900px)");

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 18);
  };

  const setMenu = (open, returnFocus = false) => {
    if (!menuToggle || !navigation) return;

    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
    navigation.dataset.open = String(open);
    header?.classList.toggle("is-menu-open", open);
    document.body.classList.toggle("menu-open", open && mobileQuery.matches);

    if (open) {
      window.requestAnimationFrame(() => navLinks[0]?.focus());
    } else if (returnFocus) {
      menuToggle.focus();
    }
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    setMenu(!isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("click", (event) => {
    if (!mobileQuery.matches || !navigation || !menuToggle) return;
    if (menuToggle.getAttribute("aria-expanded") !== "true") return;
    if (navigation.contains(event.target) || menuToggle.contains(event.target)) return;
    setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle?.getAttribute("aria-expanded") === "true") {
      setMenu(false, true);
    }
  });

  const closeMenuAtDesktop = (event) => {
    if (!event.matches) setMenu(false);
  };

  if (typeof mobileQuery.addEventListener === "function") {
    mobileQuery.addEventListener("change", closeMenuAtDesktop);
  } else {
    mobileQuery.addListener(closeMenuAtDesktop);
  }

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  const setActiveLink = (sectionId) => {
    const navigationId = sectionId === "platforms" ? "research" : sectionId;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute("href") === `#${navigationId}`;
      if (isActive) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) setActiveLink(visible[0].target.id);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0, 0.1, 0.25] }
    );

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    setActiveLink("home");
  }

  if ("IntersectionObserver" in window && revealItems.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index % 3, 2) * 55}ms`;
      revealObserver.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const profileImage = document.querySelector(".profile-image-frame img");
  profileImage?.addEventListener("error", () => {
    profileImage.hidden = true;
  });

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());
})();

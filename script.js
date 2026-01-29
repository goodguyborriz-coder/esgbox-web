document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     SCROLL-IN ANIMACE SEKCI
  ========================= */

  const reveals = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach(section => {
    revealObserver.observe(section);
  });

  /* 🔑 KRITICKÁ OPRAVA:
     odhalíme sekce, které jsou už při loadu ve viewportu */
  reveals.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.85) {
      section.classList.add("is-visible");
    }
  });

  /* =========================
     AKTIVNÍ POLOŽKA MENU
  ========================= */

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const activateMenu = () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active", "is-active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("is-active");
      }
    });
  };

  window.addEventListener("scroll", activateMenu);
  activateMenu(); // i při loadu
});

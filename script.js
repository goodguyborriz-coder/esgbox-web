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
(function () {
  const el = document.querySelector("[data-wobble]");
  if (!el) return;

  const text = el.textContent;
  el.textContent = "";

  [...text].forEach(ch => {
    const span = document.createElement("span");
    span.className = "ch";
    span.textContent = ch;
    el.appendChild(span);
  });

  const chars = el.querySelectorAll(".ch");

  const setOffsets = () => {
    chars.forEach(c => {
      const dx = (Math.random() * 3 - 1.5).toFixed(2);
      const dy = (Math.random() * 3 - 1.5).toFixed(2);
      c.style.setProperty("--dx", dx + "px");
      c.style.setProperty("--dy", dy + "px");
    });
  };

  el.addEventListener("mouseenter", () => {
    setOffsets();
    el.classList.add("is-hover");
  });

  el.addEventListener("mouseleave", () => {
    el.classList.remove("is-hover");
  });
})();

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL-IN ANIMACE
  ========================= */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================
     AKTIVNÍ MENU PODLE SCROLLU
  ========================= */
  const sections = document.querySelectorAll("section[id]:not(#hero)");
  const navLinks = document.querySelectorAll(".main-nav a");

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");

          navLinks.forEach(link => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${id}`
            );
          });
        }
      });
    },
    {
      /* kompenzace fixního headeru */
      rootMargin: "-40% 0px -40% 0px"
    }
  );

  sections.forEach(section => navObserver.observe(section));

});

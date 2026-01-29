document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL-IN ANIMACE SEKCE A KARET
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
    {
      threshold: 0.15
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));


  /* =========================
     AKTIVNÍ POLOŽKA MENU PODLE SCROLLU
  ========================= */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const navObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute("id");

          navLinks.forEach(link => {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === `#${currentId}`
            );
          });
        }
      });
    },
    {
      /* 
        Aktivní sekce je ta, která je přibližně
        uprostřed viewportu – kultivované chování,
        žádné blikání.
      */
      rootMargin: "-50% 0px -50% 0px"
    }
  );

  sections.forEach(section => navObserver.observe(section));

});

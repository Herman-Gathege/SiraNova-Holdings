// main.js

document.addEventListener("DOMContentLoaded", () => {
  // ✅ Mobile Nav Toggle
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  if (burger && navLinks) {
    burger.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      burger.classList.toggle("toggle");
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        burger.classList.remove("toggle");
      });
    });
  }

  // ✅ Stats Counter
  const counters = document.querySelectorAll(".count");
  let started = false;

  function startCount() {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 100;

        if (current < target) {
          counter.innerText = Math.ceil(current + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  }

  const stats = document.querySelector(".hero-stats");
  if (stats) {
    window.addEventListener("scroll", () => {
      const statsTop = stats.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (!started && statsTop < windowHeight) {
        startCount();
        started = true;
      }
    });
  }

  // ✅ Portfolio Load More
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenItems = document.querySelectorAll(".portfolio-item.hidden");

      hiddenItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("hidden");
          item.classList.add("fade-in");
        }, index * 100);
      });

      loadMoreBtn.style.display = "none";
    });
  }

  // ✅ Contact Form Submission
  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", async function (e) {
      e.preventDefault();

      const formData = new FormData(form);

      try {
        const response = await fetch(form.action, {
          method: form.method,
          body: formData,
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          alert(" Thank you! Your message has been sent.");
          form.reset();
        } else {
          alert(" Oops! There was a problem submitting your form.");
          console.error("Formspree error:", await response.json());
        }
      } catch (error) {
        alert(" Network error. Please try again later.");
        console.error("Network error during form submission:", error);
      }
    });
  }

  // ✅ FAQ Toggle Behavior
  document.querySelectorAll(".faq-item").forEach((item) => {
    item.addEventListener("toggle", function () {
      if (this.open) {
        document.querySelectorAll(".faq-item").forEach((otherItem) => {
          if (otherItem !== this) {
            otherItem.removeAttribute("open");
          }
        });
      }
    });
  });

  // ✅ Modal Logic
  const bannerBtn = document.querySelector(".banner-btn");
  const closeModal = document.querySelector(".close-modal");
  const consultModal = document.getElementById("consultModal");

  if (bannerBtn && consultModal) {
    bannerBtn.addEventListener("click", function (e) {
      e.preventDefault();
      consultModal.style.display = "block";
    });
  }

  if (closeModal && consultModal) {
    closeModal.addEventListener("click", function () {
      consultModal.style.display = "none";
    });

    window.addEventListener("click", function (e) {
      if (e.target === consultModal) {
        consultModal.style.display = "none";
      }
    });
  }

  // ✅ Scrollspy for Active Nav Links on Same Page
  const sections = document.querySelectorAll("section[id]");
  const navLinkItems = document.querySelectorAll(".nav-links a[href^='#']");

  function setActiveNavLink() {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinkItems.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", setActiveNavLink);

  // ✅ Preloader fade-out with test delay
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    if (preloader) {
      // Add a fake 2 second delay so you can see the preloader
      setTimeout(() => {
        preloader.style.opacity = "0";
        preloader.style.pointerEvents = "none";
        setTimeout(() => {
          preloader.remove(); // fully remove after fade-out
        }, 500);
      }, 0); // <--- 2 seconds for testing
    }
  });
});

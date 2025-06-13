document.addEventListener("DOMContentLoaded", () => {
  const burger = document.querySelector(".burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    burger.classList.toggle("toggle");
  });

  // 👇 Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove("open");
      burger.classList.remove("toggle");
    });
  });

  const counters = document.querySelectorAll(".count");
  let started = false;

  function startCount() {
    counters.forEach(counter => {
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

  window.addEventListener("scroll", () => {
    const stats = document.querySelector(".hero-stats");
    const statsTop = stats.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (!started && statsTop < windowHeight) {
      startCount();
      started = true;
    }
  });

  const loadMoreBtn = document.getElementById("loadMoreBtn");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const hiddenItems = document.querySelectorAll(".portfolio-item.hidden");

      hiddenItems.forEach((item, index) => {
        setTimeout(() => {
          item.classList.remove("hidden");
          item.classList.add("fade-in");
        }, index * 100); // staggered reveal
      });

      loadMoreBtn.style.display = "none"; // hide button after loading
    });
  }

  // ✅ Add form submission handler here
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async function (e) {
      e.preventDefault(); // Stop default form submission
      const formData = new FormData(form);
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        alert("Thank you! Your message has been sent.");
        form.reset();
      } else {
        alert("Oops! There was a problem submitting your form.");
      }
    });
  }
});


document.querySelectorAll('.faq-item').forEach((item) => {
    item.addEventListener('toggle', function () {
      if (this.open) {
        document.querySelectorAll('.faq-item').forEach((otherItem) => {
          if (otherItem !== this) {
            otherItem.removeAttribute('open');
          }
        });
      }
    });
  });
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

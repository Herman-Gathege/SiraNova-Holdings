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
});


 document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
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
  });
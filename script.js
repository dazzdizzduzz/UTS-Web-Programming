const slides = document.querySelector(".slides");
let index = 0;

function showNextSlide() {
  index = (index + 1) % slides.children.length;
  slides.style.transform = `translateX(${-index * 100}%)`;
}

setInterval(showNextSlide, 5000);

let currentIndex = 0;
const images = document.querySelectorAll(".slider img");
const slideInterval = setInterval(() => {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}, 3000);

const gameCards = document.querySelectorAll(".game-card");
window.addEventListener("scroll", () => {
  gameCards.forEach((card) => {
    const rect = card.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) {
      card.classList.add("visible");
    } else {
      card.classList.remove("visible");
    }
  });
});
const searchInput = document.querySelector("#search-bar");
searchInput.addEventListener("input", () => {
  const filter = searchInput.value.toLowerCase();
  gameCards.forEach((card) => {
    const title = card.querySelector("h2").textContent.toLowerCase();
    if (title.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});

window.addEventListener("scroll", () => {
  document.querySelector(".parallax").style.backgroundPositionY = `${window.scrollY * 0.5}px`;
});

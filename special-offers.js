document.addEventListener("DOMContentLoaded", function () {
  const countdownElements = document.querySelectorAll(".countdown");
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartCountElement = document.getElementById("cart-count");

  updateCartCount();

  countdownElements.forEach((countdownEl) => {
    let timeLeft = 60 * 60 * 23;

    const timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        countdownEl.textContent = "Offer Expired";
      } else {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        countdownEl.textContent = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        timeLeft--;
      }
    }, 1000);
  });

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
  }

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const title = button.getAttribute("data-title");
      const price = button.getAttribute("data-price");

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ title, price });
      localStorage.setItem("cart", JSON.stringify(cart));

      updateCartCount();

      if (Notification.permission === "granted") {
        new Notification("Added to Cart", {
          body: `${title} has been added to your cart.`,
        });
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {
          if (permission === "granted") {
            new Notification("Added to Cart", {
              body: `${title} has been added to your cart.`,
            });
          }
        });
      }
    });
  });
});

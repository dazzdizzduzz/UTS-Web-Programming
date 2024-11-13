document.addEventListener("DOMContentLoaded", function () {
  const cartItemsList = document.getElementById("cart-items");
  const checkoutButton = document.querySelector(".checkout-button");
  const clearCartButton = document.querySelector(".clear-cart-button");
  const checkoutFormPopup = document.getElementById("checkout-form-popup");
  const checkoutForm = document.getElementById("checkout-form");

  function updateCartDisplay() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartItemsList.innerHTML = "";
    cart.forEach((item) => {
      const cartItem = document.createElement("li");
      cartItem.textContent = `${item.title} - $${item.price}`;
      cartItemsList.appendChild(cartItem);
    });
  }
  updateCartDisplay();

  clearCartButton.addEventListener("click", () => {
    localStorage.removeItem("cart");
    updateCartDisplay();
    alert("Cart has been cleared!");
  });

  checkoutButton.addEventListener("click", () => {
    checkoutFormPopup.style.display = "flex";
  });

  window.closeForm = function () {
    checkoutFormPopup.style.display = "none";
  };

  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.removeItem("cart");
    updateCartDisplay();
    checkoutFormPopup.style.display = "none";
    alert("Checkout successful!");
  });
});

class Cart {
  cart = JSON.parse(localStorage.getItem("cart")) || [];

  renderCart() {
    const cartContainer = document.querySelector(".products");

    this.cart.forEach((product) => {
      cartContainer.innerHTML += `
            <li data-id="${product.id}">
                  <div class="remove__btn">
                     <em class="fas fa-times-circle remove__item"></em>
                  </div>
        
                  <div class="product__img">
                     <img src="./${product.image}" alt="">
                  </div>
        
                  <div class="product__name">
                     <span>${product.name}</span>
                  </div>
        
                  <div class="product__quantity">
                     <em class="fas fa-minus decrease__item"></em>
                     <span>${product.quantity}</span>
                     <em class="fas fa-plus increase__item"></em>
                  </div>
                  
                  <div class="product__price">
                     $<span>${product.price}</span>
                  </div>
             </li>
           `;
    });
    const totalContainer = document.querySelector(".total__container");

    totalContainer.innerHTML += `
        <div class="basketTotalContainer">
            <h4 class="basketTotalTitle">Total Price</h4>
            <h4 class="basketTotal">${this.sumOfCart()} $</h4>
        </div>
        `;
  }

  sumOfCart() {
    return this.cart.reduce((accumulator, value) => {
      return accumulator + value.quantity * value.price;
    }, 0);
  }

  removeHandler() {
    const btns = document.querySelectorAll(".remove__item");

    btns.forEach((button) => {
      button.addEventListener("click", (evt) => {
        this.removeItem(evt);
      });
    });
  }

  quantityHandler() {
    const increaseBtns = document.querySelectorAll(".increase__item");
    const decreaseBtns = document.querySelectorAll(".decrease__item");

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        this.increaseQuantity(evt);
      });
    });

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", (evt) => {
        this.decreaseQuantity(evt);
      });
    });
  }

  increaseQuantity(evt) {
    const totalPrice = document.querySelector(".basketTotal");

    const id = Number(
      evt.target.parentElement.parentElement.getAttribute("data-id")
    );
    this.cart.map((item) => {
      if (item.id === id) {
        item.quantity++;
        evt.target.parentElement.querySelector(
          "span"
        ).innerHTML = `${item.quantity}`;
        totalPrice.innerHTML = `${this.sumOfCart()}$`;
      }
    });
    this.renderCartCount(this.getCartQuantity());
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  decreaseQuantity(evt) {
    const totalPrice = document.querySelector(".basketTotal");
    const id = Number(
      evt.target.parentElement.parentElement.getAttribute("data-id")
    );
    this.cart.map((item) => {
      if (item.id === id) {
        if (item.quantity === 1) return;
        item.quantity--;
        evt.target.parentElement.querySelector(
          "span"
        ).innerHTML = `${item.quantity}`;
        totalPrice.innerHTML = `${this.sumOfCart()}$`;
      }
    });
    this.renderCartCount(this.getCartQuantity());
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  removeItem(evt) {
    const currId = Number(
      evt.target.parentElement.parentElement.getAttribute("data-id")
    );
    const index = this.cart.findIndex((element) => element.id === currId);

    this.cart.splice(index, 1);

    evt.target.parentElement.parentElement.remove();

    this.renderCartCount(this.getCartQuantity());
    localStorage.setItem("cart", JSON.stringify(this.cart));
    document.querySelector(".basketTotal").innerHTML = `${this.sumOfCart()} $`;
  }

  renderCartCount(value) {
    document.getElementById("cartValue").innerHTML = `${value}`;
  }

  getCartQuantity() {
    return this.cart.reduce((accumulator, value) => {
      return accumulator + value.quantity;
    }, 0);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();
  cart.renderCart();
  cart.renderCartCount(cart.getCartQuantity());
  cart.removeHandler();
  cart.quantityHandler();
});
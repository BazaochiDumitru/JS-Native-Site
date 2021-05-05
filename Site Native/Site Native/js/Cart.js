class Cart  {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  _shippingPrice = 0;

  renderCart() {
    const cartContainer = document.querySelector(".products");

    this.cart.forEach((product) => {
      cartContainer.innerHTML += Templates.cartProduct(product);
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
    }, 0) + this._shippingPrice;
  }

  showCartSum(newPrice) {
    document.querySelector('.basketTotal').innerHTML = `${newPrice} $`;
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
    const id = Number(
      evt.target.parentElement.parentElement.getAttribute("data-id")
    );
    this.cart.map((item) => {
      if (item.id === id) {
        item.quantity++;
        evt.target.parentElement.querySelector(
          "span"
        ).innerHTML = `${item.quantity}`;
        this.showCartSum(this.sumOfCart());
      }
    });
    this.renderCartCount(this.getCartQuantity());
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  decreaseQuantity(evt) {
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
        this.showCartSum(this.sumOfCart());
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
    this.showCartSum(this.sumOfCart());
  }

  renderCartCount(value) {
    document.getElementById("cartValue").innerHTML = `${value}`;
  }

  getCartQuantity() {
    return this.cart.reduce((accumulator, value) => {
      return accumulator + value.quantity;
    }, 0);
  }

  validate() {
    const validateBtn = document.getElementById("validate");

     validateBtn.addEventListener('click', () => {
      this.confirm();
    })
  }

  deliveryHandler() {
    const delivery = document.getElementById('delivery');

    delivery.onchange = (evt) => {
      this._shippingPrice = parseInt(evt.target.value);
      this.showCartSum(this.sumOfCart());
    }
  }

  confirm() {
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const phoneRegexp = /^[\+373|373]*[0]*[0-9]{7,8}$/;
    const addressRegexp = /^[a-zA-Z0-9\s,'-]{4,}$/;
    const name = document.getElementById("name");

    if (!(new RegExp(addressRegexp).test(address.value) && address.value.length < 20)) {
      console.log("Wrong address");
      alert('Wrong address');
      return;
    }

    if (!(new RegExp(/^[a-zA-Z ]{2,30}$/).test(name.value))) {
      console.log("wrong name");
      alert('Wrong name');
      return;
    }

    if (!(new RegExp(phoneRegexp).test(phone.value))) {
      console.log("Wrong phone");
      alert('Wrong phone');
      return;
    }

    console.log("Data sent successfully!");
    alert('Data sent successfully!');
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cart = new Cart();

  cart.renderCart();
  cart.renderCartCount(cart.getCartQuantity());
  cart.removeHandler();
  cart.quantityHandler();
  cart.validate();
  cart.deliveryHandler();
});
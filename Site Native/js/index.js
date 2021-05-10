class index {
    cart = JSON.parse(localStorage.getItem("cart")) || [];

    getCartQuantity() {
        return this.cart.reduce((accumulator, value) => {
            return accumulator + value.quantity
        }, 0)
    }
    renderCartCount(value) {
        document.getElementById("cartValue").innerHTML = `${value}`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const example = new index();
    example.renderCartCount(example.getCartQuantity());
});
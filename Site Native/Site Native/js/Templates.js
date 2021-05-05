class Templates {
    static productTemplate = product =>
        ` <article class="prod">
            <div class="item-container" data-id="${product.id}">
                  <div class="card-item">
                     <img src="img/${product.tag}.png" alt="img" class="card-img">
                     <p class="item-name">${product.name}</p>
                     <p class="item-description">${product.description}</p>
                  </div>
                  <h3 class="item-price">Price : <span class="item-price-value">${product.price}</span> $ </h3>
                  <em><button class="product__btn btn add-cart">Add to cart</button></em>
               </div>
            </article>`;

    static cartProduct = product =>
        `<li data-id="${product.id}">
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
        </li>`;
}
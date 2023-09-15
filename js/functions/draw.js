export function drawProducts(database){
    let html = ''

    for (const {id, category, image, name, price, quantity,description} of database.products) {

        const iconAdd = quantity ? `<i class='bx bx-plus' id="${id}"></i> `: ``

        if(quantity!=0){
            html += `
            <div class="product">
                <div class="product__img">
                    <img src="${image}" alt="">
                </div>
                <div class="product__info">
                    <div class="product__info__forCart">
                        <div class="forcar__price"><h3>$${price}.00</h3></div>
                        <div class="forcar__stock">stock:${quantity}</div>
                    </div>
                    <div class="product__info__name">
                    <div class="btn__name"><button class="btn__name btn0" value="${image}ñ${name}ñ${description}ñ${price}">${name}</button></div>
                    </div>
                    <div class="prueba">${iconAdd}</div>
                </div>
            </div>
        `;
        }else{
            html +=`
            <div class="product">
                <div class="product__img">
                    <img src="${image}" alt="">
                </div>
                <div class="product__info">
                    <div class="product__info__forCart">
                        <div class="forcar__price"><h3>$${price}.00</h3></div>
                        <div class="forcar__stock1">Sold out</div>
                    </div>
                    <div class="product__info__name1">
                    <div class="btn__name"><button class="btn__name">${name}</button></div>
                    </div>
                </div>
            </div>
        `;
        }
        
        
    }

    document.querySelector(".products").innerHTML = html;
}
export function drawProductsInCart(database){
    let html = "";

    for (const {id, amount, image, price, name, quantity} of Object.values(database.cart)) {
        html += `
            <div class="cart__product">
                <div class="cart__product__img">
                    <img src="${image}" alt="">
                </div>
                
                <div class="cart__product__info">
                    <div class="info__name"><h3>${name}</h3></div>
                    <div class="info__inf">
                        <div class="inf_stock"><p>stock:${quantity} | </p></div>
                        <div class="inf_price"><p> ${price}.0 USD</p></div>
                    </div>

                    <div class="info__subtotal"><p>Subtotal: $${price * amount}.00 </p></div>

                    <div class="product__info__opt" id="${id}">
                    
                        <i class='bx bx-minus' ></i>
                        <span>${amount} Unit</span>
                        <i class='bx bx-plus' ></i>
                        <i class='bx bx-trash-alt' ></i>

                    </div>

                </div>

            </div>
            `;
    }

            document.querySelector(".cart__products").innerHTML = html;
}
export function drawTotal(database){
    const totalItems = document.querySelector("#totalItems");
    const totalMoney = document.querySelector("#totalMoney");

    let items = 0
    let money = 0
    
    for (const {amount, price} of Object.values(database.cart)) {
        items += amount;
        money += amount * price;
    }

    
    totalItems.textContent = `${items} items`;
    totalMoney.textContent = `$${money}.00`;

    document.querySelector(".fisgon").textContent = items;
}

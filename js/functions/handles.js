import {setLocalStorage} from './helpers.js'
import {
    drawProductsInCart, 
    drawTotal, 
    drawProducts,
} from './draw.js'

export function handleCartShow(){
    const iconCart = document.querySelector(".bx-shopping-bag");
    const cart = document.querySelector(".cart");

    iconCart.addEventListener('click', () => {
        cart.classList.toggle("cart--show");
    });
}
export function handleAddCart(database){
    document.querySelector(".products").addEventListener("click", (e) => {
        if(e.target.classList.contains("bx-plus")){
            const id = Number(e.target.id);

            let productFound = database.products.find((product) => product.id === id)

            if (database.cart[id]){
                if (database.cart[id].amount === database.cart[id].quantity)
                    return alert("no hay mas en stock");

                database.cart[id].amount +=1;
            }else{
                database.cart[id]={
                    ...productFound,
                    amount:1,
                };
            }

            setLocalStorage("cart", database.cart);
            drawProductsInCart(database);
            drawTotal(database);
        }
    });
}
export function handleOptionsCard(database){
    document.querySelector(".cart__products").addEventListener("click", (e) => {
        if(e.target.classList.contains("bx-minus")){
            const id = Number(e.target.parentElement.id);
            if(database.cart[id].amount === 1){
                const response = confirm("seguro quieres eliminar este producto?");
                if(!response) return;

                delete database.cart[id];
            }else{
                database.cart[id].amount -= 1;
            }
        }
        if(e.target.classList.contains("bx-plus")){
            const id = Number(e.target.parentElement.id);

            if (database.cart[id].amount === database.cart[id].quantity)
                return alert("no hay mas en stock");

            database.cart[id].amount += 1;
            

        }
        if(e.target.classList.contains("bx-trash-alt")){
            const id = Number(e.target.parentElement.id);
            const response = confirm("seguro quieres eliminar este producto?");
            if(!response) return;

            delete database.cart[id];

        }

        setLocalStorage("cart", database.cart)
        drawProductsInCart(database);
        drawTotal(database);
    });
}
export function handleBuy(database){
    document.querySelector(".btn__buy").addEventListener("click", () => {

        if(Object.values(database.cart).length === 0) return alert("primero compra algo");

        const response = confirm("seguro quieres comprar?")

        if(!response) return;

        let newProducts = []
        for (const product of database.products) {
            if (database.cart[product.id]) {
                newProducts.push({
                    ...product,
                    quantity: product.quantity - database.cart[product.id].amount,
                });
            }else{
                newProducts.push(product);
            }
        }

        database.products = newProducts;
        database.cart = {}

        setLocalStorage("products", database.products);
        setLocalStorage("cart", database.cart);

        drawProductsInCart(database);
        drawProducts(database);
        drawTotal(database);
    });
}
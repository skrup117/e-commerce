import {    
    drawProducts, 
    drawProductsInCart, 
    drawTotal,
} from './functions/draw.js'

import {
    getProduct,
} from '../../src/js/functions/helpers.js'

import {
    handleAddCart, 
    handleCartShow, 
    handleBuy, 
    handleOptionsCard,
} from './functions/handles.js'
//===============================================================
var loader = document.getElementById("loader");

window.addEventListener("load", function(){
    loader.style.display = "none";
})
//===============================================================
var btn1=document.getElementById("btn2"),
        cont = 1;

function selector(){
    if(cont===0){
        btn1.classList.add('select')
        cont=1;
    }else{
        btn1.classList.remove('select')
        cont=0;
    }
}
//===============================================================
// funcion para hacer aparecer la "ventana flotante"
function productCard(){
    let buttons = document.querySelectorAll('.btn0');

    function drawOverLay(button) {
        btn1.addEventListener('click',selector,true)
        let html = ''

        var values= button.value
            console.log(values.split('_')[0]);
        html += `
        <div class="overlay">
            <div className="deletebtn"><i class='bx bxs-x-circle'></i></div>
            <div class="overlay_image">
                <img src="${values.split('ñ')[0]}" alt="">
            </div>
            <div class="overlay__info">
                <div class="overlay__name"><h3>${values.split('ñ')[1]}</h3></div>
                <div class="overlay__description">${values.split('ñ')[2]}</div>
                <div class="overlay__balance">
                    <div class="overlay__price"><h3>$${values.split('ñ')[3]}</h3></div>
                    <div class="prueba1"><i class='bx bx-moon' ></i></div>
                    <div class="overlay__stock">stock: 3</div>
                </div>
    
            </div>
        `;
        document.querySelector(".overlayG").innerHTML = html;
        document.getElementById("overlay").style.display="block";
    }
    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
        drawOverLay(button);
        });
    });
}
//===============================================================
btn1.addEventListener('click',selector,true)

//===============================================================
async function main(){
    const database = {
        products: JSON.parse(localStorage.getItem("products")) || await getProduct(),
        cart:   JSON.parse(localStorage.getItem("cart")) || {},
    };

    drawProducts(database);
    handleCartShow();
    handleAddCart(database);
    drawProductsInCart(database);
    handleOptionsCard(database);
    drawTotal(database);
    handleBuy(database);
    productCard();
}

window.addEventListener("load", main);

/* FUNCION PARA SCROLEAR Y HACER APARECER EL NAVBAR 

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        document.getElementById("navbar").style.backgroundColor = "white";
        document.getElementById("navbar").style.boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.2)";
    } else {
        document.getElementById("navbar").style.backgroundColor = "white";
        document.getElementById("navbar").style.shadow = boxShadow = "0 0.5rem 1rem rgba(0, 0, 0, 0.2)";
    }
}*/
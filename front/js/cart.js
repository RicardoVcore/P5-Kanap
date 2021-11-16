//GETTING PRODUCTS FROM LOCAL STORAGE
let produitStockerDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

const positionEmptyCart = document.querySelector("#cart__items");

// IF EMPTY CART THEM
function getCart() {
    if (produitStockerDansLocalStorage === null || produitStockerDansLocalStorage == 0) {
        const emptyCart = `<p>Le panier est vide</p>`;
        positionEmptyCart.innerHTML = emptyCart;
    } else {
        for (let produit in produitStockerDansLocalStorage) {
            let productArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(productArticle);
            productArticle.className = "cart__item";
            productArticle.setAttribute('data-id', produitStockerDansLocalStorage[produit].idProduit);

            let productDivImg = document.createElement("div");
            productArticle.appendChild(productDivImg);
            productDivImg.className = "cart__item__img";

            let productImg = document.createElement("img");
            productDivImg.appendChild(productImg);
            productImg.src = produitStockerDansLocalStorage[produit].productImg;
            productImg.alt = produitStockerDansLocalStorage[produit].productAltImg;

            let productItemContent = document.createElement("div");
            productArticle.appendChild(productItemContent);
            productItemContent.className = "cart__item__content";

            let productItemContentTitlePrice = document.createElement("div");
            productItemContent.appendChild(productItemContentTitlePrice);
            productItemContentTitlePrice.className = "cart__item__content__titlePrice";

            let productTitle = document.createElement("h2");
            productItemContentTitlePrice.appendChild(productTitle);
            productTitle.innerHTML = produitStockerDansLocalStorage[produit].productName;

            let productColor = document.createElement("p");
            productTitle.appendChild(productColor);
            productColor.innerHTML = produitStockerDansLocalStorage[produit].productColor;
            productColor.style.fontSize = "20px";

            let productPrice = document.createElement("p");
            productItemContentTitlePrice.appendChild(productPrice);
            productPrice.innerHTML = produitStockerDansLocalStorage[produit].productPrice + " €";

            let productItemContentSettings = document.createElement("div");
            productItemContent.appendChild(productItemContentSettings);
            productItemContentSettings.className = "cart__item__content__settings";

            let productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";

            let productQte = document.createElement("p");
            productItemContentSettingsQuantity.appendChild(productQte);
            productQte.innerHTML = "Qté : ";

            let productQuantity = document.createElement("input");
            productItemContentSettingsQuantity.appendChild(productQuantity);
            productQuantity.value = produitStockerDansLocalStorage[produit].productQuantity;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");

            let productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettings.appendChild(productItemContentSettingsDelete);
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

            let productSupprimer = document.createElement("p");
            productItemContentSettingsDelete.appendChild(productSupprimer);
            productSupprimer.className = "deleteItem";
            productSupprimer.innerHTML = "Supprimer";
        }
    }
}
getCart();
// GET PRICE/PRIX
function getPrice() {

    // GET PRICE/PRIX
    var elementsQt = document.getElementsByClassName('itemQuantity');
    var myLength = elementsQt.length,
        totalQt = 0;

    for (var i = 0; i < myLength; ++i) {
        totalQt += elementsQt[i].valueAsNumber;
    }

    let productTotalQuantity = document.getElementById('totalQuantity');
    productTotalQuantity.innerHTML = totalQt;


    // GET TOTAL ORDER PRICE
    totalPrice = 0;

    for (var i = 0; i < myLength; ++i) {
        totalPrice += (elementsQt[i].valueAsNumber * produitStockerDansLocalStorage[i].productPrice);
    }

    let productTotalPrice = document.getElementById('totalPrice');
    productTotalPrice.innerHTML = totalPrice;

}
getPrice();
// CHANGE PRODUCTS QUANTITY 
function modifyQt() {
    let qtModify = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qtModify.length; k++) {
        qtModify[k].addEventListener("change", (event) => {
            event.preventDefault();
            //THIS SELECTS ID AND COLOR OF PRODUCT
            let quantityModify = produitStockerDansLocalStorage[k].productQuantity;
            let qtModifyValue = qtModify[k].value;

            const resultFind = produitStockerDansLocalStorage.find((el) => el.qtModifyValue !== quantityModify);

            resultFind.productQuantity = qtModifyValue;
            produitStockerDansLocalStorage[k].productQuantity = resultFind.productQuantity;

            localStorage.setItem("produit", JSON.stringify(produitStockerDansLocalStorage));
            window.location.href = "../html/cart.html";
        })
    }
}
modifyQt();
// DELETE PRODUCT 
function deleteProduct() {
    let btnDelete = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btnDelete.length; j++) {
        btnDelete[j].addEventListener("click", (event) => {
            event.preventDefault();

            ////THIS SELECTS ID AND COLOR OF PRODUCT FOR DELETE FUNCTION
            let idDelete = produitStockerDansLocalStorage[j].idProduit;
            let colorDelete = produitStockerDansLocalStorage[j].productColor;

            produitStockerDansLocalStorage = produitStockerDansLocalStorage.filter(el => el.idProduit !== idDelete || el.productColor !== colorDelete);

            localStorage.setItem("produit", JSON.stringify(produitStockerDansLocalStorage));

            //RETURN DELETED MESSAGE
            alert("Ce produit a bien été supprimé du panier");
            location.reload();
        })
    }
}
deleteProduct();

//REGEXP
//LISTEN TO EVENTS

let form = document.querySelector('.cart__order__form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (true
        && validFirstName(form.firstName)
        && validLastName(form.lastName)
        && validAddress(form.address)
        && validCity(form.city)
        && validEmail(form.email)
    );
});

//FIRSTNAME
const validFirstName = function (inputObject) {  //inputObject is the field associated with
    let validRegExp = new RegExp('^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$');
    let test = validRegExp.test(inputObject.value);
    let p = inputObject.nextElementSibling;

    if (test) {
        p.innerHTML = 'Prénom Valide';
        return true;
    }
    else {
        p.innerHTML = 'Prénom Non Valide';
        return false;
    }

};
//LAST NAME
const validLastName = function (inputObject) {  //inputObject is the field associated with
    let validRegExp = new RegExp('^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$');
    let test = validRegExp.test(inputObject.value);
    let p = inputObject.nextElementSibling;

    if (test) {
        p.innerHTML = 'Nom Valide';
        return true;
    }
    else {
        p.innerHTML = 'Nom Non Valide';
        return false;
    }

};
//ADDRESS
const validAddress = function (inputObject) {  //inputObject is the field associated with
    let validRegExp = new RegExp('^[0-9A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$');
    let test = validRegExp.test(inputObject.value);
    let p = inputObject.nextElementSibling;

    if (test) {
        p.innerHTML = 'Adresse Valide';
        return true;
    }
    else {
        p.innerHTML = 'Adresse Non Valide';
        return false;
    }

};
//CITY/VILLE
const validCity = function (inputObject) {  //inputObject is the field associated with
    let validRegExp = new RegExp('^[A-Za-z]+((\s)?((\'|\-|\.)?([A-Za-z])+))*$');
    let test = validRegExp.test(inputObject.value);
    let p = inputObject.nextElementSibling;

    if (test) {
        p.innerHTML = 'Ville Valide';
        return true;
    }
    else {
        p.innerHTML = 'Ville Non Valide';
        return false;
    }

};
//EMAIL
const validEmail = function (inputObject) {  //inputObject is the field associated with
    let validRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-zA-Z]{2,10}$', 'g');
    let test = validRegExp.test(inputObject.value);
    let p = inputObject.nextElementSibling;

    if (test) {
        p.innerHTML = 'Email Valide';
        return true;
    }
    else {
        p.innerHTML = 'Email Non Valide';
        return false;
    }

};
//VALIDATION FORM
form.firstName.addEventListener('change', function () {
    validFirstName(this);

});

form.lastName.addEventListener('change', function () {
    validLastName(this);

});
form.address.addEventListener('change', function () {
    validAddress(this);

});
form.city.addEventListener('change', function () {
    validCity(this);

});
form.email.addEventListener('change', function () {
    validEmail(this);

});


//SENDING CLIENT INFORMATION TO LOCAL STORAGE
const btnCommander = document.getElementById("order");

//LISTENING TO CART
btnCommander.addEventListener("click", (event) => {
    //GET DATA FROM CLIENT FORM
    let inputFirstName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAddress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputEmail = document.getElementById('email');
    //BUILD ARRAY AFTER LOCAL STORAGE???
    let produitPanier = [];
    for (let i = 0; i < produitStockerDansLocalStorage.length; i++) {
        produitPanier.push(produitStockerDansLocalStorage[i].produitPanier);
    }
    console.log(produitPanier);
    if (validFirstName(inputFirstName) && validLastName(inputLastName) && validAddress(inputAddress) && validCity(inputCity) && validEmail(inputEmail)) {


        const orderValues = {
            contact: {
                firstName: inputFirstName.value,
                lastName: inputLastName.value,
                address: inputAddress.value,
                city: inputCity.value,
                email: inputEmail.value,
            },
            products: produitPanier,
        }

        const apiSend = {
            method: 'POST',
            body: JSON.stringify(orderValues),
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
        };
        //FETCH FROM API
        fetch("https://restapi.fr/api/order", apiSend)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                //Cleans info for security
                localStorage.clear();


                window.location.href = "../html/confirmation.html";
                const url = window.location;
                const urlParams = new URLSearchParams(url.search);
                urlParams.set('orderId', data._id);
                window.location.href = "../html/confirmation.html" + "?" + urlParams;

            })
            .catch((err) => {
                alert("Problem with fetch : " + err.message);
            });
    } else {
        alert("Veuillez bien remplir le formulaire")
    }
})






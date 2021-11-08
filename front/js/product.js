var str = window.location.href;
var url = new URL(str);
//get product ID
var idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

//Retrieving items from the API
function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.json();
        })

        //Distribution of API data in the DOM
        .then(async function (resultAPI) {
            article = await resultAPI;
            console.log(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((err) => {
            alert("Error response API: " + err.message);
        });
}
getArticle();

function getPost(article) {
    // INSERTING IMG
    let productImg = document.createElement("img");
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = article.imageUrl;
    productImg.alt = article.altTxt;

    //CHANGE H1
    let productName = document.getElementById('title');
    productName.innerHTML = article.name;

    //CHANGE PRICE
    let productPrice = document.getElementById('price');
    productPrice.innerHTML = article.price;

    //CHANGE DESCRIPTION
    let productDescription = document.getElementById('description');
    productDescription.innerHTML = article.description;

    //INSERTING OPTIONS COLORS
    for (let colors of article.colors) {
        console.log(colors);
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = colors;
        productColors.innerHTML = colors;
    }
    addToCart(article);
}

//CART MANAGER
function addToCart(article) {
    const btnAddToPanier = document.querySelector("#addToCart");

    //Listen to the basket conditions/null color and quantity between 1 and 100
    btnAddToPanier.addEventListener("click", (event) => {
        if (quantityPicked.value > 0 && quantityPicked.value <= 100 && quantityPicked.value != 0) {

            //GET COLOR OPTION
            let changeColor = colorPicked.value;

            //GET QUANTITY OPTION
            let changeQuantity = quantityPicked.value;

            //GET ALL OPTIONS TO ADD TO CART
            let productOptions = {
                productId: idProduct,
                productColor: changeColor,
                productQuantity: Number(changeQuantity),
                productName: article.name,
                productPrice: article.price,
                productDescription: article.description,
                productImg: article.imageUrl,
                productAltImg: article.altTxt
            };

            //STARTING LOCAL STORAGE
            let produitStockerDansLocalStorage = JSON.parse(localStorage.getItem("produit"));

            //POP MESSAGE FROM BROWSER
            const popupConfirmation = () => {
                if (window.confirm(`Votre commande de ${changeQuantity} ${article.name} ${changeColor} est ajoutée au panier
Consulter votre panier, appuyer  sur OK`)) {
                    window.location.href = "cart.html";
                }
            }

            //IMPORT TO LOCAL STORAGE
            //IF CART HAS ALREADY 1+ PRODUCT 
            if (produitStockerDansLocalStorage) {
                const resultFind = produitStockerDansLocalStorage.find(
                    (el) => el.productId === idProduct && el.productColor === changeColor);
                //If the ordered product is already in the cart
                if (resultFind) {
                    let newQuantity =
                        parseInt(productOptions.productQuantity) + parseInt(resultFind.productQuantity);
                    resultFind.productQuantity = newQuantity;
                    localStorage.setItem("produit", JSON.stringify(produitStockerDansLocalStorage));
                    console.log(produitStockerDansLocalStorage);
                    popupConfirmation();
                    //If the ordered product is not in cart
                } else {
                    produitStockerDansLocalStorage.push(productOptions);
                    localStorage.setItem("produit", JSON.stringify(produitStockerDansLocalStorage));
                    console.log(produitStockerDansLocalStorage);
                    popupConfirmation();
                }
                //IF CART IS EMPTY
            } else {
                produitStockerDansLocalStorage = [];
                produitStockerDansLocalStorage.push(productOptions);
                localStorage.setItem("produit", JSON.stringify(produitStockerDansLocalStorage));
                console.log(produitStockerDansLocalStorage);
                popupConfirmation();
            }
        }
    });
}

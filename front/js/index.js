productDisplay();

// GET ELEMENTS FROM API 
async function getArticles() {
    var articleDisplay = await fetch("http://localhost:3000/api/products")
    return await articleDisplay.json();
}
//Distribution of API data in the DOM
async function productDisplay() {
    var resultElements = await getArticles()
        .then(function (resultAPI) {
            const articles = resultAPI;
            console.log(articles);
            for (let article in articles) {
                // Inserting the "a"
                let productLink = document.createElement("a");
                document.querySelector(".items").appendChild(productLink);
                productLink.href = `product.html?id=${resultAPI[article]._id}`;

                // Inserting the "article"
                let productArticle = document.createElement("article");
                productLink.appendChild(productArticle);

                // INSERTING IMG
                let productImg = document.createElement("img");
                productArticle.appendChild(productImg);
                productImg.src = resultAPI[article].imageUrl;
                productImg.alt = resultAPI[article].altTxt;

                // INSERTNG TITLE H#
                let productName = document.createElement("h3");
                productArticle.appendChild(productName);
                productName.classList.add("productName");
                productName.innerHTML = resultAPI[article].name;

                //INSERT DESCRIPTION
                let productDescription = document.createElement("p");
                productArticle.appendChild(productDescription);
                productDescription.classList.add("productName");
                productDescription.innerHTML = resultAPI[article].description;
            }
        })
        .catch(function (error) {
            return error;
        });
    console.log(resultElements);
}
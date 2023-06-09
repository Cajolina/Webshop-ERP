const main = document.querySelector("main");

async function getProductData() {
  try {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    console.log(products);
    renderProducts(products);
  } catch (error) {
    console.error(error);
  }
}

getProductData();

function renderProducts(products) {
  const minifiedRecords = products.map((product) => ({
    name: product.name,
    image: product.images[0],
    price: product.price,
    url: product.permalink,
    short_description: product.short_description,
    categories: product.categories,
  }));
  console.log(minifiedRecords);
  let tillbehorCount = 0;
  let exteriorCount = 0;
  for (const product of minifiedRecords) {
    for (const categories of product.categories) {
      if (
        (categories.name === "Tillbehör" && tillbehorCount < 5) ||
        (categories.name === "Exteriör" && exteriorCount < 5)
      ) {
        console.log(categories);
        const productContainer = document.createElement("section");
        const divProduct = document.createElement("article");
        const divText = document.createElement("span");
        const h2 = document.createElement("h2");
        const img = document.createElement("img");
        const paragraph = document.createElement("p");
        const h3 = document.createElement("h3");
        const urlLink = document.createElement("a");
        const category = document.createElement("p");

        h2.innerText = "Produkt: " + product.name;
        h3.innerText = "Pris: " + product.price + " kr";
        paragraph.innerText = new DOMParser().parseFromString(
          product.short_description,
          "text/html"
        ).body.innerText;

        category.innerText = "Kategori: " + categories.name;

        urlLink.innerHTML = "Klicka här för att besöka produktens sida";
        urlLink.setAttribute("href", product.url);
        urlLink.setAttribute("target", "_blank");

        img.setAttribute("src", product.image.src);
        img.setAttribute("alt", product.image.alt);

        productContainer.appendChild(h2);
        productContainer.appendChild(divProduct);

        divProduct.appendChild(img);
        divProduct.appendChild(divText);

        divText.appendChild(h3);
        divText.appendChild(paragraph);
        divText.appendChild(category);
        divText.appendChild(urlLink);
        urlLink.style.color = "blue";

        if (categories.name === "Tillbehör") {
          tillbehorCount++;
        } else if (categories.name === "Exteriör") {
          exteriorCount++;
        }

        main.appendChild(productContainer);
      }
    }
  }
}

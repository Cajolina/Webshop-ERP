async function getProductData() {
  try {
    const response = await fetch("http://localhost:3000/products");
    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.error(error);
  }
}

getProductData();

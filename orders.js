async function getOrderData() {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    console.log(orders);
  } catch (error) {
    console.error(error);
  }
}

getOrderData();

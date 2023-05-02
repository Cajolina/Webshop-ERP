const main = document.querySelector("main");

async function getOrderData() {
  try {
    const response = await fetch("http://localhost:3000/orders");
    const orders = await response.json();
    console.log(orders);
    renderOrders(orders);
  } catch (error) {
    console.error(error);
  }
}

getOrderData();

function renderOrders(orders) {
  const sortedOrders = orders.map((order) => ({
    id: order.id,
    status: order.status,
    total: order.total,
    date: order.date_created,
  }));
  console.log(sortedOrders);

  for (const order of sortedOrders) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const paragraphStatus = document.createElement("p");
    const paragraphTotal = document.createElement("p");
    const paragraphDate = document.createElement("p");
    h2.innerText = "Order Id: " + order.id;

    paragraphStatus.innerText = "Status: " + order.status;
    paragraphTotal.innerText = "Totalsumma: " + order.total + " kr";
    paragraphDate.innerText = "Order datum: " + order.date;

    div.appendChild(h2);
    div.appendChild(paragraphStatus);
    div.appendChild(paragraphTotal);
    div.appendChild(paragraphDate);

    main.appendChild(div);
  }
}
////id, status, totalsumma,datum

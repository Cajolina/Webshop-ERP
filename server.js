const express = require("express");
const app = express();
const WooCommerceAPI = require("woocommerce-api");
require("dotenv").config();
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.listen(3000, () => console.log("Server up and running"));

const WooCommerce = new WooCommerceAPI({
  url: "http://localhost/webshop_grupp1/",
  consumerKey: CONSUMER_KEY,
  consumerSecret: CONSUMER_SECRET,
  wpAPI: true,
  version: "wc/v1",
});

// WooCommerce.getAsync("products/categories").then(function (result) {
//   return JSON.parse(result.toJSON().body);
// });

// WooCommerce.getAsync("orders").then(function (result) {
//   return JSON.parse(result.toJSON().body);
// });

// WooCommerce.getAsync("posts").then(function (result) {
//   console.log(JSON.parse(result.toJSON().body));
// });

app.get("/products", async (req, res) => {
  try {
    const perPage = 18;
    const result = await WooCommerce.getAsync(`products?per_page=${perPage}`);
    const products = JSON.parse(result.toJSON().body);
    res.json(products);
    // console.log(products);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/orders", async (req, res) => {
  try {
    const perPage = 2;
    const result = await WooCommerce.getAsync(`orders?per_page=${perPage}`);
    const orders = JSON.parse(result.toJSON().body);
    res.json(orders);
    console.log(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

app.get("/posts", async (req, res) => {
  try {
    const result = await fetch(
      "http://localhost/webshop_grupp1/wp-json/wp/v2/posts/?per_page=2"
    );
    const json = await result.json();
    // const posts = JSON.parse(result.toJSON().body);
    res.json(json);
    console.log(json);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});

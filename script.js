const main = document.querySelector("main");

// const postData = async () => {
//   const response = await fetch(
//     "http://localhost/webshop_grupp1/wp-json/wp/v2/posts/?per_page=2",
//     {
//       method: "GET",

//       headers: {
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   const data = await response.json();

//   renderPosts(data);
// };
// postData();

async function getProductData() {
  try {
    const response = await fetch("http://localhost:3000/posts");
    const posts = await response.json();
    renderPosts(posts);
    console.log(posts);
  } catch (error) {
    console.error(error);
  }
}

getProductData();

function renderPosts(data) {
  const posts = data;

  for (const post of posts) {
    const div = document.createElement("div");
    const h2 = document.createElement("h2");
    const img = document.createElement("img");
    const paragraph = document.createElement("p");
    h2.innerText = new DOMParser().parseFromString(
      post.title.rendered,
      "text/html"
    ).body.innerText;

    paragraph.innerText = new DOMParser().parseFromString(
      post.content.rendered,
      "text/html"
    ).body.innerText;

    console.log(post);
    img.setAttribute("src", post._links["wp:featuredmedia"][0].href);
    img.setAttribute(
      "style",
      "max-width: 100%; height: auto; display: block; margin-top: 10px;"
    );

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(paragraph);
    main.appendChild(div);
  }
}

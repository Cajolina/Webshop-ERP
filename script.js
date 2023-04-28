const main = document.querySelector("main");

const postData = async () => {
  const response = await fetch(
    "http://localhost/webshop_grupp1/wp-json/wp/v2/posts",
    {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const data = await response.json();

  renderPosts(data);
};
postData();

function renderPosts(data) {
  //   const ul = document.createElement("ul");
  //   main.appendChild(ul);

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

    img.setAttribute("src", post._links["wp:featuredmedia"][0].href);
    img.setAttribute(
      "style",
      "max-width: 100%; height: auto; display: block; margin-top: 10px;"
    );
    console.log(post._links);

    // console.log(post.title.toString());

    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(paragraph);
    main.appendChild(div);
    // console.log(post);
    // const li = document.createElement("li");
    // li.innerText = post.date;
    // ul.appendChild(li);
  }
}

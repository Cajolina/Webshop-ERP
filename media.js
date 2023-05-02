const main = document.querySelector("main");
async function getMediaData() {
  try {
    const response = await fetch("http://localhost:3000/media");
    const media = await response.json();
    renderMedia(media);
    console.log(media);
  } catch (error) {
    console.error(error);
  }
}

getMediaData();

function renderMedia(media) {
  const allMedia = media;
  const imgDiv = document.createElement("div");
  imgDiv.classList = "imgDiv";
  main.appendChild(imgDiv);

  for (const media of allMedia) {
    const logoURL =
      "http://localhost/webshop_grupp1/wp-content/uploads/2023/04/logo.png";
    if (media.source_url !== logoURL) {
      const img = document.createElement("img");
      img.classList = "mediaImg";
      const mediaURL = media.source_url;
      img.setAttribute("src", mediaURL);
      imgDiv.appendChild(img);
    }
  }
}

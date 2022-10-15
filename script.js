//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  const contentEl = document.getElementById("content");
  // const title = document.createElement("h1");
  // title.innerHTML = "TV SHOW";
  // title.style.textAlign = "center";
  // rootElem.appendChild(title);
  const inputEl = document.createElement("input")
  rootElem.appendChild(inputEl);
  const pEl = document.createElement("p")
  pEl.innerHTML = `Displaying 0/${episodeList.length} episodes`
  pEl.style.display = "inline";
  rootElem.appendChild(pEl);
  rootElem.appendChild(contentEl)
  for (let i = 0; i < episodeList.length; i++) {
    const cardsEl = document.createElement("div");
    cardsEl.setAttribute("class", "cards")
    cardsEl.style.width = "30%";
    cardsEl.style.margin = "20px";
    contentEl.appendChild(cardsEl);
    const h3El = document.createElement("h3");
    h3El.setAttribute("class", "title")
    h3El.innerHTML = `${episodeList[i].name} - S${episodeList[i].season}E${episodeList[i].number}`;
    const imageEl = document.createElement("img")
    imageEl.setAttribute("src", episodeList[i].image.medium);
    imageEl.setAttribute("class", "mediumImg")
    const pEl = document.createElement("p");
    pEl.setAttribute("class", "summary")
    pEl.innerHTML = episodeList[i].summary;
    
    cardsEl.appendChild(h3El)
    cardsEl.appendChild(imageEl)
    cardsEl.appendChild(pEl)
  }
}

window.onload = setup;

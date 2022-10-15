//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

function makePageForEpisodes(episodeList) {
  const rootElem = document.getElementById("root");
  rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  const title = document.createElement("h1");
  title.innerHTML = "TV SHOW";
  title.style.textAlign = "center";
  rootElem.appendChild(title);
  for (let i = 0; i < episodeList.length; i++) {
    const h3El = document.createElement("h3");
    h3El.innerHTML = `${episodeList[i].name} - S${episodeList[i].season}E${episodeList[i].number}`;
    const image = document.createElement("img")
    image.setAttribute("src", `${episodeList[i].image.medium}`)
    rootElem.appendChild(h3El)

    
  }
    
    
  
}

window.onload = setup;

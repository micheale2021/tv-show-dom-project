// // //You can edit ALL of the code here
// function setup() {
//   const allEpisodes = getAllEpisodes();
//   makePageForEpisodes(allEpisodes);
  
// }

// // let episodeList = [];
// // searchInput.addEventListener("keyup", (e) => {
// //   const searchString = e.target.value;
// //   episodeList.filter( episode => {
// //     return (episode.name.includes(searchString) || 
// //           episode.summary.includes(searchString)
// //           );
// //   })
  
// // })


// function makePageForEpisodes(episodeList) {
//   const rootElem = document.getElementById("root");
//   const contentEl = document.getElementById("content");
// //   // const title = document.createElement("h1");
// //   // title.innerHTML = "TV SHOW";
// //   // title.style.textAlign = "center";
// //   // rootElem.appendChild(title);
// //   const selectEl = document.createElement("select")
// //   selectEl.style.width = "30%"
  
//   const inputEl = document.createElement("input")
// //   inputEl.style.marginLeft = "20px";
//   inputEl.setAttribute("placeholder", "Search ...")
//   inputEl.setAttribute("type", "text");
//   inputEl.setAttribute("id", "searchInput")
//   let searchInput = document.getElementById("searchInput");
// //   rootElem.appendChild(selectEl);
//   rootElem.appendChild(inputEl);
// //   const pEl = document.createElement("p")
// //   pEl.innerHTML = `Displaying /${episodeList.length} episodes`
// //   pEl.style.display = "inline";
// //   pEl.style.marginLeft = "10px"
// //   rootElem.appendChild(pEl);
//   rootElem.appendChild(contentEl)
  
//   for (let i = 0; i < episodeList.length; i++) {
//     const optionEl = document.createElement("option")
//     optionEl.innerHTML = `S0${episodeList[i].season}E${episodeList[i].number} - ${episodeList[i].name}`
//     // selectEl.appendChild(optionEl);
//     const cardsEl = document.createElement("div");
//     cardsEl.setAttribute("class", "cards")
//     cardsEl.style.width = "30%";
//     cardsEl.style.margin = "20px";
//     contentEl.appendChild(cardsEl);
//     const h3El = document.createElement("h3");
//     h3El.setAttribute("class", "title")
//     h3El.innerHTML = `${episodeList[i].name} - S0${episodeList[i].season}E${episodeList[i].number}`;
//     const imageEl = document.createElement("img")
//     imageEl.setAttribute("src", episodeList[i].image.medium);
//     imageEl.setAttribute("class", "mediumImg")
//     const pEl = document.createElement("p");
//     pEl.setAttribute("class", "summary")
//     pEl.innerHTML = episodeList[i].summary;
    
//     cardsEl.appendChild(h3El)
//     cardsEl.appendChild(imageEl)
//     cardsEl.appendChild(pEl)
//   }
  
// }




// window.onload = setup;

// ===========================================



const charactersList = document.getElementById
('charactersList');
const selectEl = document.getElementById('selectEpisode');

const searchBar = document.getElementById("searchBar");
let gotEpisodes = [];

const displaySearchedEpisode = document.getElementById('displaySearchedEpisode');


searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filteredEpisode = gotEpisodes.filter( (episode) => {
    return (episode.name.toLowerCase().includes(searchString) || episode.summary.toLowerCase().includes(searchString)
            );
  });
  displayEpisodes(filteredEpisode)
});

const loadEpisodes = async () => {
    try {
        const res = await fetch('https://api.tvmaze.com/shows');
        gotEpisodes = await res.json();
        displayEpisodes(gotEpisodes);
    } catch (err) {
        console.error(err);
    }
};



const displayEpisodes = (episodes) => {
    
    for (let i = 0; i < episodes.length; i++) {
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", `${episodes[i].name}`)
    optionEl.innerHTML = `${episodes[i].name}`
    displaySearchedEpisode.innerHTML = `Displaying ${episodes.length}/240 episodes`
    selectEl.appendChild(optionEl); } 
    const htmlString = episodes
        .map((character) => {
            //                <h4>S0${character.season}E0${character.number}</h4>

            return `
            <li class="character">
                <h3>${character.name}</h3>
           <p>${character.summary}</p>
                <img src="${character.image.medium}"></img>
            </li>
        `;
        })
        .join('');
    episodesList.innerHTML = htmlString;
    optionEl.innerHTML = `${episodes.name}`
};

loadEpisodes();
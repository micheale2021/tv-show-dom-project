

const episodesList = document.getElementById("episodesList");
const selectEl = document.getElementById("selectEpisode");

const searchBar = document.getElementById("searchBar");
let gotEpisodes = [];

const displaySearchedEpisode = document.getElementById(
  "displaySearchedEpisode"
);

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  const filteredEpisode = gotEpisodes.filter((episode) => {
    return (
      episode.name.toLowerCase().includes(searchString) ||
      episode.summary.toLowerCase().includes(searchString)
    );
  });
  displayEpisodes(filteredEpisode);
});

const loadEpisodes = async () => {
  try {
    const res = await fetch("https://api.tvmaze.com/shows/82/episodes");
    gotEpisodes = await res.json();
    displayEpisodes(gotEpisodes);
  } catch (err) {
    console.error(err);
  }
};

const displayEpisodes = (episodes) => {
  const x = episodes.length;
  console.log(episodes);
  for (let i = 0; i < episodes.length; i++) {
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", `${episodes[i].name}`);
    optionEl.innerHTML = `${episodes[i].name}`;
    displaySearchedEpisode.innerHTML = `Displaying ${episodes.length}/${gotEpisodes.length} episodes`;
    selectEl.appendChild(optionEl);
  }
  let episodeCode;
  let seasonCode;
  const htmlString = episodes
    .map((episode) => {
      console.log(episode.number);
      seasonCode =
        episode.season <= 9
          ? `S0${episode.season}`
          : `S${episode.season}`;
      episodeCode =
        episode.number <= 9
          ? `E0${episode.number}`
          : `E${episode.number}`;

      return `
            <li class="episode">
                <h3>${episode.name}</h3>
<h4> ${seasonCode}${episodeCode}</h4>
           <p>${episode.summary}</p>
                <img src="${episode.image.medium}"></img>
            </li>
        `;
    })
    .join("");
  episodesList.innerHTML = htmlString;
  optionEl.innerHTML = `${episodes.name}`;
};

loadEpisodes();

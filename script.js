setInterval(function () {
  changeColor();
}, 6000);
function changeColor() {
  var randomColor = Math.floor(Math.random() * 16777215).toString(16);
  document.body.style.backgroundColor = "#" + randomColor;
}

const episodesList = document.getElementById("episodesList");
const selectEl = document.getElementById("selectEpisode");

const selectShowEl = document.getElementById("selectShow");

const searchBar = document.getElementById("searchBar");
let gotEpisodes = [];

const displaySearchedEpisode = document.getElementById(
  "displaySearchedEpisode"
);

selectShowEl.addEventListener("change", (e) => {
  const s = selectShowEl.value.toLowerCase();
  console.log(s);
  const filteredEpisode = gotEpisodes.filter((episode) => {
    return episode.name.toLowerCase().includes("Winter");
  });
  displayShows(filteredEpisode);
});

selectEl.addEventListener("change", (e) => {
  const s = selectEl.value.toLowerCase();
  console.log(s);
  const filteredEpisode = gotEpisodes.filter((episode) => {
    return episode.name.toLowerCase().includes(s);
  });
  displayEpisodes(filteredEpisode);
});

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

const loadShows = () => {
  const gotShows = getAllShows();
  displayShows(gotShows);
};

const displayShows = (shows) => {
  const x = shows.length;
  for (let i = 0; i < shows.length; i++) {
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", `${shows[i].name}`);
    optionEl.innerHTML = `${shows[i].name}`;
    selectShowEl.appendChild(optionEl);
  }

  //   displaySearchedEpisode.innerHTML = `Displaying ${episodes.length}/${gotEpisodes.length} episodes`;

  //   const htmlString = episodes
  //     .map((episode) => {
  //       console.log(episode.number);
  //       const seasonCode =
  //         episode.season <= 9 ? `S0${episode.season}` : `S${episode.season}`;
  //       const episodeCode =
  //         episode.number <= 9 ? `E0${episode.number}` : `E${episode.number}`;

  //       return `
  //             <li class="episode">
  //                 <h3>${episode.name}</h3>
  // <h4> ${seasonCode}${episodeCode}</h4>
  //            <p>${episode.summary}</p>
  //                 <img src="${episode.image.medium}"></img>
  //             </li>
  //         `;
  //     })
  //     .join("");
  //   episodesList.innerHTML = htmlString;
  // optionEl.innerHTML = `${episodes.name}`;
};

const displayEpisodes = (episodes) => {
  const x = episodes.length;
  // console.log(episodes);
  for (let i = 0; i < episodes.length; i++) {
    const optionEl = document.createElement("option");
    optionEl.setAttribute("value", `${episodes[i].name}`);
    const seasonCode =
      episodes[i].season <= 9
        ? `S0${episodes[i].season}`
        : `S${episodes[i].season}`;
    const episodeCode =
      episodes[i].number <= 9
        ? `E0${episodes[i].number}`
        : `E${episodes[i].number}`;
    optionEl.innerHTML = `${seasonCode}${episodeCode} - ${episodes[i].name}`;

    selectEl.appendChild(optionEl);
  }

  displaySearchedEpisode.innerHTML = `Displaying ${episodes.length}/${gotEpisodes.length} episodes`;

  const htmlString = episodes
    .map((episode) => {
      console.log(episode.number);
      const seasonCode =
        episode.season <= 9 ? `S0${episode.season}` : `S${episode.season}`;
      const episodeCode =
        episode.number <= 9 ? `E0${episode.number}` : `E${episode.number}`;

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
  // optionEl.innerHTML = `${episodes.name}`;
};

loadEpisodes();
loadShows();

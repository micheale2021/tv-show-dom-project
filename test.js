
const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
  const searchString = e.target.value;
  const filteredCharacters = hpCharacters.filter( (character) => {
    return (character.name.toLowerCase().includes(searchString) || character.summary.toLowerCase().includes(searchString)
            );
  });
  displayCharacters(filteredCharacters)
});

const loadCharacters = async () => {
    try {
        const res = await fetch('https://api.tvmaze.com/shows/82/episodes');
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <h2>${character.name}</h2>
           <h3>S0${character.season}E0${character.number}</h3>
           <p>${character.summary}</p>
                <img src="${character.image.medium}"></img>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

loadCharacters();
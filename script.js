const SUPERHERO_TOKEN = '5579843938733236'
const BASE_URL = `https://www.superheroapi.com/api.php/${SUPERHERO_TOKEN}`

const heroButton = document.getElementById('heroButton')
const heroImageDiv = document.getElementById('heroImageDiv')
const searchButton = document.getElementById('searchButton')
const searchInput = document.getElementById('searchInput')


const getRandomSuperHero = (id) => {
  fetch(`${BASE_URL}/${id}`)
    .then(response => response.json())
    .then(json => {
      const superHero = json
      showHeroInfo(superHero)
    })
}

const statToEmoji = {
  intelligence: '🧠',
  strength: '💪',
  speed: '⚡',
  durability: '🏋️‍♂️',
  power: '📊',
  combat: '⚔️',
}


const showHeroInfo = (character) => {
  const keys = Object.keys(character.powerstats)
  const name = `<h2>${character.name}</h2>`
  const img = `<img src ="${character.image.url}" height=200 width=200/>`
  const stats = keys.map(stat => {
    return `<p>${statToEmoji[stat]} ${stat.toUpperCase()}: ${character.powerstats[stat]}</p>`
  }).join('')
 
  heroImageDiv.innerHTML = `${name}${img}${stats}`;
}


const getSearchSuperHero = (name) => {
  fetch(`${BASE_URL}/search/${name}`)
    .then(response => response.json())
    .then(json => {
      const hero = json.results[0]
      showHeroInfo(hero)
    })
    .catch(() =>{
      heroImageDiv.innerHTML = errorMessage
    })
}

const errorMessage = `<h3>Character with given name not found.</h3>`

const randomHero = () => {
  const numberOfHeroes = 731
  return Math.floor(Math.random() * numberOfHeroes) + 1
}
heroButton.onclick = () => getRandomSuperHero(randomHero())

searchButton.onclick = () => getSearchSuperHero(searchInput.value)

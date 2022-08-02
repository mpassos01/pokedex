const pokeName = document.querySelector('#res')
const pokeImg = document.querySelector('#img')
const form = document.querySelector('#form')
const input = document.querySelector('#inputSearch')
const buttonV = document.querySelector('#btn1')
const buttonP = document.querySelector('#btn2')
const reset = document.querySelector('#btn3')
const tp = document.querySelector('#ataque')
const hp = document.querySelector('#hp')
const at = document.querySelector('#at')

const sombra = document.querySelector('#btn4')

let searchPoke = 1

const fetchPokemon = async (pokemon) => {
    const apiRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    if(apiRes.status === 200) {
        const data = await apiRes.json()
        return data
    }

    //console.log(data);
}

const render = async (pokemon) => {
    pokeName.innerHTML = 'Loading...'
    const data = await fetchPokemon(pokemon)
    if(data) {
        pokeName.innerHTML = `${data.id} - ${data.name}`
        searchPoke = data.id
        pokeImg.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_shiny"];
        tp.innerHTML = `Tp: ${data["types"][0]["type"]["name"]}`
        hp.innerHTML = `hp: ${data["stats"][0]["base_stat"]}`
        at.innerHTML = `At: ${data["stats"][1]["base_stat"]}`
        input.value = ''
    } else {
        pokeName.innerHTML = 'Ops, não existe!'
        pokeImg.style.display = 'none'
        tp.innerHTML = 'Tp: ???'
        hp.innerHTML = 'Hp: ???'
        at.innerHTML = 'At: ???'
    }
    //console.log(data)
}
//render('5000')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    render(input.value.toLowerCase())
})

buttonP.addEventListener('click', () => {
    searchPoke += 1
    render(searchPoke)
})

buttonV.addEventListener('click', () => {
    searchPoke -= 1
    render(searchPoke)
})

reset.addEventListener('click', () => {
    searchPoke = 1
    render(searchPoke)
})

function sombrear() {
    sombra.style.backgroundColor = '#767189'
}

function mouseup() {
    sombra.style.backgroundColor = 'black'
}

render(searchPoke)

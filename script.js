//let url = "https://pokeapi.co/api/v2/"
//let query = "/pokemon"
//let name = "/charizard"

//let ENDPOINT = url+ query + name 

//console.log (ENDPOINT)

//let promise = fetch (ENDPOINT)

//console.log (promise)

//promise.then ((res)=> {
    //console.log(res)
    //return res.json()
//})
//.then ((data) => console.log (data))

async function searchPokemon() {
    try {
        const pokemonName = document.getElementById("pokemon-name").value.trim().toLowerCase(); // Ensure proper formatting
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        
        if (!response.ok) {
            throw new Error('Pokemon not found'); 
        }

        const data = await response.json();
        const pokemonSprite = data.sprites.front_default;
        const imgElement = document.getElementById("PokemonSprite");
        
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block"

    } catch (error) {
        console.error(error.message); 
        alert(error.message);
    }
}

document.getElementById('pokemon-button').addEventListener('click', searchPokemon);

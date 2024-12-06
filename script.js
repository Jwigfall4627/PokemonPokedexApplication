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
        const pokemonAbilities = document.getElementById("pokemonAbilities")
        console.log(data)
        
        imgElement.src = pokemonSprite;
        imgElement.style.display = "block"
        pokemonAbilities.src = "abilities"
        pokemonAbilities.display = "block"

        const abilities = data.abilities.map((ability) => ability.ability.name).join(', ');
        pokemonAbilities.value = `Abilities: ${abilities}`;

    } catch (error) {
        console.error(error.message); 
        alert(error.message);
    }
}

document.getElementById('pokemon-button').addEventListener('click', searchPokemon);

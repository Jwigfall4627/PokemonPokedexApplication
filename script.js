let isShiny = false; // Tracks whether the shiny version is displayed
let currentPokemonData = null; // Stores the currently loaded Pokémon data

async function fetchAllPokemon() {
    const grid = document.getElementById('pokemon-grid02');
    grid.innerHTML = 'Loading Pokémon...';

    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const data = await response.json();

        grid.innerHTML = ''; // Clear loading message
        const pokemonList = data.results;

        for (const pokemon of pokemonList) {
            const pokemonData = await fetch(pokemon.url).then(res => res.json());
            const card = document.createElement('div');
            card.classList.add('pokemon-card');
            card.innerHTML = `
                <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                <h3>${pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1)}</h3>
            `;
            card.onclick = () => {
                document.getElementById('pokemon-name').value = pokemonData.name;
                searchPokemon();
            };
            grid.appendChild(card);
        }
    } catch (error) {
        console.error(error);
        grid.innerHTML = 'Failed to load Pokémon.';
    }
}

async function searchPokemon() {
    const pokemonName = document.getElementById('pokemon-name').value.trim().toLowerCase();
    const imgElement = document.getElementById('PokemonSprite');
    const abilitiesElement = document.getElementById('pokemonAbilities');
    const shinyButton = document.getElementById('toggleShiny');

    if (!pokemonName) {
        alert('Please enter a Pokémon name.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) throw new Error('Pokémon not found');

        const data = await response.json();
        currentPokemonData = data; // Store current Pokémon data
        isShiny = false; // Reset shiny state

        imgElement.src = data.sprites.front_default;
        imgElement.style.display = 'block';

        shinyButton.style.display = 'inline-block'; // Show the shiny toggle button

        const abilities = data.abilities.map(ability => ability.ability.name).join(', ');
        abilitiesElement.value = `Abilities: ${abilities}`;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function toggleShiny() {
    if (!currentPokemonData) return; // Ensure a Pokémon is selected

    const imgElement = document.getElementById('PokemonSprite');
    const shinyButton = document.getElementById('toggleShiny');

    isShiny = !isShiny; // Toggle shiny state
    imgElement.src = isShiny ? currentPokemonData.sprites.front_shiny : currentPokemonData.sprites.front_default;
    shinyButton.textContent = isShiny ? 'View Normal' : 'View Shiny';
}

// Fetch all Pokémon when the page loads
document.addEventListener('DOMContentLoaded', fetchAllPokemon);

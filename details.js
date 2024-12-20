async function loadPokemonDetails() {
    const params = new URLSearchParams(window.location.search);
    const pokemonName = params.get('name');
    
    if (!pokemonName) {
        alert('No Pokémon specified!');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const data = await response.json();
        document.getElementById("pokemonTitle").textContent = data.name;
        document.getElementById("pokemonDetailsSprite").src = data.sprites.front_shiny;
        document.getElementById("pokemonInfo").textContent = `
            Abilities: ${data.abilities.map(a => a.ability.name).join(', ')}
            Height: ${data.height}
            Weight: ${data.weight}
            Base Experience: ${data.base_experience}
        `;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

function goBack() {
    window.history.back();
}

document.addEventListener('DOMContentLoaded', loadPokemonDetails);

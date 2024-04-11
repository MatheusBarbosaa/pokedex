document.addEventListener("DOMContentLoaded", () => {
    fetch('/pokebola')
        .then(response => response.json())
        .then(data => {
            const pokebola = document.querySelector('#pokebola');
            //este código abaixo mostra todas informações dos cards na pagina home
            if (data.length > 0) {
                data.forEach(pokebolas => { // Renomeando a variável do loop forEach
                    const card = document.createElement('div');
                    card.classList.add('col-4');

                    card.innerHTML = `
                    <br>
                    <br>
                    <br>
                    <div class="card">
                        <img src=${pokebolas.imagem} class="card-img-top" alt=${pokebolas.nome}>
                        <div class="card-body">
                            <h4 class="card-title">${pokebolas.nome}</h4>
                            <p class="card-text">Nível: ${pokebolas.nivel}</p>
                            <p class="card-text">Tipo: ${pokebolas.tipo}</p>
                        </div>
                        <button class="btn btn-danger" onclick="deletarpokebola(${pokebolas.id})">Deletar</button>
                    </div>
                `;
                    pokebola.appendChild(card);
                });
            } else {
                pokebola.innerHTML = `<h2>Nenhum pokémon encontrado.</h2>`;
            }
        });
});

document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Impede o envio do formulário padrão
    const buscarPokemon = document.getElementById('searchInput').value;
    const response = await fetch(`/buscar/${buscarPokemon}`);
    const pokemon = await response.json();

    if (pokemon) { // Verifica se o pokemon foi encontrado!!!!
        // Limpar os detalhes dos Pokémon existentes na página inicial
        document.getElementById('pokebola').innerHTML = ''; //onde fica o ID do card

        // Exibir detalhes do Pokémon pesquisado
        const pokemonDetails = document.createElement('div');
        pokemonDetails.classList.add('col-md-4', 'mb-4');
        pokemonDetails.innerHTML = `
                    <br>
                    <br>
                    <br>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${pokemon.nome}</h5>
                    <img src="${pokemon.imagem}" class="card-img-top" alt="${pokemon.nome}">
                    <p class="card-text">Tipo: ${pokemon.tipo}</p>
                    <p class="card-text">Level: ${pokemon.nivel}</p>
                </div>
            </div>
        `;
        document.getElementById('pokebola').appendChild(pokemonDetails);
    } else {
        // Exibe uma mensagem caso o Pokémon não seja encontrado
        document.getElementById('pokemonDetails').innerHTML = `<h2>Pokémon não encontrado.</h2>`;
    }
});



function deletarpokebola(id) {
    fetch(`/pokebola/${id}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            window.location.reload();
        });
}


document.addEventListener("DOMContentLoaded", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    fetch('/api/pokebola?id=' + id)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na solicitação. Status: ' + response.status);
            }
            return response.json();
        })
        .then(pokebola => {
            const pokeboladiv = document.querySelector('#pokebola');
            const card = document.createElement('div');
            card.innerHTML = `
                    <div class="card">
                        <div class="row g-0">
                            <div class="col-md-4">
                                <img src=${pokebola.imagem} class="card-img col-4" alt=${pokebola.nome}>
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h2 class="card-title">${pokebola.nome}</h2>
                                    <br>
                                    <h4 class="card-title">${pokebola.tipo}</h4>
                                    <h5 class="card-title">${pokebola.nivel}</h5>
                                </div>
                            </div>
                        </div>
                    </div> 
                `;
            pokeboladiv.appendChild(card);
        })
        .catch(error => {
            const pokeboladiv = document.querySelector('#pokebola');
            const card = document.createElement('h2');
            card.innerHTML = `Pokebola não encontrada.`;
            pokeboladiv.appendChild(card);
        });
});

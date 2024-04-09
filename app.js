const express = require('express'); //importando o express
const path = require('path');//modulo do node para trabalhar com caminhos

const app = express() //instanciando uma função express para começar a criar minhas rotas
const Pokebola = require('./src/models/Pokebola'); //importando o arquivo das tabelas
const { error } = require('console');
const sequelize = require('./src/models/db');
const { Sequelize } = require('sequelize');


app.use(express.json()); //minha aplicação recebe dados do tipo json

app.use(express.urlencoded({ extended: false }));
app.use(express.json());//configuração para receber resposta do cliente, dados inseridos.

app.use(express.static(path.join(__dirname, 'public')));
app.use('/imagens', express.static(__dirname + '/public/imagens'));



app.get('/', function (req, res) {
    res.status(200).redirect('/pokedex.html');
});

app.get('/pokedex.html', function (req, res) {
    res.sendFile(__dirname + '/public/pokedex.html')
});

app.get('/cadastro.html', function (req, res) {
    res.sendFile(__dirname + '/public/cadastro.html')
});

app.post('/cadastro', async (rec, res) => { //enviando dados para o banco de dados
    await Pokebola.create(rec.body)
        .then(() => {
            res.status(200).redirect('/pokedex.html');
        }).catch((e) => {
            res.status(400);
        })
    console.log(rec.body)

});

app.get('/pokebola', async (req, res) => { //mostrar todos os pokemons na pagina home
    const pokebola = await Pokebola.findAll();
    return res.json(pokebola);
});


app.get("/editarPokemon", async (re, res) => {
    const id = req.params.id;
    res.render('editar', { id: id });
})


app.get('/api/pokebola', async (req, res) => { //pagina de detalhes
    const id = req.query.id;
    const pokebola = await Pokebola.findByPk(id);
    if (pokebola) {
        return res.json(pokebola);
    } else {
        return res.status(404);
    }
});


app.get('/buscar/:nome', async (req, res) => {//rota para procurar pokemons
    const nome = req.params.nome;
    try {
        const pokemon = await Pokebola.findOne({ where: { nome: nome } });
        if (pokemon) {
            console.log('Pokémon encontrado:', pokemon); // Adicionando um log para verificar o Pokémon encontrado
            return res.json(pokemon);
        } else {
            console.log('Pokémon não encontrado'); // Adicionando um log para indicar que o Pokémon não foi encontrado
            return res.status(404).json({
                error: true,
                message: 'Pokémon não encontrado!'
            });
        }
    } catch (error) {
        console.error('Erro ao buscar o Pokémon:', error); // Adicionando um log para indicar se houve algum erro na busca do Pokémon
        return res.status(400).json({
            error: true,
            message: 'Erro ao buscar o Pokémon'
        });
    }
});


app.delete('/pokebola/:id', async (req, res) => { //rota para deletar pokemons
    const id = req.params.id;
    const pokebola = await Pokebola.destroy({ where: { id: id } });
    console.log(pokebola);
    return res.json(pokebola);
});


Pokebola.sync() // sincronizando o modelo com o banco de dados
    .then(() => {
        console.log('Modelo sincronizado com o banco de dados.');
    })
    .catch(error => {

        console.error('Erro ao sincronizar o modelo com o banco de dados:', error);
    });

app.listen(8080, function () {
    console.log("Servidor rodando em: http://localhost:8080");
});
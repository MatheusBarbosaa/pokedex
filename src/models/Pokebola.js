const Sequelize = require('sequelize');
const db = require('./db');

const Pokebola = db.define('pokebola', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nivel: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Pokebola.sync();//cria a tabela no banco de dados

module.exports = Pokebola;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'pokedex',
    'root',
    '123456789', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()

    .then(function () {

        console.log('Conexão realizada!')

    }).catch(function () {

        console.log('Conexão errada!')
    });

module.exports = sequelize;
// Configuração de conexão (exemplo para Node.js com mongoose)
// Não conecta à internet, apenas estrutura

const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost:27017/streaming';

module.exports = { dbURI };

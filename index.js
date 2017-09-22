const express = require('express')
const mongoose = require('mongoose')
const app = express();

mongoose.connect('mongodb://localhost:27017/emprestimos')

const ClienteSchema = {
	nome: String,
	renda: Number,
	email: String,
	senha: String,
	emprestimos: Array
}

const Cliente = mongoose.model('Cliente', ClienteSchema);

app.get('/hello', (req, res) => {
	res
		.status(200)
		.send('Hello World')
})

app.listen(3000, (err) => {
	console.log('Is up')
})
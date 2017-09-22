const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express();

mongoose.connect('mongodb://localhost:27017/emprestimos')

const ClienteSchema = {
	nome: {
		type: String,
		required: true
	},
	renda: {
		type: Number,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	senha: {
		type: String,
		required: true
	},
	emprestimos: {
		type: Array,
		required: false
	}
}

const Cliente = mongoose.model('Cliente', ClienteSchema);

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
	res
	.status(200)
	.send('Hello World')
})

app.post('/cliente', (req, res) => {
	let oNewCliente = new Cliente(req.body)
	oNewCliente.save((err, oClienteCriado) => {
		res.json(oClienteCriado)
	})

})

app.listen(3000, (err) => {
	console.log('Is up')
})

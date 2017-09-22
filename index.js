const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passwordHash = require('password-hash');

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

	req.body.senha = passwordHash.generate(req.body.senha);
	let oNewCliente = new Cliente(req.body)


	oNewCliente.save((err, oClienteCriado) => {
		if(!oClienteCriado){
			res.send(err);
			return;
		}
		res
		.status(201)
		.json(oClienteCriado)
	})

})

app.post('/simulacao', (req, res) => {

	if(!req.body.valor || !req.body.parcelas){
		res.sendStatus(400)
		return
	}

	let valorTotalComJuros = req.body.valor * 1.08
	res.json({
		"parcela": valorTotalComJuros / req.body.parcelas
	})

})



app.listen(3000, (err) => {
	console.log('Is up')
})

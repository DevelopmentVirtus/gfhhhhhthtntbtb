const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}))

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send("Teste de plataforma PetShop");
})


const sql = require('mssql/msnodesqlv8');
var config = {
    user: 'sa',
    password: '123',
    database: 'petshop',
    server: '\\http://187.54.237.159:8885\\SHERWIK\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
        trustedConnection: true
    }
};

app.get('/anao', function(req, res) {
    res.json({"texto": "Ta funcionando!"})
})


app.post('/petshop', function(req, res) {
    let intentName = request.body.queryResult.intent.displayName;

    if (intentName === "agendamento"){
        let nome = request.body.queryResult.parameters['nome-cliente'];
        let fone = request.body.queryResult.parameters['fone-cliente'];


        sql.connect(config, function(err) {
            if (err) {
                console.log(err);
            }
            var request = new sql.Request();
            request.query("INSERT INTO clientes (nome, fone) VALUES ('" + nome + "', '" + fone + "')", function(err, recordSet) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log (recordSet)
                    res.json({"fulfillmentText": "Seus dados foram salvos com sucesso, quer agendar agora?"})
                }
            })
        })
        sql.end();

    }
})


var port = process.env.PORT || 8885;
const listener = app. listen(port, function() {
    console.log('Servidor ativo!');
})
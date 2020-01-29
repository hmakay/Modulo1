const express = require('express')

// é assim que se exporta

const app = express() // se está instanciando a função do express

//informar express para q ele leia o json

app.use(express.json())


//vamos criar agora os métodos get POST PUT E DELETE
/*
  get = usado para buscar ou trazer uma lista de algo do back
  post = usado para criar ou inserir dados
  put = usado para editar uma informação
  delete = usado para deletar
*/


/*
  formato das querys  

  Query params = ?nome=hugo  
  Route params = /users/1  - /users/:id
  request body = "{"name": "hugo", "email":"tal@gmail.com"}"

*/

const users =['Hugo', 'Eduardo', 'Fideles','Silva']

// exemplo de midware global
app.use( (req,res, next)=> {



  next();

  console.log("finalizou")

})

function checkUserExists(req, res, next) {
  if(!req.body.name){
    return res.status(400).json({error:'user name is required'})
  }
  return next();
}

function checkUserInArray(req, res, next){
  const user = users[req.params.index]
  if(!user){
    return res.status(400).json({error: 'Usuario does not exists'})

  }
  req.user = user;


  return next()

  
}

app.get( '/', () => {
  console.log("diretório raiz");
});


app.get('/users/',(req,res) => {

  return res.json(users);

})

app.post('/users', checkUserExists, (req,res) => {

  const {name} = req.body

  users.push(name)
  
  return res.json(users)
})

app.get( '/users/:index', checkUserInArray,(req,res) => {

  //const nome  = req.query.nome  -> busca o campo nome na url
  // const id = req.params.id -> pega via router params o id
  //const { index } = req.params //-> desta forma desestrutura (es6) o req e pega o campo igual a constante


 //return res.send('ola mundo') // res.send envia um texto de volta
 return res.json(req.user) // res.send envia um json de volta

});

app.put('/users/:index',checkUserInArray, checkUserExists, (req,res)=>{
  const index = req.params.index
  const {name,id} = req.body

  
  users[index] = name

  return res.json({users})
});

app.delete('/users/:index', checkUserInArray,(req, res)=>{
  const {index} = req.params

  users.splice(index,1)
  return res.send()
})







app.listen(3030) // aqui faz o app "escutar" e abrir um servidor na porta 3030 E VAI POR ULTIMO NO CÓDIGO





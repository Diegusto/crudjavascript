
const express = require('express')
const { read } = require('fs')
const { type } = require('os')
const { rawListeners } = require('process')
const app = express()
app.use(express.json())
const port = 3000
const tarefas = []
const readline = require('readline')

//exibe a lista de tarefas
app.get('/tarefas', (req, res) => 
{
  return res.json(tarefas)
})

//cria tarefas
app.post ('/tarefas', (req, res) =>
{
    const {tarefa} = req.body
    tarefas.push(tarefa)
    tarefas.push("não concluido")

    return res.json(tarefas)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})

//atualiza tarefas
app.put ('/tarefas/:index', (req, res) =>
{
  const {index} = req.params
  const {tarefa}= req.body

  tarefas[index] = tarefa

  return res.json(tarefas)
})


//conclui tarefas
const pergunta = readline.createInterface
({
  input: process.stdin,
  output: process.stout
})

console.log("pressione 1 para concluir uma tarefa")
pergunta.question("?", function concluir (resposta)
{
  if (resposta == "1")
  {
    console.log(tarefas)

    console.log("escolha uma tarefa para concluir")
    pergunta.close()

    const pergunta1 = readline.createInterface
    ({
      input: process.stdin,
      output: process.stdout
    })

    pergunta1.question(":", function alterar (resposta1)
    {
        let tarefaint = parseInt(resposta1)
        if (tarefaint != 1)
        {
          tarefaint++
        }
  
        tarefas.splice(tarefaint, 1, "concluido")
        console.log(tarefaint)
        console.log(tarefas)
        pergunta.close()
  }
  )
  }
}
)


app.delete('/tarefas/:index', (req, res) => {
  const {index} = req.params

  tarefas.splice(index, 2)

  return res.send()
})
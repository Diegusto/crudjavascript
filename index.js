
const express = require('express')
const app = express()
app.use(express.json())
const port = 3000
const tarefas = []


//exibe a lista de tarefas
app.get('/tarefas', (req, res) => 
{
  return res.json(tarefas)
})

//cria tarefas
app.post ('/tarefas', (req, res) =>
{
    const tarefa = req.body
    tarefas.push(tarefa)

    return res.json(tarefas)
})

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})


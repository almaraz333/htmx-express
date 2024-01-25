import express from 'express'

const app = express()

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }))

app.use(express.json())

app.get("/users", async (req, res) => {
  const limit = Number(req.query.limit) || 10

  const response = await fetch(`https://jsonplaceholder.typicode.com/users?_limit=${limit}`)
  const resJSON = await response.json()

  setTimeout(() => {
    res.send(
      `
    <h1 class="text-2xl font-bold my-4">Users</h1>
    <ul>
     ${resJSON.map((item) => {
        return `<li>${item.name}</li>`
      }).join("")
      }
    </ul>
`
    )
  }, 1000)
})

app.post("/convert", (req, res) => {
  setTimeout(() => {
    const value = req.body.fahrenheit
    const convertedValue = (Number(value) - 32) * (5 / 9)

    res.send(
      `
    <h1 class="text-2xl font-bold my-4">Converted Value:</h1>
      <span>${convertedValue.toFixed(1)}&deg;C</span>
    `
    )
  }, 2000)
})

app.get("/poll", async (req, res) => {
  const id = Math.floor(Math.random() * 500)
  const data = await fetch(`https://jsonplaceholder.typicode.com/comments/${id}`)
  const dataJSON = await data.json()

  res.send(
    ` 
    <div>
    <span class="max-w-20 text-center">${dataJSON.body}</span>
</div>
      
    `
  )
})

app.post("/search/api", async (req, res) => {
  const searchTerm = req.body.search.toLowerCase();

  const users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json()

  const filteredUsers = users.filter((item) => item.name.toLowerCase().includes(searchTerm));

  const emptyResultsRes = `<tr></tr>`

  const resHTML = filteredUsers.map(contact => {
    return (
      `
           <tr>
        <td><div class="my-4 p-2">${contact.name}</div></td>
        <td><div class="my-4 p-2">${contact.email}</div></td>
      </tr>
`
    )
  })

  setTimeout(() => {
    if (!searchTerm) {
      res.send(emptyResultsRes)
    } else {
      res.send(resHTML.join(''))
    }
  }, 2000)

})

app.listen(3000, () => {
  console.log("APP RUNNING ON PORT: 3000")
})

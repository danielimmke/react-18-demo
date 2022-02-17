const express = require('express')
const cors = require('cors')
const app = express()
const port = 4000

app.use(cors())

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

app.get('/data', async (req, res) => {
  await sleep(6000);

  res.status(200).json({message: 'This message was fetched from a server and displayed with Suspense! 😁 😁 😁'})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
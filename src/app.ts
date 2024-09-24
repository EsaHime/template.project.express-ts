import 'dotenv/config'

import path from 'path'
import url from 'url'
import express from 'express'
import session from 'express-session'

declare module 'express-session' {
  interface SessionData {
    // Add properties here.
  }
}

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const port = parseInt(process.env.PORT || '5000')

const app = express()
app.set('view engine', 'pug')
app.set('views', path.resolve(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))

app.use(session({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: true
  }
}))

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

export {
  app
}

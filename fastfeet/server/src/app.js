import 'dotenv/config'

import express from 'express'
import path from 'path'
import Youch from 'youch'
import 'express-async-errors'
import routes from './routes'
import cors from 'cors'
import './database'

class App {
  constructor() {
    this.server = express()
    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }
  middlewares() {
    this.server.use(express.json())
    this.server.use(cors())
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'temp', 'uploads'))
    )
  }
  routes() {
    this.server.use(routes)
  }
  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON()
        return res.status(500).json(errors)
      } else return res.status(500).json({ err: 'ISE' })
    })
  }
}

export default new App().server

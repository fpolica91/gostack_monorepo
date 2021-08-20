import 'dotenv/config'

import express from 'express'
import path from 'path'
import Youch from 'youch'
import * as Sentry from '@sentry/node'
import sentryConfig from './config/sentry'
import cors from 'cors'
// when using await errors will not go to sentry
import 'express-async-errors'
import routes from './routes'
import './database'

class App {
  constructor() {
    this.server = express()
    Sentry.init(sentryConfig)
    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }
  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler())
    this.server.use(cors())
    this.server.use(express.json())

    // THIS IS USED TO SERVER STATIC FILES
    this.server.use(
      '/files',
      express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
    )
  }
  routes() {
    this.server.use(routes)
    this.server.use(Sentry.Handlers.errorHandler())
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

import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import account from './src/accounts.js'

const app = new Hono()

// Activate cors
app.use('*', cors())

app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

app.route('/accounts', account)

serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🚀 Mock started on http://localhost:${info.port}`)
})

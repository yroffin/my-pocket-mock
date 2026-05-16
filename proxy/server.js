import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

// Activate cors
app.use('*', cors())

app.use('*', async (c, next) => {
  console.log(`[${c.req.method}] ${c.req.url}`)
  await next()
})

app.get('/accounts/:id', async (c) => {
  const accountId = c.req.param('id')

  try {
    const pbResponse = await fetch(`http://pocketbase:8090/api/collections/accounts/records/${accountId}`)
    
    if (!pbResponse.ok) {
      return c.json({ error: "Not found in PocketBase" }, 404)
    }
    
    const pbData = await pbResponse.json()

    const mockResponse = {
      account_id: pbData.id,
    }

    return c.json(mockResponse)

  } catch (error) {
    console.error("Erreur lors du fetch PocketBase:", error)
    return c.json({ error: "Internal Server Error", details: error.message }, 500)
  }
})

// Démarrage du serveur sur le port 3000
serve({ fetch: app.fetch, port: 3000 }, (info) => {
  console.log(`🚀 Mock started on http://localhost:${info.port}`)
})
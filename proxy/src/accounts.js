import { Hono } from 'hono'

const account = new Hono()

account.get('/:id', async (c) => {
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
    console.error("Erreur lors du fetch:", error)
    return c.json({ error: "Internal Server Error", details: error.message }, 500)
  }
})

export default account
import Fastify from 'fastify'
import pg from 'pg'

const app = Fastify()
const { Pool } = pg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

app.get('/', async () => {
  return { status: 'API funcionando' }
})

app.get('/health', async () => {
  return { status: 'ok' }
})

app.get('/db', async () => {
  const result = await pool.query('SELECT NOW() as tiempo')
  return { db: 'conectada', tiempo: result.rows[0].tiempo }
})

await app.listen({ port: 3000, host: '0.0.0.0' })
console.log('API corriendo en puerto 3000')

[7:36 p.m., 17/7/2025] Cannabisttva: {
  "version": 2,
  "builds": [
    { "src": "backend/server.js", "use": "@vercel/node" },
    { "src": "frontend/index.html", "use": "@vercel/static" }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/backend/server.js" },
    { "src": "/(.*)", "dest": "/frontend/index.html" }
  ]
}
[8:07 p.m., 17/7/2025] Cannabisttva: import express from 'express'
import cors from 'cors'
import { createClient } from '@supabase/supabase-js'

const app = express()
app.use(cors())
app.use(express.json())

// ✅ Variables de entorno (las pondrás en Vercel)
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE
const supabase = createClient(supabaseUrl, supabaseKey)

// ✅ Ruta de prueba
app.get('/', (req, res) => {
  res.send('✅ API Fundación Proteger funcionando con Supabase')
})

// ✅ PACIENTES
app.post('/api/pacientes', async (req, res) => {
  const { nombre, edad, direccion, fecha_nacimiento, nacionalidad } = req.body
  const { data, error } = await supabase.from('pacientes').insert([{ 
    nombre, edad, direccion, fecha_nacimiento, nacionalidad 
  }])
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

app.get('/api/pacientes', async (req, res) => {
  const { data, error } = await supabase.from('pacientes').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// ✅ HISTORIA CLÍNICA
app.post('/api/historia', async (req, res) => {
  const { nombre_paciente, fecha_consulta, profesional, diagnostico, tratamiento } = req.body
  const { data, error } = await supabase.from('historia_clinica').insert([{ 
    nombre_paciente, fecha_consulta, profesional, diagnostico, tratamiento 
  }])
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

app.get('/api/historia', async (req, res) => {
  const { data, error } = await supabase.from('historia_clinica').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// ✅ TURNOS
app.post('/api/turnos', async (req, res) => {
  const { nombre, fecha, hora, nota } = req.body
  const { data, error } = await supabase.from('turnos').insert([{ nombre, fecha, hora, nota }])
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

app.get('/api/turnos', async (req, res) => {
  const { data, error } = await supabase.from('turnos').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// ✅ INVENTARIO
app.post('/api/inventario', async (req, res) => {
  const { nombre, descripcion, cantidad, movimiento } = req.body
  const { data, error } = await supabase.from('inventario').insert([{ 
    nombre, descripcion, cantidad, movimiento 
  }])
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

app.get('/api/inventario', async (req, res) => {
  const { data, error } = await supabase.from('inventario').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// ✅ GASTOS
app.post('/api/gastos', async (req, res) => {
  const { tipo, monto, descripcion, fecha } = req.body
  const { data, error } = await supabase.from('gastos').insert([{ 
    tipo, monto, descripcion, fecha 
  }])
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

app.get('/api/gastos', async (req, res) => {
  const { data, error } = await supabase.from('gastos').select('*')
  if (error) return res.status(400).json({ error: error.message })
  res.json(data)
})

// ✅ INICIO SERVIDOR (solo en local)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(🚀 Servidor corriendo en puerto ${port}))
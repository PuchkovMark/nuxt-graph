//const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const WolframAlphaAPI = require('wolfram-alpha-api');
const app = require('./app')
const waApi = WolframAlphaAPI('KKJ345-W8TPPW57J5');

const PORT = process.env.PORT || 5000
// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start () {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(PORT, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${PORT}`,
      badge: true
    })
  })
  //waApi.getFull('sin x').then(console.log).catch(console.error);
}
start()

app.post('/api', async (req, res) => {
  const exp = (req.body.expression).toString()
  console.log(exp)
  const Data = await waApi.getFull(exp).then(data => data).catch(console.error)
  //console.log(Data.pods)
  res.json({
    data: Data.pods
  })
})



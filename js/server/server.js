// GLOBALS
const express = require('express')

const app = express()

const router = express.Router()
const apiRouter = express.Router()
const scriptRouter = express.Router()

const port = process.env.PORT || 80

let routerOptions = { root: __dirname }


// MIDDLEWARE
router.use((req, res, next) => {
  console.log(req.method, req.url)
  next()
})


// ROUTES
// index
router.get('/', (req, res) => {
  res.sendFile('html/index.html', routerOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    }
    else {
      console.log('loaded index')
    }
  })
})

// about
router.get('/about', (req, res) => {
  res.sendFile('html/about.html', routerOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    }
    else {
      console.log('loaded about')
    }
  })  
})

// game
router.get('/game', (req, res) => {
  res.sendFile('html/game.html', routerOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    }
    else {
      console.log('loaded game')
    }
  })
})

// scripts
scriptRouter.get('/three.js', (req, res) => {
  res.sendFile('js/utils/three.js', routerOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    }
    else {
      console.log('loaded threejs')
    }
  })
})

scriptRouter.get('/game.build.js', (req, res) => {
  res.sendFile('js/build/game.build.js', routerOptions, (err) => {
    if (err) {
      console.log(err)
      res.status(err.status).end()
    }
    else {
      console.log('loaded game')
    }
  })
})

// api
apiRouter.get('/', (req, res) => {
  res.send(`api page`)
})


// USER ROUTER
app.use('/', router)
app.use('/scripts', scriptRouter)
app.use('/api', apiRouter)


// START THE SERVER
app.listen(port)
console.log(`listening on port ${port}`)
const express = require('express')
const hbs = require('hbs')
const path = require('path')
const port = 3000
 
const app = express() 
app.use(express.urlencoded({extended:true}))

const morgan = require('morgan')
app.use(morgan('tiny'))

// set view 
app.set('views',path.join(__dirname,'views'))
app.set('view engine','hbs')
//set folder public sebagai static folder untuk static file
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index',{
      title: "Cari Stories Wattpad"
    })
})
 
app.post('/', async (req, res) => {
  const query = req.body.search
  const scrape = require('./search')
  const result = await scrape(query) 
  res.render('index',{
      title: req.body.search, 
      result
    })
})

app.get('/story/:id', async (req, res) => {
  const id = req.params.id
  try {
    const storyID = require('./detail')
    const detailstory = await storyID(id)
    res.render('detail', {
      detailstory
    })

  }catch(error){
    console.log(error)
  }
})



app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})
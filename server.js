const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const shortURL = require('./models/shortURL')

const app = express()

mongoose.connect('mongodb://127.0.0.1/urlShortener', {
    useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/shortened/:short', (req, res) => {
    res.render('shortened_url', {url: req.params.short})
})

app.get('/list', async (req, res) => {
    const shortURLs = await shortURL.find()
    res.render('urllist', {shortURLs: shortURLs})
})

// Redirect to full URL page.
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await shortURL.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.url)
})

app.post('/shortenURL', async (req, res) => {
    let shortUrl = await shortURL.findOne({ url: req.body.fullURL })

    if (!shortUrl)
        shortUrl = await shortURL.create({ url: req.body.fullURL })

    res.redirect('shortened/' + shortUrl.short)
})

app.post('/goto', (req, res) => {
    const back = req.body.back
    const copyLink = req.body.copyLink
    const viewAll = req.body.viewAllURLs

    // If convertNext is pressed, it won't be null
    if (back != null) {
        
        return res.redirect('../')
    }
    
    // If viewAll is pressed, it won't be null
    if (viewAll != null) {
        return res.redirect('list')
    }

    // If copyLink is pressed, it won't be null
    if (copyLink != null) {

        // Copy URL to clipboard
        console.log("Link: " + url)
    }
    res.redirect('/shortened')
})

app.listen(process.env.PORT || 8080)
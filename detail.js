const axios = require('axios')
const cheerio = require('cheerio')
  
module.exports =  async function getId(storyID){
    const url = `https://www.wattpad.com/story/${storyID}`
    const getHtml = await axios.get(url)
    const html = getHtml.data
    const $ = cheerio.load(html)
    const data = {}

    data.title = $('.story-info__title').text().trim()
    data.cover = $('.story-cover').find('img').attr('src')
    data.author = {
        username : $('.left-container .author-info__username').text().trim(),
        link : $('.left-container .author-info__username a').attr('href'),
        ava : $('.author-info__badge').attr('src')
    } 
    data.authorCover = $('.author-info').find('img').attr('src')
    data.storyBadges = $('.story-badges').text().trim()
    data.description = $('.description-text').text().trim()
    data.lastUpdate = $('.table-of-contents__last-updated').text().trim()

    const status = []
    data.status = []
    $('.story-header .stats-item').each(function(){
        const label = $(this).find('.stats-label span').text().trim().toLowerCase()
        data.status[label] = $(this).find('.stats-value').text()
    })

    const chapter = []
    data.chapter = []
    $('.table-of-contents .story-parts li').each(function(){
        const title = $(this).text().trim()
        const link = $(this).find('a').attr('href')
        data.chapter.push({title,link})
    })


    const tagItems = []
    data.tagItems = []
    $('.tag-items').find('li').each(function(){
        data.tagItems.push($(this).text().trim())
    })




    console.log(data)
    return data

}

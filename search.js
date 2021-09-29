const axios = require('axios')
const cheerio = require('cheerio')
 
module.exports =  async function scrape(query){
    const url = `https://www.wattpad.com/stories/${query}`
    const getHtml = await axios.get(url)
    const html = getHtml.data
    const $ = cheerio.load(html) 
    const storylist = [] 
 
    $('.browse-story-item').each(function(){
        const title = $(this).find('.title').text().trim() 
        const url = $(this).find('a').attr('href').split('-')[0]
        const img = $(this).find('img').attr('src')
        const author = $(this).find('.username').text().trim()
        const description = $(this).find('.description').text()

        const read = $(this).find('.read-count').text().trim()
        const vote = $(this).find('.vote-count').text().trim()
        const part = $(this).find('.part-count').text().trim()

        const tagList = []
        $(this).find('li').each(function(){
            tagList.push($(this).text().trim())
        })

        storylist.push({title,url,img,author,description,read,vote,part,tagList})
    })

    console.log(storylist)
    return storylist
}



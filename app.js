const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: process.env.FB_ACCESS_TOKEN,
  verify: process.env.FB_VERIFY_TOKEN,
  app_secret: process.env.FB_APP_SECRET
})

bot.on('error', (err) => {
  console.log(err.message)
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    reply({ text }, (err) => {
      if (err) throw err

      console.log(`Devuelto a ${profile.first_name} ${profile.last_name}: ${text}`)
    })
	
  })
})

http.createServer(bot.middleware()).listen(process.env.PORT)
console.log('Swiss Medical bot server running at port ' + process.env.PORT)
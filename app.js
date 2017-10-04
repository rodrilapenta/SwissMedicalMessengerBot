const http = require('http')
const Bot = require('messenger-bot')

let bot = new Bot({
  token: process.env.FB_ACCESS_TOKEN,
  verify: process.env.FB_VERIFY_TOKEN,
  app_secret: process.env.FB_APP_SECRET
})

bot.setPersistentMenu([{
      "locale":"default",
      "composer_input_disabled":true,
      "call_to_actions":[
        {
          "title":"My Account",
          "type":"nested",
          "call_to_actions":[
            {
              "title":"Pay Bill",
              "type":"postback",
              "payload":"PAYBILL_PAYLOAD"
            },
            {
              "title":"History",
              "type":"postback",
              "payload":"HISTORY_PAYLOAD"
            },
            {
              "title":"Contact Info",
              "type":"postback",
              "payload":"CONTACT_INFO_PAYLOAD"
            }
          ]
        },
        {
          "type":"web_url",
          "title":"Latest News",
          "url":"http://petershats.parseapp.com/hat-news",
          "webview_height_ratio":"full"
        }
      ]
    },
    {
      "locale":"es_LA",
      "composer_input_disabled":false
    }
], function() {console.log("Menu configurado")})

bot.on('error', (err) => {
  console.log(err.message)
})

ot.on('postback', (payload, reply, actions) => {
  reply({ text: 'hey!' + payload}, (err, info) => {})
})

bot.on('message', (payload, reply) => {
  let text = payload.message.text

  bot.getProfile(payload.sender.id, (err, profile) => {
    if (err) throw err

    /*reply({ text }, (err) => {
      if (err) throw err

      console.log(`Devuelto a ${profile.first_name} ${profile.last_name}: ${text}`)
    })*/
	
	bot.sendSenderAction(payload.sender.id, senderAction, [callback])
  })
})

http.createServer(bot.middleware()).listen(process.env.PORT)
console.log('Swiss Medical bot server running at port ' + process.env.PORT)
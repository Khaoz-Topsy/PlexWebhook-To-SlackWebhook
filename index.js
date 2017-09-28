var express = require('express')
  , request = require('request')
  , multer  = require('multer');
  
const Slack = require('slack-node');


const slack = new Slack();
slack.setWebhook('https://hooks.slack.com/services/CODE');

var app = express();
var upload = multer({ dest: '/tmp/' });

app.post('/', upload.single('thumb'), function (req, res, next) {
	var payload = JSON.parse(req.body.payload);
	console.log('Got webhook for', payload.event);

	var action;

    if (payload.event === 'media.scrobble') {
      action = 'played';
    } else if (payload.rating > 0) {
      action = 'rated ';
      for (var i = 0; i < payload.rating / 2; i++) {
        action += ':star:';
      }
    } else if (payload.event === 'media.play'){
      action = 'started';
    }
	else {
      action = 'nevermind';
	}
	
	var Title = (payload.Metadata.grandparentTitle == undefined ? '' : (payload.Metadata.grandparentTitle + ' - ')) +
				(payload.Metadata.parentTitle == undefined ? '' : (payload.Metadata.parentTitle + ': ')) +
				payload.Metadata.title
	
  
  if (action !== 'nevermind')
  {
	  slack.webhook({
		channel: 'plex',
		icon_emoji: ':plex:',
		attachments: [{
		  fallback: 'Required plain-text summary of the attachment.',
		  color: '#a67a2d',
		  title: Title,
		  text: `ip: ${payload.Player.publicAddress}`,
		  thumb_url: 'http://khaoznet.xyz/host/Pictures/3.png',
		  footer: `${action} by ${payload.Account.title} on ${payload.Player.title} from ${payload.Server.title}`,
		  footer_icon: payload.Account.thumb
		}]
	  }, () => {});
  }
  


  res.sendStatus(200);
});

app.listen(11115);
# PlexWebhook-To-SlackWebhook
Handles Plex webhook and then sends a Slack webhook.

This repo is a mixture of 
* [plexinc/webhooks-slack](https://github.com/plexinc/webhooks-slack)
* [plexinc/webhooks-home-automation](https://github.com/plexinc/webhooks-home-automation)


### Installation

Install the dependencies and devDependencies and start the server.

```sh
 npm install -d
 node index.js
```

### Testing
Use Postman to post to localhost:11115.
- in the body choose "form-data"
- add the key "payload"
- add the contents of TestData.json to the value


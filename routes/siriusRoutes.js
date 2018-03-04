const keys = require('../config/cookiejar');
const request = require('request-promise');
const fs = require('fs');

module.exports = app => {
  app.get('/api/currentlyPlaying', (req, res) => {
    const options = {
      method: 'GET',
      uri: keys.siriusUri,
      headers: {
        Cookie: keys.Cookie
      },
      json: true
    };

    request(options)
      .then(function(response) {
        const current = JSON.stringify(response);
        // change filename by timestamp
        fs.writeFile('./json/current.json', current, 'utf8', function(err) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved!');
        });
        // probably make this more serious
        return res.send('good stuff m8');
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}

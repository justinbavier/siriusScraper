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
        
        const timeInMils = new Date().getTime();
        const scrapedFilename = './json/gorilla_scrape-'+timeInMils+'.json';
        
        const fileData = JSON.stringify(response);
        // change filename by timestamp
        fs.writeFile(scrapedFilename, fileData, 'utf8', function(err) {
          if (err) {
            return console.log(err);
          }
          console.log('The file was saved as '+scrapedFilename+'!');
        });
        // probably make this more serious
        return res.send(fileData);
      })
      .catch(function(err) {
        console.log(err);
      });
  });
}

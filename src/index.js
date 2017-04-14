var path = require('path')
var got = require('got')
var createTorrent = require('create-torrent')

module.exports = function (url, overrides) {
  return new Promise(function(resolve, reject) {
    // I'm fixing the creationDate because I want this function to generate
    // identical output for identical input. I'm setting it to 1ms after Jan 1, 1970,
    // because createTorrent uses a loose truthiness check and thinks 0 means
    // no creationDate option was provided.
    var options = {
      name: path.basename(url),
      creationDate: 1,
      urlList: [
        // original URL
        url,
        // a CORS-enabled proxy alternative (also written by yours truly)
        `https://cors-buster.now.sh/?href=${encodeURIComponent(url)}`
      ]
    }
    // I want every option to be the same so I get identical output for identical input.
    // However your use case might be different, so I'll provide an option override mechanism.
    if (overrides) Object.assign(options, overrides)
    got(url, {encoding: null, headers: {origin: 'https://webtorrentify.now.sh'}})
    .then(function(response) {
      createTorrent(response.body, options, function(err, torrentBuffer) {
        if (err) return reject(err)
        resolve(torrentBuffer)
      })
    })
    .catch(reject)
  })
}

# webtorrentify-link
Generate a WebTorrent-compatible .torrent from a URL

## What it does

This module will take a download URL and convert it into a .torrent file. *Warning: it downloads the URL in order to do this.* It's basically a thin wrapper around [create-torrent](https://npm.im/create-torrent) that makes sure the .torrent files satisfy certain properties.

## Features

- **Deterministic.** Assuming the file on the server hasn't changed, identical input will result in identical output.
- **WebSeeds.** It lists the source URL as a WebSeed in order to bootstrap the torrent, so it always has at least one seed.
- **WebTorrent trackers.** Client side JavaScript cannot make UDP requests, so it cannot use traditional UDP trackers. The .torrent files generated use the default tracker list from `create-torrent`, which includes both UDP and WebSocket trackers.

You might also be interested in [`webtorrentify-server`](https://npm.im/webtorrentify-server), which wraps this module in an HTTP microservice.

## Installation

```
npm install webtorrentify-link --save
```

## Usage

    var webtorrentify = require('webtorrentify-link')
    var fs = require('fs')
    
    webtorrentify('https://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz')
    .then(function (buffer) {
      fs.writeFileSync('node-v6.10.2-linux-x64.tar.gz.torrent', buffer)
    })

## License

Copyright 2017 William Hilton.
Licensed under [The Unlicense](http://unlicense.org/).

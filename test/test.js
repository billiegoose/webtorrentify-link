import test from 'ava'
import webtorrentify from '../src'
var parseTorrent = require('parse-torrent')

test('node-v6.10.2-linux-x64.tar.gz', async t => {
  t.plan(3)
  let torrent = parseTorrent(await webtorrentify('https://nodejs.org/dist/v6.10.2/node-v6.10.2-linux-x64.tar.gz'))
  t.true(typeof torrent === 'object')
  t.true(torrent.infoHash === 'e84fdc4e817e0874e6f60c0b4cc1d838fee23602')
  // easier to debug if we ditch the giant binary blobs
  delete torrent.info
  delete torrent.infoBuffer
  delete torrent.infoHashBuffer
  t.snapshot(torrent)
})

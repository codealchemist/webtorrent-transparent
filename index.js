const WebTorrentTransparent = require('./webtorrent-transparent.js')
const webTorrentTransparent = new WebTorrentTransparent()

exports.onApp = (app) => {
  console.log('-- webTorrentTransparent onApp')
  webTorrentTransparent.setApp(app)
}

exports.onWindow = (win) => {
  console.log('-- webTorrentTransparent onWindow')
  webTorrentTransparent.setWindow(win)
}

exports.decorateConfig = (appConfig) => {
  console.log('-- webTorrentTransparent decorateConfig')
  return webTorrentTransparent.decorateConfig(appConfig)
}

exports.decorateMenu = (menu) => {
  console.log('-- webTorrentTransparent decorateMenu')
  return webTorrentTransparent.decorateMenu(menu)
}

exports.decorateWindow = (options) => {
  console.log('-- webTorrentTransparent decorateWindow')
  return webTorrentTransparent.decorateWindow(options)
}

const WebTorrentTransparent = require('./webtorrent-transparent.js')
const webTorrentTransparent = new WebTorrentTransparent()

exports.onApp = (app) => {
  webTorrentTransparent.setApp(app)
}

exports.onWindow = (win) => {
  webTorrentTransparent.setWindow(win)
}

exports.decorateConfig = (appConfig) => {
  return webTorrentTransparent.decorateConfig(appConfig)
}

exports.decorateMenu = (menu) => {
  return webTorrentTransparent.decorateMenu(menu)
}

exports.decorateWindow = (options) => {
  return webTorrentTransparent.decorateWindow(options)
}

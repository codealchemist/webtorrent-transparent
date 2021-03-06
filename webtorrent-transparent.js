const {writeFileSync} = require('fs')
const {resolve} = require('path')
const toElectronBackgroundColor = require('./utils/to-electron-background-color')

/**
 * WebTorrent plugin to easily set window transparency.
 */
module.exports = class WebTorrentTransparent {
  constructor () {
    this.configFile = resolve(__dirname, 'webtorrent-transparent.json')
    this.win = {}
    this.config = require(this.configFile)
  }

  saveConfig () {
    writeFileSync(this.configFile, JSON.stringify(this.config))
  }

  setTransparency (value = 0.9) {
    this.config.opacity = value

    // multiple windows
    if (Array.isArray(this.win)) {
      this.win.map((currentWin) => applyContentTransparency(currentWin))
      return
    }

    // single window
    applyContentTransparency(this.win)

    function applyContentTransparency (win) {
      win.webContents.executeJavaScript(`
        document.querySelector('html').style.backgroundColor = 'transparent';
        document.querySelector('body').style.backgroundColor = 'transparent';
        document.querySelector('#body').style.opacity = '${value}';
        document.querySelector('.content').style.marginTop = '0';
        document.querySelector('.content').style.paddingTop = '37px';
      `)
    }
  }

  setWindow (win) {
    this.win = win
    this.setTransparency(this.config.opacity)
  }

  setApp (app) {
    this.app = app
  }

  decorateMenu (menu) {
    const separator = {type: 'separator'}
    const transparencyMenu = {
      label: 'Transparency',
      submenu: [
        {
          label: 'Off',
          click: () => {
            this.setTransparency(1)
            this.saveConfig()
          }
        },
        {
          label: 'Min',
          click: () => {
            this.setTransparency(0.9)
            this.saveConfig()
          }
        },
        {
          label: 'Normal',
          click: () => {
            this.setTransparency(0.7)
            this.saveConfig()
          }
        },
        {
          label: 'Mid',
          click: () => {
            this.setTransparency(0.5)
            this.saveConfig()
          }
        },
        {
          label: 'Max',
          click: () => {
            this.setTransparency(0.2)
            this.saveConfig()
          }
        }
      ]
    }

    // add transparency menu inside View menu
    menu.map((menuItem) => {
      if (menuItem.label === 'View') {
        menuItem.submenu.push(separator)
        menuItem.submenu.push(transparencyMenu)
      }
    })

    return menu
  }

  decorateConfig (appConfig) {
    return Object.assign({}, appConfig, this.config)
  }

  decorateWindow (options) {
    const color = toElectronBackgroundColor(this.config.backgroundColor)
    return Object.assign({}, options, {
      backgroundColor: color,
      transparent: true
    })
  }
}

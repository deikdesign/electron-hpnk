require('update-electron-app')({
  logger: require('electron-log')
})
const Company =  require('./config/Company')

const path = require('path')
const glob = require('glob')
const {app, BrowserWindow} = require('electron')

const debug = /--debug/.test(process.argv[2])

const db = require("./config/db.js");
console.log("Here my " + db)

if (process.mas) app.setName('Pharmacie HPNK')

let mainWindow = null

function initialize () {
  makeSingleInstance()

  loadDemos()

  init_db()

  function createWindow () {
    const windowOptions = {
      width: 1300,
      minWidth: 900,
      height: 640,
      title: app.getName(),
      webPreferences: {
        nodeIntegration: true
      }
    }

    if (process.platform === 'linux') {
      windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
    }

    mainWindow = new BrowserWindow(windowOptions)
    mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))

    // Launch fullscreen with DevTools open, usage: npm run debug
    if (debug) {
      mainWindow.webContents.openDevTools()
      mainWindow.maximize()
      require('devtron').install()
    }

    mainWindow.on('closed', () => {
      mainWindow = null
    })
  }

  app.on('ready', () => {
    createWindow()
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    if (mainWindow === null) {
      createWindow()
    }
  })
}

// Make this app a single instance app.
//
// The main window will be restored and focused instead of a second window
// opened when a person attempts to launch a second instance.
//
// Returns true if the current version of the app should quit instead of
// launching.
function makeSingleInstance () {
  if (process.mas) return

  app.requestSingleInstanceLock()

  // app.on('second-instance', () => {
  //   if (mainWindow) {
  //     if (mainWindow.isMinimized()) mainWindow.restore()
  //     mainWindow.focus()
  //   }
  // })
}

// Require each JS file in the main-process dir
function loadDemos () {
  return
  // const files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
  // files.forEach((file) => { require(file) })
}
function init_db(){
//  let test = new Company("GuyL")

//   console.log("Nom = "+ test.name)
//   console.log(Company)
  return
}

initialize()

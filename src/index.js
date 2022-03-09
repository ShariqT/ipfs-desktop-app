const { app, BrowserWindow } = require('electron');
const path = require('path');
const filters = require('libp2p-websockets/src/filters')
const Websockets = require('libp2p-websockets')
const IPFS = require('ipfs')
const transportKey = Websockets.prototype[Symbol.toStringTag]


const ipfsConfig = {
  repo: 'ipfs-twitter-' + Math.random(),
  EXPERIMENTAL: {pubsub: true},
  config: {
      Addresses: {
          Swarm: ["/ip4/0.0.0.0/tcp/4012", "/ip4/127.0.0.1/tcp/4013/ws"],
          API: "/ip4/127.0.0.1/tcp/5012",
          Gateway: "/ip4/127.0.0.1/tcp/9191",
          RPC: "/ip4/127.0.0.1/tcp/4839",
      },
      Bootstrap: [
              '/dns4/localhost/tcp/4003/ws/p2p/12D3KooWPu5YhJrxQrVzDbbSUdpb8cFXCFaim4chaPPh91ATuuyT'                        
      ]
  },
  libp2p: {
      config: {
          transport: {
          // This is added for local demo!
          // In a production environment the default filter should be used
          // where only DNS + WSS addresses will be dialed by websockets in the browser.
          [transportKey]: {
                  filter: filters.all
              }
          }
      }
  }
}


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = async () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));
  
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async function(){
  createWindow()
  try{
    let ipfsNode = await IPFS.create(ipfsConfig)
    console.log(ipfsNode)
  
  } catch(err) {
    console.error(err)
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

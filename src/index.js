const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const Ctl = require('ipfsd-ctl')
const ipfsConfig = require('./ipfs_server')
// const filters = require('libp2p-websockets/src/filters')
// const Websockets = require('libp2p-websockets')
// const IPFS = require('ipfs')
// const transportKey = Websockets.prototype[Symbol.toStringTag]

// const ipfsConfig = {
//   repo: 'ipfs-twitter-' + Math.random(),
//   EXPERIMENTAL: {pubsub: true},
//   config: {
//       Addresses: {
//           Swarm: ["/ip4/0.0.0.0/tcp/42012", "/ip4/0.0.0.0/tcp/42013"],
//           API: "/ip4/0.0.0.0/tcp/51012",
          
//       },
//       Bootstrap: [
//               '/dns4/localhost/tcp/4002/p2p/12D3KooWPu5YhJrxQrVzDbbSUdpb8cFXCFaim4chaPPh91ATuuyT'                        
//       ]
//   },
//   libp2p: {
//       config: {
//           transport: {
//           // This is added for local demo!
//           // In a production environment the default filter should be used
//           // where only DNS + WSS addresses will be dialed by websockets in the browser.
//           [transportKey]: {
//                   filter: filters.all
//               }
//           }
//       }
//   }
// }


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
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
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

});

ipcMain.on('start', async function({ sender }){
  try{
  const ipfsServer = await Ctl.createServer({
    host: '127.0.0.1'
  },{
    type: 'go',
    disposable: true,
    ipfsHttpModule: require('ipfs-http-client'),
    ipfsBin: require('go-ipfs').path()
  })
  await ipfsServer.start()
  
  sender.send('start2')
} catch(err){
  console.log(err)
}
})



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


const channel = new MessageChannel()

renderQueue = channel.port1
mainQueue = channel.port2

ipcRenderer.postMessage('port', null, [mainQueue])

const Ctl = require('ipfsd-ctl')
const $ = require('jquery')
const { ipcRenderer } = require('electron')
const ipfsConfig = require("./ipfs_server")
ipcRenderer.send('start')
ipcRenderer.on('start2', async function(evt){
    console.log(evt)
    // console.log(data)
    const ipfsd = await Ctl.createController({
        ipfsHttpModule: require('ipfs-http-client'),
        type: 'go',
        args: '--enable-pubsub-experiment',
        ipfsOptions: ipfsConfig

      })

    console.log(await ipfsd.api.id())
    await ipfsd.api.pubsub.subscribe('com.lob.www:dtwitter-poc', function(msg){
        console.log(msg)

        $('.messages').append(`<div>${msg.data}</div>`)
    })
    let peers = await ipfsd.api.pubsub.peers()
    console.log(peers)
    peers = await ipfsd.api.swarm.peers()
    console.log(peers)
    $(function(){
        console.log($)
        $('form').on('submit', function(evt){
            evt.preventDefault();
            let m = $('textarea[name=msg]').val();
            console.log(m)
            ipfsd.api.pubsub.publish('com.lob.www:dtwitter-poc', m)
        })
        $('.peers').on('click', async function(){
            let peers = await ipfsd.api.swarm.peers()
            console.log(peers)
        })
    })

})
console.log(window)
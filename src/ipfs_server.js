const filters = require('libp2p-websockets/src/filters')
const Websockets = require('libp2p-websockets')
const transportKey = Websockets.prototype[Symbol.toStringTag]
const WebRTCStar = require('libp2p-webrtc-star')
const wrtc = require('electron-webrtc')

module.exports = {
  repo: 'ipfs-twitter-' + Math.random(),
  EXPERIMENTAL: {pubsub: true},
  relay: { enabled: true, hop: { enabled: true } },

  config: {
      Addresses: {
          Swarm: [
            // '/dns4/pure-sierra-28952.herokuapp.com/tcp/443/wss/p2p-webrtc-star',
            '/ip4/0.0.0.0/tcp/4003/ws'

        ]
    },
      Bootstrap: [
        '/dns4/localhost/tcp/4012/ws/p2p/12D3KooWPu5YhJrxQrVzDbbSUdpb8cFXCFaim4chaPPh91ATuuyT',

//             //   '/dns4/localhost/tcp/4003/ws/p2p/12D3KooWPu5YhJrxQrVzDbbSUdpb8cFXCFaim4chaPPh91ATuuyT',
//     //           '/dns4/localhost/tcp/4015/ws/p2p/12D3KooWS4dMM3QRHs8kuTfqgji9zWyTAwvPRfsoxMbsfzn5A6B6'
//     //         //   '/dns4/wrtc-star1.par.dwebops.pub/tcp/443/wss/p2p-webrtc-star',
//     //     //   '/dns4/wrtc-star2.sjc.dwebops.pub/tcp/443/wss/p2p-webrtc-star'                  
      ]
  },
  libp2p: {
    modules: {
        transport: [WebRTCStar, Websockets]
      },
      config: {
        peerDiscovery: {
            WebRTCStar: {
                enabled: true
            }
        },
        transport: {
            WebRTCStar: {
               wrtc
            }
        }
      }
  }
}

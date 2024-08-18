import { Notification } from 'element-ui'
// import { getToken } from './auth';
// import Cookies from 'js-cookie'
import store from '@/store';
//var url =  'wss://' + location.host + '/websocket/'
//两种连接地址ws和wss，正式上线申请证书后使用域名作为连接地址
//利用userAgent判断浏览器使用不同连接协议
var urls = "wss://xxx.xxxx.xxx:1443/websocket/";
var url = "ws://xxx.xxxx.xxx:1000/websocket/";
var ws;
var tt;
var lockReconnect = false;//避免重复连接
let clientSId = 123;//getToken()//localStorage.getItem("tokenId")//缓存中取出客户端id
let count = 0;
let wsMsg = "";
// const getDefaultState = () => {
//   return {
//     notifyStatus:''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   SET_NOTIFY: (state,notifyStatus) =>{
//     state.notifyStatus=notifyStatus
//   }
// }
//连接失败3次后会自动跳转到登录页面
const websocket = {
  Init: function (clientId) {
    //this.clientId = localStorage.getItem("tokenId")
    if ("WebSocket" in window) {
      const explorer = window.navigator.userAgent
      if (explorer.indexOf("MSIE") >= 0) {
        // console.log("IE")  //判断是否为IE浏览器
        ws = new WebSocket(url + clientId);
      } else if (explorer.indexOf("Firefox") >= 0) {
        // console.log("Firefox")  //是否为Firefox浏览器
        ws = new WebSocket(url + clientId);
      } else if (explorer.indexOf("Chrome") >= 0) {
        // console.log("Chrome")  //是否为Chrome浏览器
        ws = new WebSocket(urls + clientId);
      } else if (explorer.indexOf("Opera") >= 0) {
        // console.log("Opera")   //是否为Opera浏览器
        ws = new WebSocket(url + clientId);
      } else if (explorer.indexOf("Safari") >= 0) {
        // console.log("Safari")  //是否为Safari浏览器
        ws = new WebSocket(urls + clientId);
      } else {
        ws = new WebSocket(url + clientId);
      }
    }
    // else if ("MozWebSocket" in window) {
    //   ws = new MozWebSocket(url + clientId);
    // } 
    else {
      console.log("您的浏览器不支持 WebSocket!");
      return;
    }
    if (typeof WebSocket == "undefined") {
      this.$notify({
        title: "提示",
        message: "当前浏览器无法接收实时报警信息，请使用谷歌浏览器！",
        type: "warning",
        duration: 0,
      });
    }
    ws.onmessage = function (e) {
      //console.log("接受信息；", e.type)
      wsMsg = e.data
      messageHandle(e.data)
      heartCheck.start()
    }

    ws.onclose = function () {
      console.log("当前连接已关闭,还有 %d 个连接", count)
      // localStorage.clear()
      //console.log(count)
      // if (count > 0) {//count <= 3 && 
      //   reconnect(store.getters.userId);
      // } else {
      //   Notification({
      //     title: '错误',
      //     message: '连接已关闭',
      //     type: 'error',
      //   });
      //   // window.location.reload();
      // }
    }

    ws.onopen = function (e) {
      console.log("连接成功，发送消息：", e.type)
      //messageHandle("ok")
    }

    ws.onerror = function (e) {
      console.log("数据传输发生错误,后台服务关闭");
      if (count > 0) {
        reconnect(store.getters.userId);
      } else {
        Notification({
          title: '错误',
          message: '数据传输发生错误,服务关闭或网络不通!',
          type: 'error',
        });
        //localStorage.clear()
        // window.location.reload();
      }
      //let message = {"error": "错误"};
      //messageHandle(JSON.stringify(message))
    }
  },
  CloseWebscoket: function () {
    if (ws != null || ws != undefined) {
      ws.close();
      ws = null;
    }
  },
  GetMessage: wsMsg,
  Send: function (sender, reception, body, flag) {
    let data = {
      sender: sender,
      reception: reception,
      body: body,
      flag: flag
    }
    let msg = JSON.stringify(data)
    ws.send(msg)
  },
  getWebSocket() {
    return ws;
  },
  getStatus() {
    if (ws.readyState == 0) {
      return "未连接";
    } else if (ws.readyState == 1) {
      return "已连接";
    } else if (ws.readyState == 2) {
      return "连接正在关闭";
    } else if (ws.readyState == 3) {
      return "连接已关闭";
    }
  }
}

export default websocket
// export default {
//   //namespaced: true,
//   websocket,
//   //state,
//   //mutations,
//   //actions
// }
//根据消息标识做不同的处理
function messageHandle(message) {
  //console.log("msg", message)
  //console.log("连接失败:"+count)
  let obj = JSON.parse(message);
  console.log("obj", obj)
  switch (obj.type) {
    case 'error':
      //关闭连接跳转登录
      ws.close();
      break;
    case undefined:
      //连接失败
      count = 0;
      break;
    case 'heartBeat':
      //心跳消息成功heartBeat
      break;
    case 'success':
      //接受普通消息
      break;
    case 'onlineUser':
      //在线用户
      // if (message.match("onlineCount:")) {
      //   var count = message.split(":");
      //   // localStorage.setItem("onlineUserCount",count[1]);
      //   //Cookies.set("onlineUserCount",count[1])
      // }
      break;
    case 'online':
      //上线
      count++;
      break;
    case 'offline':
      //下线
      count--;
      break;
    default:
      //let msg = JSON.parse(message)
      //list通知其他用户现在在线的人的id,存储到onlineUser
      // localStorage.setItem("notifyCount",message)
      //Cookies.set("notifyCount",message)
      // 自定义全局监听事件
      window.dispatchEvent(new CustomEvent('onmessageWS', {
        detail: obj
      }))
    // Notification({
    //   title: '消息通知',
    //   message: message,
    //   type: "success",
    //   position: "bottom-right",
    // });
    // 重置心跳
    //heartCheck.start();
  }
}

function reconnect(sockid) {
  if (lockReconnect) {
    return;
  };
  lockReconnect = true;
  //没连接上会一直重连，设置延迟避免请求过多
  tt && clearTimeout(tt);
  tt = setTimeout(function () {
    console.log("执行断线重连...")
    websocket.Init(sockid);
    lockReconnect = false;
  }, 10000);
}

//心跳检测
var heartCheck = {
  timeout: 1000 * 10 * 3, //3 = 30s
  timeoutObj: null,
  serverTimeoutObj: null,
  start: function () {
    var self = this;
    this.timeoutObj && clearTimeout(this.timeoutObj);
    this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
    this.timeoutObj = setTimeout(function () {
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      console.log('心跳检测...');
      //ws.send("heartBeat:"+ clientSId );
      // 这里发送一个心跳，后端收到后，返回一个心跳消息，
      if (ws && ws.readyState == 1) { // 如果连接正常
        let actions = { "type": "heartBeat", "message": "heatBeat", "fromUser": store.getters.userId, "toUser": store.getters.userId };
        ws.send(JSON.stringify(actions));
      } else { // 否则重连
        reconnect(store.getters.userId);
      }
      self.serverTimeoutObj = setTimeout(function () {
        if (ws.readyState !== 1) {
          ws.close();
        }
      }, self.timeout);

    }, self.timeout)
  }
}
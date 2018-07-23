import config from '../api/config'
var socketUrl = {
    url01: config.websocketConfig.socketUrl
}
console.log(parseInt(window.scrollHeight))
var Communicator = {
    'protocol': {
        'socketRequestType': {//socket请求类型
            REGISTER: "100000",
            BIND_USER: "500001",
            JOIN_ROOM: "300001",
            OUT_ROOM: "300002",
            HEART_BEAT: "300037"
        },
        'socketBackType': {//socket返回请求类型
            BIND_USER: "500001",
            UNBIND_USER: "500002",
            //自己进入房间
            USER_SELF_JOIN_ROOM: "300000",
            //进入房间
            USER_JOIN_ROOM: "300001",
            //				//离开房间
            //				USER_OUT_ROOM :"300002",
            //开始直播
            ROOM_LIVE_START: "300003",
            //结束直播
            ROOM_LIVE_CLOSE: "300004",
            //后台结束直播
            ROOM_LIVE_ADMIN_CLOSE: "300005",
            //聊天
            CHAT: "300006",
            //指定用户聊天
            TO_USER_CHAT: "300007",
            //礼物
            GIFT: "300008",
            //粉丝礼物
            FANS_GIFT: "300009",
            //禁言
            MUTE: "300010",
            // 取消禁言
            UNMUTE: "300011",
            //后台禁言
            ADMIN_MUTE: "300012",
            //后台取消禁言
            ADMIN_UNMUTE: "300013",
            //踢人
            KICK: "300014",
            //后台踢人
            ADMIN_KICK: "300015",
            //房间管理员
            ADMIN: "300016",
            //取消房间管理员
            UNADMIN: "300017",
            //分享
            ROOM_SHARE: "300018",
            //话题
            ROOM_TOPIC: "300019",
            //公告
            ROOM_NOTICE: "300020",
            //系统消息
            SYSTEM: "300021",
            //挂起
            HANG: "300022",
            //取消挂起
            UNHANG: "300023",
            //关注
            FAVORITE: "300024",
            //取消关注
            UNFAVORITE: "300025",
            //FPS
            FPS: "300026",
            //点亮
            LIGHTEN: "300027",
            //粉丝等级
            USER_FANS_LEVEL: "300028",
            //开启连麦
            CONNECTION_LIVE_START: "300029",
            //关闭连麦
            CONNECTION_LIVE_CLOST: "300030",
            //申请连麦
            CONNECTION_LIVE_APPLY: "300031",
            //选择连麦
            CONNECTION_LIVE_SELECT: "300032",
            //拒绝连麦
            CONNECTION_LIVE_REFUSE: "300033",
            //接受连麦
            CONNECTION_LIVE_ACCEPT: "300034",
            //取消连麦
            CONNECTION_LIVE_CANNEL: "300035",
            //结束连麦
            CONNECTION_LIVE_END: "300036",
            //保持直播
            KEEP_LIVE: "300037",
            //通知主播 用户送了脸萌礼物
            SEND_MYOTEE_GIFT_NOTIFY_HOST: "300038",
            //通知全房间脸萌礼物播放成功
            NOTIFY_ROOM_MYOTEE_GIFT_OK: "300039",
            //通知用户脸萌礼物失败退款
            RETREAT_MYOTEE_GIFT_TO_USER: "300040",
            //活动 跑马灯消息
            ACTIVITY_HORSE_RACE_LAMP_TO_ROOM: "300041",
            //活动 礼物雨 抢到礼物发送消息
            ACTIVITY_ROB_GIFT_TO_ROOM: "300042",
            //活动 礼物雨 通知系统礼物雨开始了
            ACTIVITY_NOTIFY_STS_GIFT_TO_ROOM: "300043",
            //活动 礼物雨 通知用户礼物雨开始了
            ACTIVITY_NOTIFY_USER_GIFT_TO_ROOM: "300044",
            //活动 模板活动 更新主播排行
            ACTIVITY_TEMP_NOTIFY_RANK_TO_ROOM: "300045",
            //开宝箱
            OPEN_BOX: "300046",
            //房间更新昵称
            ROOM_USER_NICK_NAME: "300051",
            //房间更新用户头像信息
            ROOM_USER_HEAD_PIC: "300052",
            //房间更新用户vip信息
            ROOM_USER_VIP: "300053",
            //房间更新用户徽章信息
            ROOM_USER_BADGE: "300054",
            //房间更新用户状态信息
            ROOM_USER_STATE: "300055",
            //房间更新房间任务
            ROOM_TASK: "300056",
            //徽章变动
            UPDATE_USER_BADGE: "500003",
            //金币变动
            UPDATE_USER_BALANCE: "500004",
            //头像修改
            UPDATE_USER_HEAD_PIC: "500005",
            //昵称修改
            UPDATE_USER_NICK_NAME: "500006",
            //vip修改
            UPDATE_USER_VIP: "500007",
            //用户任务
            UPDATE_USER_TASK: "500008",
            //主播任务
            UPDATE_USER_HOST_TASK: "500009",
            //主播星星
            UPDATE_USER_HOST_STAR: "500010",
            //用户背包
            UPDATE_USER_SPECIAL: "500011",
            //取消踢人
            UPDATE_USER_ROOM_UNKICK: "500012",
            //开始直播
            ROOM_STATE_LIVE: "200001",
            //结束直播
            ROOM_STATE_NOLIVE: "200002",
            //添加房间
            ROOM_ADD: "200003",
            //删除房间
            ROOM_REMOVE: "200004",
            BIND_APP_NEWS: "600001",
            BIND_APP_TEMPLATE: "600002",
            STATIC_RESOURCE_UPDATE: "600003"
        }
    },
    'init': function (container, msg, rte) {
        this.socket_message = msg;
        this.roomId = container;

        this.rte_ROOMtype = rte;
        //this.compose();
        this.enumUtil();
        this.chatUtil();
        this.register_notify(this.protocol.socketBackType.USER_SELF_JOIN_ROOM, 1, function (json) { });
        //建立socket链接
        this.connect_server(socketUrl.url01);

    },


    'enumUtil': function () {
        this.CONST_MAGIC = 0x1DB14430;
        this.Flag = { NEED_ACK: 1 };
        this.Type = {
            ALL_MESSAGE_TYPE: (15 << 6),
            NO_MESSAGE_TYPE: ~(15 << 6),
            REQUEST: 1 << 6,
            RESPONSE: (2 << 6),
            KEEP_ALIVE: (3 << 6),
            ACK: (4 << 6),
            REGISTER: (5 << 6),
            NOTIFY: (6 << 6)
        }
        this.Version = {
            ALL_VERSION: (15 << 10),
            VERSION_NONE: 0,
            VERSION_1: (1 << 10)
        }
        this.Compress = {
            ALL_COMPRESS: 3 << 4,
            COMPRESS_NONE: 0,
            GZIP_COMPRESS: 1 << 4
        }
    },

    'read_int': function (src, offset) {
        var data = src.slice(offset, offset + 4);
        var buffer = new Uint8Array(data);
        return ((buffer[3] & 0xFF) | ((buffer[2] & 0xFF) << 8) | ((buffer[1] & 0xFF) << 16) | ((buffer[0] & 0xFF) << 24));
    },
    'write_int': function (buffer, offset, value) {
        buffer[offset] = (value >>> 24) & 0xFF;
        buffer[offset + 1] = (value >>> 16) & 0xFF;
        buffer[offset + 2] = (value >>> 8) & 0xFF;
        buffer[offset + 3] = (value >>> 0) & 0xFF;
    },
    'read_short': function (src, offset) {
        var data = src.slice(offset, offset + 2);
        var buffer = new Uint8Array(data);
        return (buffer[1] & 0xff) | (buffer[0] & 0xff) << 8;
    },
    'write_short': function (buffer, offset, value) {
        buffer[offset] = (value >> 8) & 0xFF;
        buffer[offset + 1] = (value >> 0) & 0xFF;
    },
    'read_long': function (src, offset) {
        var high = this.read_int(src, offset);
        var low = this.read_int(src, offset + 4);
        return (high << 16) * (2 << 15) + low;
    },
    'write_long': function (buffer, offset, value) {
        var high = parseInt(value / ((1 << 16) * (2 << 15)));
        var low = value & 0xFFFFFFFF;
        this.write_int(buffer, offset, high);
        this.write_int(buffer, offset + 4, low);
    },
    'chatUtil': function () {
        var _this = this;
        //console.log(_this.rte_ROOMtype);
        _this.ws = null;
        _this.send_sequence = 1;
        _this.request_handler = {};
        _this.notify_handler = {};
        _this.connected = false;
        _this.option = {
            "info": {
                "ms": {},
                "rt": 1
            },
            "mid": _this.protocol.socketRequestType.REGISTER,
            "tkn": "0"
        };
    },
    "bind_notify": function (code, version, callback) {
        this.option["info"]["ms"][code] = version;
        if (callback) {
            this.notify_handler[code] = callback;
        }
    },
    "bind_all_notify": function () {

    },
    "register_notify": function (cmd, version, handler) {
        var _this = this;
        var objs = {
            "CommandId": cmd,
            "Version": version,
            "Handler": handler
        };
        var list = _this.notify_handler[cmd];
        if (list == null || list == undefined) {
            list = new Array();
            _this.notify_handler[cmd] = list;
        }
        list.push(objs);
    },
    "writeUTF": function (str, isGetBytes) {
        //转码utf码
        var back = [];
        var byteSize = 0;
        for (var i = 0; i < str.length; i++) {
            var code = str.charCodeAt(i);
            if (0x00 <= code && code <= 0x7f) {
                byteSize += 1;
                back.push(code);
            } else if (0x80 <= code && code <= 0x7ff) {
                byteSize += 2;
                back.push((192 | (31 & (code >> 6))));
                back.push((128 | (63 & code)))
            } else if ((0x800 <= code && code <= 0xd7ff)
                || (0xe000 <= code && code <= 0xffff)) {
                byteSize += 3;
                back.push((224 | (15 & (code >> 12))));
                back.push((128 | (63 & (code >> 6))));
                back.push((128 | (63 & code)))
            }
        }
        for (i = 0; i < back.length; i++) {
            back[i] &= 0xff;
        }
        if (isGetBytes) {
            return back
        }
        if (byteSize <= 0xff) {
            return [0, byteSize].concat(back);
        } else {
            return [byteSize >> 8, byteSize & 0xff].concat(back);
        }

    },

    "uintToString": function (uintArray) {
        //解码arraybuffer编码；
        var encodedString = String.fromCharCode.apply(null, uintArray),
            decodedString = decodeURIComponent(escape(encodedString));
        return decodedString;
    },
    "on_websocket_data": function (event) {


        var _this = this;
        if (event.data.byteLength < 22) {
            return;
        }
        var body = null;
        var code = null;
        var read_offset = 0;
        var magic = _this.read_int(event.data, read_offset);
        if (magic != _this.CONST_MAGIC) {
            return;
        }
        read_offset += 4;
        var sequence = _this.read_int(event.data, read_offset);
        read_offset += 4;
        var timestamp = _this.read_long(event.data, read_offset);
        read_offset += 8;
        //console.log(event.data)
        var flag = _this.read_short(event.data, read_offset);
        read_offset += 2;
        if ((flag & _this.Flag.NEED_ACK) == _this.Flag.NEED_ACK) {
            var ack_flag = flag;
            ack_flag &= _this.Type.NO_MESSAGE_TYPE;
            ack_flag &= ~_this.Version.ALL_VERSION;
            ack_flag &= ~_this.Compress.ALL_COMPRESS;
            ack_flag &= ~_this.Flag.NEED_ACK;
            ack_flag |= _this.Version.VERSION_1;
            ack_flag |= _this.Type.ACK;
            var send_buffer = new Int8Array(22);
            _this.write_int(send_buffer, 0, magic);
            _this.write_int(send_buffer, 4, sequence);
            _this.write_long(send_buffer, 8, new Date().getTime());
            _this.write_short(send_buffer, 16, ack_flag);
            _this.write_int(send_buffer, 18, 0);
            _this.send_binary(send_buffer);
        }
        if ((flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.ACK || (flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.KEEP_ALIVE) {
            return;
        }
        if ((flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.RESPONSE) {
            code = _this.read_int(event.data, read_offset);
            read_offset += 4;
        }
        var length = _this.read_int(event.data, read_offset);
        read_offset += 4;
        if (length > 0) {
            var body_buffer = new Uint8Array(event.data.slice(read_offset, read_offset + length))
            //var body_buffer=new Int8Array();

            body = this.uintToString(body_buffer)
        }

        //alert(JSON.stringify(JSON.parse(body)))
        if ((flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.NOTIFY) {
            //socket推送的信息
            var socketData = JSON.parse(body);
            _this.socket_message(socketData);

            if (socketData && socketData.mid && this.notify_handler[socketData.mid]) {
                this.notify_handler[socketData.mid].forEach(function (value, idx) {
                    var func = value.Handler;
                    if (func) {
                        func(socketData.info);
                    }
                });
            }
        } else if ((flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.RESPONSE) {
            var handler = this.request_handler[sequence];
            if (handler != null) {
                handler(code, body);
                delete this.request_handler[sequence];
            }
        } else if ((flag & _this.Type.ALL_MESSAGE_TYPE) == _this.Type.ACK) {

        }
    },
    //建立socket链接
    'connect_server': function (url) {
        var _this = this;
        if (_this.connected) {
            _this.ws.close();

            _this.connected = false;
            return;
        }
        if (!window.WebSocket) {
            window.WebSocket = window.MozWebSocket;
        }
        if (window.WebSocket) {
            _this.ws = new WebSocket(url);
            _this.ws.binaryType = 'arraybuffer';
            _this.ws.onmessage = function (event) {
                _this.on_websocket_data(event);
            };
            _this.ws.onopen = function (event) {
                console.log("socket onopen---")
                _this.connected = true;
                _this.send_handshake();
            };
            _this.ws.onclose = function (event) {
                console.log("socket 断开---")
                // _this.connected = false;
                // _this.connect_server(socketUrl.url01);
            };
        }

    },

    'send_handshake': function () {
        var flag = 0;
        var _this = this;
        flag |= _this.Version.VERSION_1;
        flag |= _this.Type.REGISTER;
        flag |= _this.Compress.NO_COMPRESS;
        this.request_handler[_this.send_sequence] = function (code, data) { _this.send_handshake_callback(code, data); };
        var send_buffer = new Int8Array(22);
        _this.write_int(send_buffer, 0, _this.CONST_MAGIC);
        _this.write_int(send_buffer, 4, _this.send_sequence++);
        _this.write_long(send_buffer, 8, new Date().getTime());
        _this.write_short(send_buffer, 16, flag);
        _this.write_int(send_buffer, 18, 0);
        _this.send_binary(send_buffer);

    },
    //请求建立socket链接的回调
    'send_handshake_callback': function (code, data) {
        var _this = this;
        //console.log("SEND Connect RESULT:"+code);
        if (code == 0) {
            _this.send_handshake_successCallback();
        } else {
            _this.send_handshake_errorCallback();
        }
    },
    //socket链接建立成功，进入房间，如果用户登录则绑定用户
    'send_handshake_successCallback': function () {
        //进入房间
        this.join_room(this.roomId);
        //用户登录，绑定用户
        //			if(this.loginKey){
        //				this.bind_login_user(this.loginKey);
        //			}
        //
    },
    //socket建立链接失败，再重新建立链接
    'send_handshake_errorCallback': function () {
        this.connect_server(socketUrl.url01);
    },
    //socket绑定已登录的用户
    'bind_login_user': function (loginKey) {
        var _this = this;
        var json = { "mid": _this.protocol.socketRequestType.BIND_USER, "info": { "lk": loginKey } };
        this.send_message(json, function (code, data) { _this.bind_login_user_callback(code, data); });
    },
    //绑定用户的回调
    'bind_login_user_callback': function (code, data) {
        //console.log("SEND BIND RESULT:"+code+",data:"+data);
    },
    //用户进入房间
    'join_room': function (roomId) {
        var _this = this;
        var json = {
            "mid": _this.protocol.socketRequestType.JOIN_ROOM,
            "info":
            {
                "rid": roomId,
                "rte": _this.rte_ROOMtype

            },

        };
        this.send_message(
            json,
            function (code, data) {
                _this.join_room_callback(code, data);
            }
        );
    },
    "join_room_callback": function (code, data) {
    },
    //直播心跳请求
    'keep_heart_beating': function (roomId) {
        var _this = this;
        var json = {
            "mid": _this.protocol.socketRequestType.HEART_BEAT,
            "info":
            {
                "rid": roomId,
                "rte": _this.rte_ROOMtype
            },
        };
        this.send_message(
            json,
            function (code, data) {
                _this.keep_heart_beating_callback(code, data);
            }
        );
    },
    "keep_heart_beating_callback": function (code, data) {
        console.log(code)
    },
    //用户离开房间
    'out_room': function (roomId) {
        var _this = this;
        var json = {
            "mid": _this.protocol.socketRequestType.OUT_ROOM,
            "info": {
                "rid": roomId,
                "rte": _this.rte_ROOMtype
            }
        };
        this.send_message(
            json,
            function (code, data) {
                _this.out_room_callback(code, data);
            }
        );
    },
    'out_room_callback': function (code, data) {
        //console.log("SEND OUT ROOM RESULT:"+code+",data:"+data);
    },
    'send_message': function (message, callback) {
        var _this = this;
        message = JSON.stringify(message);
        this.request_handler[this.send_sequence] = callback;
        var msg_buffer = this.writeUTF(message, true);
        var flag = 0;
        flag |= _this.Version.VERSION_1;
        flag |= _this.Type.REQUEST;
        flag |= _this.Compress.NO_COMPRESS;
        var send_buffer = new Int8Array(22 + msg_buffer.length);
        _this.write_int(send_buffer, 0, _this.CONST_MAGIC);
        _this.write_int(send_buffer, 4, this.send_sequence++);
        _this.write_long(send_buffer, 8, new Date().getTime());
        _this.write_short(send_buffer, 16, flag);
        _this.write_int(send_buffer, 18, msg_buffer.length);
        if (msg_buffer && msg_buffer.length > 0) {
            var offset = 22;;
            for (var i = 0; i < msg_buffer.length; i++) {
                send_buffer[offset + i] = msg_buffer[i];
            }
        }
        this.send_binary(send_buffer);
    },
    'send_binary': function (send_buffer) {
        var _this = this;
        if (!window.WebSocket) {
            return;
        }
        // console.log(this.ws)
        if (this.ws.readyState == WebSocket.OPEN) {
            this.ws.send(send_buffer);
        } else {
            console.log("The socket is not open.");
        }
    },
    //保持心跳(主播、开播)
    'keepHeartBeating': function () {
        var _this = this;
        // var roomId = DATASOURCE['room']['roomId'];
        this.heartRate = setInterval(function () {
            _this.keep_heart_beating(this.roomId);
        }, 5000)
    },

    "closeWebSocket": function () {
        console.log("socket销毁")
        this.ws.close();
        this.closeHeartBeatiing();
    },
    //关闭心跳
    'closeHeartBeatiing': function () {
        clearInterval(this.heartRate);
    }
}

export default Communicator;

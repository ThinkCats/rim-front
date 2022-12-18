import { action, computed, makeObservable, observable } from "mobx"
import cookie from "react-cookies"
import instance from "./api"
import { stringToDate, uuidv4 } from "./utils"
import ws from "./ws"

class LoginStore {
    loginOk = false;
    loginInfo = {};
    registerInfo = {};
    mode = 0;

    constructor() {
        makeObservable(this, {
            loginOk: observable,
            loginInfo: observable,
            registerInfo: observable,
            mode: observable,

            register: action,
            login: action,
            updateLoginInfo: action,
            updateRegistInfo: action,
            toggleMode: action,
        })

        this.checkLogin();
    }

    checkLogin() {
        if (this.loginOk) {
            let token = cookie.load("token");
            instance.get("/user/token?token=" + token).then(response => {
                let user_data = response.data;
                if (user_data.code === 200) {
                    this.loginOk = true;
                }
            });
        }
    }

    register() {
        //TODO register a account
        console.log("register:", this.registerInfo);
    }

    login() {
        instance.post("/user/login", loginStore.loginInfo).then(response => {
            console.log("login result:", response);
            let token = response.data.data;
            if (token.length > 0) {
                cookie.save("token", token);
                this.loginOk = true;
            }
        });
    }

    updateLoginInfo(type, content) {
        if (type === 'account') {
            this.loginInfo.account = content;
        }
        if (type === 'password') {
            this.loginInfo.password = content;
        }
    }

    updateRegistInfo(type, content) {
        if (type === 'account') {
            this.loginInfo.account = content;
        }
        if (type === 'password') {
            this.loginInfo.password = content;
        }
        if (type === 'account') {
            this.loginInfo.account = content;
        }
    }

    toggleMode(mode) {
        this.mode = mode;
    }
}

export const loginStore = new LoginStore();


class MessageStore {
    chatList = []
    messageList = []
    activeChat = {}
    groupUsers = []

    login = {}
    ws = {}

    inputMsg = ''

    constructor() {
        makeObservable(this, {
            chatList: observable,
            messageList: observable,
            login: observable,
            inputMsg: observable,
            groupUsers: observable,
            activeChat: observable,

            computedChatList: computed,
            computedMessageList: computed,

            fetchChatList: action,
            fetchMessageList: action,
            updateInputMsg: action,
            selectChat: action,
            newMessageArrive: action,
            sendWsMsg: action,
        })

        this.ws = ws;
    }

    get computedChatList() {
        let result = [];
        for (let data of this.chatList) {
            console.log('data:', data);
            let computed_chat = {
                id: data.msg.gid,
                uid: data.user.id,
                avatar: data.user.avatar,
                title: data.user.name,
                subtitle: data.msg.content,
                date: stringToDate(data.msg.createTime),
                unread: data.unread,
            }
            result.push(computed_chat);
        }
        return result;
    }

    get computedMessageList() {
        let result = [];
        if (Object.keys(this.activeChat).length === 0) {
            return result;
        }
        console.log("compute msg list:{}", this.messageList);
        for (let data of this.messageList) {
            let msg = {
                position: (data.msg.uid === this.login.uid) ? 'right' : 'left',
                type: data.msg.kind != null ? 'text' : 'todo',
                title: data.user.name,
                text: data.msg.content,
            }
            result.push(msg);
        }
        return result;
    }

    sendWsMsg(msg) {
        let body = {
            "event": "Msg",
            "body": {
                "kind": "Text",
                "content": msg,
                "uid": this.login.uid,
                "gid": this.activeChat.id,
                "clientMsgId": uuidv4()
            }
        };
        this.ws.send(JSON.stringify(body));
        //add compute msg
        console.log('to add compute')
        this.messageList.push({
            "msg": {
                uid: this.login.uid,
                kind: "Text",
                content: msg,
            },
            "user": {
                name: this.login.name,
            }
        });
    }

    updateInputMsg(data) {
        this.inputMsg = data;
    }

    selectChat(chat) {
        this.activeChat = chat;
        //fetch user info
        instance.get("/group/user/get?gid=" + chat.id).then(response => {
            console.log("set group user state:", response.data.data)
            this.groupUsers = response.data.data
        });
        instance.post("/message/group/read", {
            "gid": chat.id,
            "uid": this.login.uid,
        }).then(response => {
            if (response.data.data === true) {
                this.fetchChatList();
            }
        })
    }

    newMessageArrive(msg) {
        console.log("new msg arrived:", msg);
        let msgJson = JSON.parse(msg);
        if (msgJson.event === 'Msg') {
            console.log("push msg:", msgJson);
            let userName = '';
            for (const ele of this.groupUsers) {
                if (ele.user.id === msgJson.body.uid) {
                    userName = ele.user.name;
                }
            }
            this.messageList.push({
                "msg": {
                    uid: msgJson.body.uid,
                    kind: msgJson.body.kind,
                    content: msgJson.body.content,
                },
                "user": {
                    name: userName,
                }
            });
            //set unread
            let msgGid = msgJson.body.gid;
            let currentGid = this.activeChat.id;
            if (msgGid !== currentGid) {
                for (const chat of this.chatList) {
                    if (chat.msg.gid === msgGid) {
                        chat.unread = chat.unread + 1;
                    }
                }
            }
            //ack msg
            if (msgGid === currentGid) {
                let ackMsg = {
                    "event": "Read",
                    "body": {
                        "kind": "Text",
                        "content": "",
                        "uid": this.login.uid,
                        "gid": msgGid,
                        "clientMsgId": uuidv4(),
                        "msgId": msgJson.body.msgId,
                    }
                };
                this.ws.send(JSON.stringify(ackMsg));
                this.fetchChatList();
            }
        }
    }


    fetchMessageList(param) {
        instance.post('/message/history', param).then(response => {
            this.messageList = response.data.data
        })
    }

    fetchChatList() {
        instance.post('/message/chat/list', {
            "uid": this.login.uid,
            "page": 1,
            "size": 5
        }).then(response => {
            console.log("chat list result:", response);
            this.chatList = response.data.data;
        });
    }

    initLogin() {
        this.login = { uid: 2, name: "达必马", avatar: "xxxx" };
    }
}

const store = new MessageStore();

export default store;
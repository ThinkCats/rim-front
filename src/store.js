import { action, computed, makeObservable, observable } from "mobx"
import instance from "./api"
import { stringToDate } from "./utils"
import ws from "./ws"

class MessageStore {
    chatList = []
    messageList = []
    login = {}
    ws = {}

    constructor() {
        makeObservable(this, {
            chatList: observable,
            messageList: observable,
            login: observable,

            computedChatList: computed,
            computedMessageList: computed,

            fetchChatList: action,
            fetchMessageList: action,
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
                unread: 2,
            }
            result.push(computed_chat);
        }
        return result;
    }

    get computedMessageList() {
        let result = [];
        for(let data of this.messageList) {
            console.log('msg data:', data);
            let msg = { 
                position: (data.msg.uid === this.login.uid) ? 'right':'left',
                type: data.msg.kind != null ? 'text' : 'todo',
                title: data.user.name,
                text: data.msg.content,
            }
            result.push(msg);
        }
        return result;
    }

    sendWsMsg(msg) {
        this.ws.send(JSON.stringify(msg));
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
            "size": 10
        }).then(response => {
            console.log("chat list result:", response);
            this.chatList = response.data.data;
        });
    }

    initLogin() {
        this.login = {uid: 2, avatar: "xxxx"};
    }
}

export default MessageStore;
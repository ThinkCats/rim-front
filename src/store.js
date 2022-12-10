import { toHaveAccessibleDescription } from "@testing-library/jest-dom/dist/matchers"
import { action, computed, makeObservable, observable } from "mobx"
import instance from "./api"
import { stringToDate, uuidv4 } from "./utils"
import ws from "./ws"

class MessageStore {
    chatList = []
    messageList = []

    activeChat = {}

    login = {}
    ws = {}

    inputMsg = ''

    constructor() {
        makeObservable(this, {
            chatList: observable,
            messageList: observable,
            login: observable,
            inputMsg: observable,

            computedChatList: computed,
            computedMessageList: computed,

            fetchChatList: action,
            fetchMessageList: action,
            updateInputMsg: action,
            selectChat: action,
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
        this.login = {uid: 2, name: "达必马", avatar: "xxxx"};
    }
}

export default MessageStore;
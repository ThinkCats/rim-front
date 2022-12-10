import { action, computed, makeObservable, observable } from "mobx"
import instance from "./Client"



class MessageStore {
    chatList = []
    messageList = {}

    constructor() {
        makeObservable(this, {
            chatList: observable,
            messageList: observable,
            computedChatList: computed,
            computedMessageList: computed,
            init: action
        })
        this.init()
    }

    get computedChatList() {
        let result = [];
        for(let data of this.chatList) {
            console.log('data:',data);
            let computed_chat = {
                uid: data.user.id,
                avatar: data.user.avatar,
                title: data.user.name,
                subtitle: data.msg.content,
                gid: data.msg.gid,
                date: new Date(),
                unread:2,
            }
            result.push(computed_chat);
        }
        return result;
    }

    get computedMessageList() {
        return "";
    }


    init() {
        //query rest
        instance.post('/message/chat/list', {
            "uid": 1,
            "page": 1,
            "size": 10
        }).then(response => {
            console.log("chat list result:", response);
            this.chatList = response.data.data;
        });
    }
}

export default MessageStore;
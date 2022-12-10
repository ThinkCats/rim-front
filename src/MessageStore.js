import { action, computed, makeObservable, observable } from "mobx"
import instance from "./Client"



class MessageStore {
    chatList = []
    message = {}

    constructor() {
        makeObservable(this, {
            chatList: observable,
            message: observable,
            testLogo: computed,
            init: action
        })
        this.init()
    }

    get testLogo() {
        return this.chatList[0];
    }

    init() {
        //query rest
        instance.post('/message/chat/list', {
            "uid": 1,
            "page": 1,
            "size": 10
        }).then(response => {
            console.log("chat list result:", response);
        });

        this.chatList.push('hehehe');
    }
}

export default MessageStore;
import { action, computed, makeObservable, observable } from "mobx"



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
        console.log("query from server....");
        this.chatList.push('hehehe');
    }
}

export default MessageStore;
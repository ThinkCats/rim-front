import store from "./store";
import { uuidv4 } from "./utils";
import cookie from "react-cookies"

const ws = new WebSocket("ws://127.0.0.1:3012")

export const wsLogin = () => {
    console.log("ws login:" , cookie.load('token'));
    cookie.load()
    let login = {
        "event": "Login",
        "body": {
            "kind": "Text",
            "content": cookie.load('token'),
            "uid": store.login.uid,
            "gid": 3,
            "clientMsgId": uuidv4()
        }
    };
    if (ws.readyState == ws.OPEN) {
        ws.send(JSON.stringify(login)); 
    }
};


ws.onmessage = (event) => {
    store.newMessageArrive(event.data);
}


export default ws;

const ws = new WebSocket("ws://127.0.0.1:3012")

ws.onopen = (event) => {
    console.log("ws:", event);
    let login = {
        "event": "Login",
        "body": {
            "kind": "Text",
            "content": "f3ea0ef3-b1b1-453c-8456-8311b6e6413a",
            "uid": 2,
            "gid": 3,
            "clientMsgId": "lalalalal"
        }
    };
    ws.send(JSON.stringify(login));
}

ws.onmessage = (event) => {
    console.log(event.data);
}


export default ws;
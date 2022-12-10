import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import { MessageBox, MessageList } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import { Input } from 'react-chat-elements';
import { Button } from "react-chat-elements";
import { Navbar } from "react-chat-elements"

const App = observer(({ store }) => {
  return (
    <div className="Container">
      <div className="leftDivContainer">
        <div className="chatListContainer">
          <ChatListView store={store} />
        </div>
        <div className="navBarContainer">
          <Navbar
            left=<div>通话</div>
            center=<div>聊天</div>
            right=<div>联系人</div>
            type="light"
          />
        </div>
      </div>
      <div className="rightDivContainer">
        <div className="messageContainer">
          <MessageListView store={store} />
        </div>
        <div className="inputContainer">
          <InputView />
        </div>
      </div>
    </div>
  );
})

const ChatListView = observer(({ store }) => {

  let selectChatGroup = (data) => {
    console.log('click:', data);
    store.fetchMessageList({ gid: data.id, uid: data.uid, page: 1, size: 10 });
  }

  return (
    <ChatList
      className='chat-list'
      dataSource={store.computedChatList}
      onClick={selectChatGroup}
    />
  )
});

const MessageListView = observer(({ store }) => {
  console.log('compute msg list:', store.computedMessageList);

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [store.computedMessageList]);


  return (
    <div className="messageListContainer">
      <MessageList
        className='message-list'
        lockable={false}
        toBottomHeight={'100%'}
        dataSource={store.computedMessageList}
      />
      <div ref={messagesEndRef} />
    </div>
  )
});

function InputView() {
  return (
    <div>
      <Input className="inputStyle"
        placeholder="请输入内容..."
        multiline={true}
        rightButtons={send_btn()}
      />
    </div>
  )
}

function send_btn() {
  return (
    <div><Button text={"Send"} onClick={() => alert("Sending...")} title="Send" /></div>
  )
}

export default App;

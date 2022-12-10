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
          <InputView store={store} />
        </div>
      </div>
    </div>
  );
})

const ChatListView = observer(({ store }) => {
  let selectChatGroup = (data) => {
    console.log('click:', data);
    store.selectChat(data);
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

const InputView = observer(({ store }) => {

  const inputRef = useRef(null);

  const handleSubmit = () => {
    store.sendWsMsg(store.inputMsg);
    inputRef.target = {};
    //TODO reset
    inputRef.value = '';
    inputRef.defaultValue = '';
  }

  return (
    <div>
      <Input className="inputStyle"
        placeholder="请输入内容..."
        multiline={true}
        rightButtons={<Button text={"Send"} onClick={handleSubmit} title="Send" />}
        onChange={(data) => store.updateInputMsg(data.target.value)}
        referance={inputRef}
        // inputRef={ref => this.nativeTextInput = ref}
      />
    </div>
  )
});

export default App;

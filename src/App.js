import { observer } from "mobx-react-lite";
import { MessageBox } from "react-chat-elements";
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

  console.log(store.computedChatList);


  return (
    <ChatList
      className='chat-list'
      dataSource={store.computedChatList}
      // dataSource={[
      //   {
      //     avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
      //     alt: 'kursat_avatar',
      //     title: '小韦',
      //     subtitle: "你说啥 ?",
      //     date: new Date(),
      //     unread: 1,
      //   }
      // ]}
       />
  )
});

const MessageListView = observer(({ store }) => {
  let chatList = store.chatList;
  return (
    <div>
      <MessageBox
        position='left'
        title='小韦'
        type='text'
        text="鼓掌.gif"
        date={new Date()}
        replyButton={true}
      />

      <MessageBox
        position="right"
        title="王大哥"
        type="text"
        text="在干啥？"
        date={new Date()}
      />
      <MessageBox
        position='left'
        title='小韦'
        type='text'
        text="你说啥？"
        date={new Date()}
        replyButton={true}
      />

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

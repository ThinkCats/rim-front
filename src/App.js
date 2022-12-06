import { MessageBox } from "react-chat-elements";
import { ChatList } from "react-chat-elements";
import { Input } from 'react-chat-elements';
import { Button } from "react-chat-elements";
import { Navbar } from "react-chat-elements"

function App() {
  return (
    <div className="Container">
      <div className="leftDivContainer">
        <Navbar
          left=<div>Logo</div>
          center=<div>聊天</div>
          right=<div>联系人</div>
          type="light"
        />
        <ChatListView />
      </div>
      <div className="rightDivContainer">
        <MessageListView />
      </div>
    </div>
  );
}

function ChatListView() {
  return (
    <ChatList
      className='chat-list'
      dataSource={[
        {
          avatar: 'https://avatars.githubusercontent.com/u/80540635?v=4',
          alt: 'kursat_avatar',
          title: '小韦',
          subtitle: "你说啥 ?",
          date: new Date(),
          unread: 1,
        }
      ]} />
  )
}

function MessageListView() {
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
      <Input
        placeholder="Type here..."
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

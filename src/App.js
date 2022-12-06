import { MessageBox } from "react-chat-elements";

function App() {
  return (
    <div>
      <MessageBox
        position='left'
        title='hehe'
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
    </div>
  );
}

export default App;

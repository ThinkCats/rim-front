import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './other/reportWebVitals';
import "react-chat-elements/dist/main.css"
import "./style/custom.css";
import store, { loginStore } from './store';
import { observer } from 'mobx-react-lite';
import Login from './login';

store.initLogin();
store.fetchChatList();

const View = observer(({ store, loginStore }) => {
  let view = loginStore.loginOk ? <App store={store} /> : <Login loginStore={loginStore} />;
  return (
    <div>
      {view}
    </div>
  )
})

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <View store={store} loginStore={loginStore} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

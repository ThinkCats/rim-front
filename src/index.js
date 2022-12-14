import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './other/reportWebVitals';
import "react-chat-elements/dist/main.css"
import "./style/custom.css";
import store from './store';
import { observer } from 'mobx-react-lite';
import Login from './login';

store.initLogin();
store.fetchChatList();

const root = ReactDOM.createRoot(document.getElementById('root'));

const View = observer(({store}) => {
  let view = store.loginOk ? <Login store={store} />: <App store={store} />;
  return (
    <div>
      {view}
    </div>
  )
})

root.render(
  <React.StrictMode>
    <View store={store} />
  </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

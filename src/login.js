import { observer } from "mobx-react-lite";

export const LoginView = observer(({loginStore}) => {
    
    const view = loginStore.mode === 0 ? <Login loginStore={loginStore}/> : <Register loginStore={loginStore} />;

    return (
        <div>{view}</div>
    );
})

export const Login = observer(({ loginStore }) => {

    const userNameOnChange = (e) => {
        loginStore.updateLoginInfo('account', e.target.value)
    }

    const passwordOnChange = (e) => {
        loginStore.updateLoginInfo('password', e.target.value);
    }

    const login = () => {
        loginStore.login();
    }

    return (
        <div className="loginContainer">
            <div className="box">
                <h1>Login</h1>
                <input type="text" onChange={userNameOnChange} placeholder="Username" />
                <input type="password" onChange={passwordOnChange} placeholder="password" />
                <input type="submit" onClick={login} value="Login" />
                <a onClick={() => loginStore.toggleMode(1)}>Register</a>
            </div>
        </div>
    );
})

export const Register = observer(({ loginStore }) => {

    const userNameOnChange = (e) => {
        loginStore.updateRegistInfo('account', e.target.value)
    }

    const passwordOnChange = (e) => {
        loginStore.updateRegistInfo('password', e.target.value);
    }

    const nickNameOnChange = (e) => {
        loginStore.updateRegistInfo('name', e.target.value);
    }


    const register = () => {
        loginStore.register();
    }

    return (
        <div className="loginContainer">
            <div className="box">
                <h1>Register Account</h1>
                <input type="text" onChange={userNameOnChange} placeholder="Username" />
                <input type="text" onChange={nickNameOnChange} placeholder="NickName" />
                <input type="password" onChange={passwordOnChange} placeholder="password" />
                <input type="submit" onClick={register} value="Register" />
                <a onClick={() => loginStore.toggleMode(0)}>Back</a>
            </div>
        </div>
    );
})

export default Login;
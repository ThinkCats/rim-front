import { observer } from "mobx-react-lite";

export const Login = observer(({ store }) => {
    return (
        <div className="loginContainer">
            <div className="box">
                <h1>Login</h1>
                <input type="text" name="" placeholder="Username" />
                <input type="password" name="" placeholder="password" />
                <input type="submit" name="" value="Login" />
                <a>Register</a>
            </div>
        </div>
    );
})

export const Register = observer(({ store }) => {
    return (
        <div className="loginContainer">
            <div className="box">
                <h1>Register Account</h1>
                <input type="text" name="" placeholder="Username" />
                <input type="text" name="" placeholder="NickName" />
                <input type="password" name="" placeholder="password" />
                <input type="submit" name="" value="Register" />
            </div>
        </div>
    );
})

export default Login;
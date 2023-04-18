import { MouseEventHandler, useState } from "react";
import { User, userLogin } from "../services/auth.service";
import { useNavigate } from "react-router-dom";

const Login: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const login: MouseEventHandler<HTMLButtonElement> = async() => {
        try {
            const user: User = {
                username,
                password
            };
            const res = await userLogin(user);
            const userData = res['data'];
            console.log(userData);
            localStorage.setItem('token', userData['token']);
            navigate('/');
        } catch (err: any) {
            console.error(err);
        }
    }

    return(
        <div>
            <form>
                <label>Username</label>
                <input type='text' onChange={e => setUsername(e.target.value)} />
                <label>Password</label>
                <input type='password' onChange={e => setPassword(e.target.value)} />
                <button type='button' onClick={login}>Login</button>
            </form>
        </div>
    )
}

export default Login;
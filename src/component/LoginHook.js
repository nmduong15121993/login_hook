import React, { useState } from 'react';
import axios from 'axios';
import { user } from '../mooks';

// component
import { MainHook } from './MainHook';

const LoginHook = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLogin, setLogin] = useState(localStorage.getItem("jwtToken") != null);

    const login = async () => {
        const URL_LOGIN = 'http://edis.vietnamtrucking.vn:1212/api/Users/Login';
        try {
            const { data, status } = await axios.post(
                URL_LOGIN,
                {
                    code: username,
                    password: password,
                }
            );

            if (status !== 200) throw new Error("Can't fetch data");
            console.log(data);
            localStorage.setItem("jwtToken", data);
            setLogin(true);

        } catch (error) {
            console.log(error);
        }
    }

    const onLogoutSuccess = () => {
        setLogin(false);
    }

    React.useEffect(() => {
        const fnPromise = async () => {
            const user1 = await user.getUser(1);
            console.log(user1);
        };
        fnPromise();
    }, []);

    return (
        <div>
            { isLogin ?
                <MainHook key={isLogin} onLogoutSuccess={onLogoutSuccess} /> :
                <form>
                    <div>
                        <label>Username: </label>
                        <input type="text" name="username" onChange={({ target }) => setUsername(target.value)} />
                    </div>
                    <div>
                        <label>PassWord: </label>
                        <input type="password" name="password" onChange={({ target }) => setPassword(target.value)} />
                    </div>
                    <div>
                        <button type="button" onClick={login}>Login</button>
                    </div>
                </form>
            }
        </div>
    )
}

export { LoginHook };

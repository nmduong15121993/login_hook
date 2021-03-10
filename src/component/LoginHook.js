import React, { useState } from "react";
import { user } from "../mooks";

// component
import { MainHook } from "./MainHook";

const LoginHook = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [remember, setRemember] = useState(false);
  // const [dataRemember, SetDataRemember] = useState({});
  const [isLogin, setLogin] = useState(false);

  // React.useEffect(() => {
  //   const dataRemember = localStorage.getItem("account");
  //   SetDataRemember(dataRemember);
  // }, []);

  const logIn = () => {
    const fnPromise = async () => {
      try {
        const user1 = await user.getUserName(username, password);
        console.log(user1);
        if(remember === true) {
          const arrayAccount = [
            {
              user: username,
              pass: password
            }
          ];
          localStorage.setItem("account", JSON.stringify(arrayAccount));
        }
        
        setLogin(true);
      } catch (error) {
        setError(error.toString());        
      }
    };
    fnPromise();
  }

  const onLogoutSuccess = () => {
    setLogin(false);
  };

  return (
    <div>
      {isLogin ? (
        <MainHook key={isLogin} onLogoutSuccess={onLogoutSuccess} />
      ) : (
        <form>
          <div>
            <label>Username: </label>
            <input
              type="text"
              name="username"
              onChange={({ target }) => {
                setUsername(target.value);
                setError('');
              }}
            />
          </div>

          <div>
            <label>PassWord: </label>
            <input
              type="password"
              name="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>

          <div>{error}</div>

          <div>
            <input 
              type="checkbox" 
              value={remember} 
              onClick={({target}) => setRemember(target.checked)} 
            /> 
            <span>Remember me</span>
          </div>

          <div>
            <button type="button" onClick={logIn}>
              Login
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export { LoginHook };

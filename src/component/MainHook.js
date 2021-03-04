import React from 'react';

const MainHook = (props) => {

    return (
        <div>
            <h1>Main Hook</h1>

            <button onClick={ () => {
                localStorage.removeItem("jwtToken");
                props.onLogoutSuccess();
            }} 
            >
             Logout
            </button>
        </div>
    )
}

export {MainHook};

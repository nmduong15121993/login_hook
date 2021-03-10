import React from 'react';

const MainHook = (props) => {

    return (
        <div>
            <h1>Main Hook</h1>

            <button onClick={ () => {
                props.onLogoutSuccess();
            }} 
            >
             Log Out
            </button>
        </div>
    )
}

export {MainHook};

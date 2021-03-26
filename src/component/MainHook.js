import React from 'react';

const MainHook = ({ onLogoutSuccess }) => {

    return (
        <div>
            <h1>Main Hook</h1>

            <button onClick={onLogoutSuccess}>
             Log Out
            </button>
        </div>
    )
}

export {MainHook};

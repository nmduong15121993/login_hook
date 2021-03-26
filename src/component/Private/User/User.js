import React from 'react'

const User = ({onLogoutSuccess}) => {

  return (
    <div>
      <button onClick={onLogoutSuccess}>
        Log Out
      </button>      
    </div>
  )
}

export {User};

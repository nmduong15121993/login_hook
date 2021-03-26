import React from 'react';
import { Button } from 'reactstrap';

// Component
import { LoginHook } from '../LoginHook';

/**
 * 1. Component phai auth moi vao duoc
 *  1.1 Component danh cho admin
 *  1.2 Component danh cho user da dang nhap
 * 2. Component ko can auth
 *  2.1 Component danh cho khach
 */

const Auth = () => {
  const [loading, setLoading] = React.useState(false);
  const [isAuth, setAuth] = React.useState(); // { username, password }
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    setLoading(true);
    try {
      const dataRemember = JSON.parse(localStorage.getItem("account"));
      setAuth(dataRemember);
    } catch {
      setError('Ten dang nhap hoac mat khau sai');
    } finally {
      setLoading(false);
    }
  }, []);

  return loading ? <>Loading...</> : (
    <>
      { error ? <div>{error}</div> : null }

      { isAuth ? (
        <Button color="danger">Danger!</Button>
      ) : (
        <LoginHook />
      )}

    </>
  )

}

export { Auth };

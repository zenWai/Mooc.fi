import React, { useContext, useEffect } from 'react';
import { NotificationContext, HIDE_NOTIFICATION} from './NotificationContext.jsx';

const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext);
  const { message, visible } = state;

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  };

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch({ type: HIDE_NOTIFICATION });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  return <div style={style}>{message}</div>;
}

export default Notification;

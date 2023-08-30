import './NotificationMessage.css';
import {useDispatch, useSelector} from "react-redux";
import {hideNotificationMessage} from "../features/notifications/notificationMessageSlice.js"
import {useEffect} from "react";

const NotificationMessage = () => {
  const dispatch = useDispatch();
  const {visible, message, type} = useSelector(state => state.notificationMessage);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotificationMessage())
      }, 5000)
      return () => clearTimeout(timer);
    }
  }, [message, visible, dispatch]);
  if (!visible) return null;

  const style = type === 'error' ? 'error' : 'success';
  return <div className={style}>{message}</div>;
};

export default NotificationMessage;

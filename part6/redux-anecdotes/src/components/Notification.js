import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clearNotification} from "../reducers/notificationReducer";

const Notification = () => {
  const { message, visible, duration } = useSelector(state => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      const timerId = setTimeout(() => {
        dispatch(clearNotification());
      }, duration);

      return () => clearTimeout(timerId);
    }
  }, [visible, dispatch, duration]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? 'block' : 'none',
    marginBottom: 10,
  }
  return (
    <div style={style}>
      {/* object {message: ''} mandatory */}
      {message ? message.message : null}
    </div>
  )
}

export default Notification
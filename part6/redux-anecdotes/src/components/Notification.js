import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {clearNotification} from "../reducers/notificationReducer";

const Notification = () => {
  const { message, visible } = useSelector(state => state.notification);
  const dispatch = useDispatch();
  useEffect(() => {
    if (visible) {
      const timerId = setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);

      return () => clearTimeout(timerId);
    }
  }, [visible, dispatch]);

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: visible ? 'block' : 'none',
    marginBottom: 10,
  }
  return (
    <div style={style}>
      {message}
    </div>
  )
}

export default Notification
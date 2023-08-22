import {useState, useImperativeHandle, forwardRef, useRef} from "react";
import './NotificationMessage.css';

const Notification = forwardRef(({ message, type }, ref) => {
  const [visible, setVisible] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(message);
  const [currentType, setCurrentType] = useState(type);
  const hideTimerRef = useRef(null);

  const toggleVisibility = (newMessage, newType) => {
    setVisible(true);
    setCurrentMessage(newMessage);
    setCurrentType(newType);

    // handles better spam clicking/rendering message
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      setVisible(false);
    }, 5000);

  };

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }));

  if (!visible) {
    return null;
  }

  const style = currentType === 'error' ? 'error' : 'success';
  return (
    <div className={style}>
      {currentMessage}
    </div>
  );
});

export default Notification;
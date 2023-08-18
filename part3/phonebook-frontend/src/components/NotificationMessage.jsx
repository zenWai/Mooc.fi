import {useEffect, useState} from "react";
import './NotificationMessage.css';

const Notification = ({message, type}) => {
    const [visible, setVisible] = useState(!!message);

    useEffect(() => {
        if (message && type) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [message, type]);

    if (!visible) {
        return null;
    }

    const style = type === 'error' ? 'error' : 'success';
    return (
        <div className={style}>
            {message}
        </div>
    );
}

export default Notification;
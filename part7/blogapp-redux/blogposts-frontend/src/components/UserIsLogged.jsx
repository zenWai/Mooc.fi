import {removeUser} from "../features/user/userSlice.js";
import {useDispatch, useSelector} from "react-redux";

const UserIsLogged = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  return (
    <>
      {user?.name} logged in -{' '}
      <button id="logout-button" onClick={() => dispatch(removeUser())}>
        logout
      </button>
    </>
  )
}

export default UserIsLogged;
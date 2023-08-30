import {removeUser} from "../features/user/userSlice.js";
import {useSelector} from "react-redux";

const UserIsLogged = () => {
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
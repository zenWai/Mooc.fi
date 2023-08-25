import {useDispatch} from "react-redux";
import {setFilterAction} from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(setFilterAction(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange}/>
    </div>
  )
}

export default Filter
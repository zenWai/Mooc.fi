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
      filter <input onChange={handleChange} placeholder="Type to filter..."/>
    </div>
  )
}

export default Filter
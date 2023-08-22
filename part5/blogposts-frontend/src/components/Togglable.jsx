import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from "prop-types";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    props.onToggle && props.onToggle(!visible);
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
        <button style={hideWhenVisible} onClick={toggleVisibility}>{props.showLabel}</button>
      <div style={showWhenVisible}>
        <button onClick={toggleVisibility}>{props.hideLabel}</button>
        {props.children}
      </div>
    </div>
  )
})
Togglable.propTypes = {
  showLabel: PropTypes.string.isRequired,
  hideLabel: PropTypes.string.isRequired
};
export default Togglable
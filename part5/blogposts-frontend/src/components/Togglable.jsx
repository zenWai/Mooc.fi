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
        <button id="togglable-show-label-button" style={hideWhenVisible} onClick={toggleVisibility}>{props.showLabel}</button>
      <div id="togglable-content" style={showWhenVisible} className="togglableContent">
        <button id="togglable-hide-label-button" onClick={toggleVisibility}>{props.hideLabel}</button>
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
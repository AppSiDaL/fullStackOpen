import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import PropTypes from 'prop-types'
import CancelIcon from '@mui/icons-material/Cancel'

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button variant="outlined" onClick={toggleVisibility} endIcon={<AddIcon />}>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="outlined" onClick={toggleVisibility} endIcon={<CancelIcon />}>
        cancel
        </Button>
      </div>
    </div>
  )
})
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}
Togglable.displayName = 'Togglable'
export default Togglable

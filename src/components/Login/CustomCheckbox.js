import * as React from 'react'
import { styled } from '@mui/material'
import Checkbox from '@mui/material/Checkbox'

const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: 3,
  width: 19,
  height: 19,
  marginLeft: '4px',
  boxShadow:
    theme.palette.mode === 'dark'
      ? `0 0 0 1px ${theme.palette.grey[200]}`
      : `inset 0 0 0 1px ${theme.palette.grey[300]}`,
  backgroundColor: 'transparent',

  '.Mui-focusVisible &': {
    outline:
      theme.palette.mode === 'dark'
        ? `0px auto ${theme.palette.grey[200]}`
        : `0px auto  ${theme.palette.grey[300]}`,
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.primary
        : theme.palette.primary,
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background: theme.palette.grey[100],
  },
}))

const BpCheckedIcon = styled(BpIcon)({
  boxShadow: 'none',
  width: 19,
  height: 19,
  '&:before': {
    display: 'block',
    width: 19,
    height: 19,
  },
})

// Inspired by blueprintjs
function CustomCheckbox(props) {
  return (
    <Checkbox
      disableRipple
      color={props.color ? props.color : 'default'}
      checkedIcon={
        <BpCheckedIcon
          sx={{
            backgroundColor: props.color
              ? `${props.color}.main`
              : 'primary.main',
          }}
        />
      }
      icon={<BpIcon />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
      {...props}
    />
  )
}

export default CustomCheckbox

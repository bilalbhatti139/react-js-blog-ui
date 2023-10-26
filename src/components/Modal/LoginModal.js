import { useState } from 'react'
import Box from '@mui/material/Box'

import Modal from '@mui/material/Modal'
import LoginForm from '../LoginForm'
import { useLoginModal } from '../../contexts/LoginModalContext'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 4,
}

export default function LoginModal() {
  const [open, setOpen] = useState(true)
  const { closeModal } = useLoginModal()
  const handleClose = () => {
    setOpen(false)
    closeModal()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <LoginForm />
        </Box>
      </Modal>
    </div>
  )
}

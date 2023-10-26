import { useState } from 'react'
import Box from '@mui/material/Box'

import Modal from '@mui/material/Modal'

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

export default function AddNewBlogModal({ children }) {
  const [open, setOpen] = useState(true)
  const { closeBlogModal } = useLoginModal()
  const handleClose = () => {
    setOpen(false)
    closeBlogModal()
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>{children}</Box>
      </Modal>
    </div>
  )
}

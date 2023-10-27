  import { useState, useEffect } from 'react'
  import Box from '@mui/material/Box'

  import Modal from '@mui/material/Modal'

  import { useLoginModal } from '../../contexts/LoginModalContext'



  export default function AddNewBlogModal({ children }) {

    const [state400, setState400] = useState(false);
    const [state600, setState600] = useState(false);
    const [open, setOpen] = useState(true)
    const { closeBlogModal } = useLoginModal()
    const handleClose = () => {
      setOpen(false)
      closeBlogModal()
    }

    useEffect(() => {
      const handleResize = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth < 400) {
          setState400(true);
          setState600(false);
        } else if (screenWidth < 600) {
          setState400(false);
          setState600(true);
        } else {
          setState400(false);
          setState600(false);
        }
      };

      // Initial call to set the initial state
      handleResize();

      // Add event listener to handle window resize
      window.addEventListener('resize', handleResize);

      // Clean up the event listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:`${state400 ? "275px" : state600 ? "350px" : "500px"}` ,
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
      borderRadius: 4,
     

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

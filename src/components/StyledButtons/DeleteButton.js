import { Button } from '@mui/material'

const DeleteButton = ({ handleDeleteClick }) => (
  <Button
    variant='contained'
    sx={{ color: '#fff' }}
    onClick={handleDeleteClick}
  >
    delete
  </Button>
)

export default DeleteButton

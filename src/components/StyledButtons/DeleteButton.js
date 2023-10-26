import { Button } from '@mui/material'

const DeleteButton = ({ handleDeleteClick }) => (
  <Button
    variant='contained'
    sx={{ color: '#fff', textTransform: 'capitalize' }}
    onClick={handleDeleteClick}
  >
    Delete
  </Button>
)

export default DeleteButton

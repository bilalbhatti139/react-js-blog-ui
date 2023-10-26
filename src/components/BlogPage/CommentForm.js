import { useContext } from 'react'
import PropTypes from 'prop-types'
import useField from '../../hooks/useField'
import { NotificationContext } from '../../contexts/NotificationContext'
import { fullWidthStyles } from '../../styles/styles'
import { Button, TextField, Box } from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

const CommentForm = ({
  blogId,
  createComment,

  setShowComment,
}) => {
  const {
    value: comment,
    onChange: handleCommentChange,
    reset: resetComment,
  } = useField('text')
  const [, showNotification] = useContext(NotificationContext)

  const addComment = async (event) => {
    event.preventDefault()

    const commentObject = { comment }

    try {
      await createComment(blogId, commentObject)
      showNotification('Success! A new comment has been added.', 'success')
      resetComment()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addComment}>
      <Box>
        <Box sx={fullWidthStyles}>
          <TextField
            label='comment'
            id='comment'
            rows={4}
            multiline
            fullWidth
            value={comment}
            onChange={handleCommentChange}
            sx={{ marginTop: '20px', marginBottom: '20px' }}
          />
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant='contained'
            type='submit'
            style={{
              paddingLeft: '40px',
              paddingRight: '40px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
          >
            Submit
            <SendIcon
              sx={{
                rotate: '306deg',
                position: 'absolute',
                top: '8px',
                right: '18px',
                fontSize: '18px',
              }}
            />
          </Button>
          <Button
            variant='outlined'
            style={{
              marginLeft: '10px',
              fontSize: '18px',
              textTransform: 'capitalize',
            }}
            onClick={() => {
              setShowComment(false)
            }}
          >
            cancel
          </Button>
        </Box>
      </Box>
    </form>
  )
}

CommentForm.propTypes = {
  blogId: PropTypes.string.isRequired,
  createComment: PropTypes.func.isRequired,
}

export default CommentForm

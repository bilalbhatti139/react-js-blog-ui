import { useContext } from 'react'
import PropTypes from 'prop-types'
import useField from '../../hooks/useField'
import { NotificationContext } from '../../contexts/NotificationContext'
import { fullWidthStyles } from '../../styles/styles'
import {
  Typography,
  Button,
  TextField,
  OutlinedInput,
  Box,
} from '@mui/material'
import { useLoginModal } from '../../contexts/LoginModalContext'

const BlogForm = ({ createBlog }) => {
  const {
    value: newTitle,
    onChange: handleTitleChange,
    reset: resetTitle,
  } = useField('text')
  const {
    value: newAuthor,
    onChange: handleAuthorChange,
    reset: resetAuthor,
  } = useField('text')
  const {
    value: newBlogPost,
    onChange: handleBlogPostChange,
    reset: resetBlogPost,
  } = useField('text')
  const { closeBlogModal } = useLoginModal()
  const [, showNotification] = useContext(NotificationContext)

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      blogPost: newBlogPost,
    }

    try {
      const { title, author } = await createBlog(blogObject)
      showNotification(
        `Success! A new blog "${title}" ${
          author ? `by ${author}` : ''
        } has been added.`,
        'success'
      )
      resetTitle()
      resetAuthor()
      resetBlogPost()
      closeBlogModal()
    } catch (error) {
      console.log(error)
      showNotification(error.response?.data?.error, 'error')
    }
  }

  return (
    <form onSubmit={addBlog}>
      <Typography variant='h3'>Add a new blog post</Typography>
      <Box>
        <Box sx={fullWidthStyles}>
          <TextField
            label='title'
            id='title'
            fullWidth
            value={newTitle}
            onChange={handleTitleChange}
            sx={{ marginBottom: '10px' }}
          />
        </Box>
        <Box sx={fullWidthStyles}>
          <TextField
            label='author'
            id='author'
            fullWidth
            value={newAuthor}
            onChange={handleAuthorChange}
            sx={{ marginBottom: '10px' }}
          />
        </Box>
        <Box sx={fullWidthStyles}>
          <OutlinedInput
            multiline
            rows={8}
            placeholder='blog post'
            id='blog-post'
            fullWidth
            value={newBlogPost}
            onChange={handleBlogPostChange}
            sx={{ marginBottom: '10px' }}
          />
        </Box>
        <Button variant='contained' type='submit'>
          Add
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            closeBlogModal()
          }}
          sx={{ marginLeft: '10px' }}
        >
          Close
        </Button>
      </Box>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm

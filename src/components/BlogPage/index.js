import { useContext, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'
import LikeButton from '../StyledButtons/LikeButton'
import DeleteButton from '../StyledButtons/DeleteButton'
import CommentForm from './CommentForm'

import { Button, Container, Grid, Typography } from '@mui/material'

import img from '../../assets/images/post2.png'
import Comments from '../BlogPage/Comments'
import ChatIcon from '@mui/icons-material/Chat'

const Blog = () => {
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)

  const [showComment, setShowComment] = useState(false)
  const navigate = useNavigate()

  const { id } = useParams()
  const {
    oneBlog,
    isLoadingOneBlog,
    isOneBlogError,
    updateBlog,
    deleteBlog,
    createComment,
  } = useBlogs(id)

  if (isLoadingOneBlog) {
    return <Loading />
  }

  if (isOneBlogError) {
    return <Error />
  }

  // const blog = blogs.find(blog => blog.id === id)
  const blog = oneBlog

  const isUserAllowedToLike = loggedInUser
    ? blog.likedBy.every((idOfLikedUser) => idOfLikedUser !== loggedInUser.id)
    : false

  const incrementLikes = async () => {
    await updateBlog(blog, true) // incrementLikes = true
  }

  const handleDeleteClick = async () => {
    if (window.confirm(`Delete ${blog.title}?`)) {
      try {
        await deleteBlog(blog.id)
        showNotification(`Deleted ${blog.title}`, 'success')
        navigate('/')
      } catch (error) {
        showNotification('An error occurred while deleting the blog.', 'error')
      }
    }
  }

  const buttonStyle = {
    backgroundColor: '#F9F9F9',
    margin: '0 10px', // Add space between buttons
  }

  const commentButtonStyle = {
    ...buttonStyle,
    color: '#696969', // Set text color to #696969
  }

  const commentIconStyle = {
    color: '#696969', // Set comment icon color to blue
  }

  return (
    <>
      <Container>
        <section id='blog-list-container'>
          <Grid container spacing={4} sx={{ marginTop: '20px' }}>
            <Grid item xs={12} sm={12} md={12}>
              <img src={img} style={{ width: '100%' }} />

              <Typography variant='h3'>{blog.title}</Typography>
              <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
                {blog.blogPost}
              </Typography>
            </Grid>
          </Grid>
        </section>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant='body1'>
            <LikeButton
              incrementLikes={incrementLikes}
              isUserAllowedToLike={isUserAllowedToLike}
              like={blog.likes}
            />
          </Typography>
          {loggedInUser && (
            <Button
              variant='contained'
              style={{ textTransform: 'capitalize', ...commentButtonStyle }}
              onClick={() => {
                setShowComment(true)
              }}
              startIcon={<ChatIcon style={commentIconStyle} />}
            >
              Comment
            </Button>
          )}

          {loggedInUser && (
            <>
              {blog.creator.id === loggedInUser.id && (
                <DeleteButton handleDeleteClick={handleDeleteClick} />
              )}
            </>
          )}
        </div>
        {showComment && loggedInUser && (
          <CommentForm
            blogId={id}
            createComment={createComment}
            setShowComment={setShowComment}
          />
        )}

        <Comments comments={blog.comments} />
      </Container>
    </>
  )
}

export default Blog

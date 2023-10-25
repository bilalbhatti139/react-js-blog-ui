import { useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import useBlogs from '../../hooks/useBlogs'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { UserContext } from '../../contexts/UserContext'
import { NotificationContext } from '../../contexts/NotificationContext'
import LikeButton from '../StyledButtons/LikeButton'
import DeleteButton from '../StyledButtons/DeleteButton'
import CommentForm from './CommentForm'
import Togglable from '../Togglable'
import {
  Avatar,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
} from '@mui/material'
import line from '../../assets/images/Line.png'
import img from '../../assets/images/post2.png'

import ChatIcon from '@mui/icons-material/Chat'

const Blog = () => {
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
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
      {/* <div>
        <section className='blog-details-container'>
          <Typography variant='h2'>
            {blog.author ? `${blog.title} by ${blog.author}` : blog.title}
          </Typography>

          <Typography variant='body1' sx={{ whiteSpace: 'pre-line' }}>
            {blog.blogPost}
          </Typography>
          <Typography variant='body1'>
            {blog.likes} {blog.likes === 1 ? 'like ' : 'likes '}
            <LikeButton
              incrementLikes={incrementLikes}
              isUserAllowedToLike={isUserAllowedToLike}
              like={blog.likes}
            />
          </Typography>
        </section>

        {loggedInUser && (
          <>
            {blog.creator.id === loggedInUser.id && (
              <DeleteButton handleDeleteClick={handleDeleteClick} />
            )}
            <Togglable buttonLabel='new comment'>
              <CommentForm blogId={id} createComment={createComment} />
            </Togglable>
          </>
        )}

        <Comments comments={blog.comments} />
      </div> */}

      <Container
        maxWidth='2400px'
        style={{
          backgroundImage: `url(${line})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#f8f9fb',
          height: '250px',
        }}
      >
        <Container maxWidth='md'>
          <Grid container spacing={2} sx={{ height: '250px' }}>
            <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ textAlign: 'left', display: 'flex', gap: '15px' }}>
                <Avatar src={img} alt='post' sx={{ width: 100, height: 100 }} />
                <div>
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 700, fontSize: 24, mt: 1 }}
                  >
                    name
                  </Typography>
                  <Typography variant='body1' sx={{ mt: 1 }}>
                    Lorem Ipsum has been the industrys standard dummy text ever
                    since the 15
                  </Typography>
                  <Typography
                    variant='body2'
                    color='#4478F9'
                    sx={{
                      fontWeight: '700',
                      '& a': {
                        textDecoration: 'none',
                        color: 'inherit',
                        transition: 'text-decoration 0.3s', // Add a transition for smooth effect
                        '&': {
                          textDecoration: 'underline',
                        },
                      },
                    }}
                  >
                    <Link to='/users'>Back To Users</Link>
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Paper
                sx={{
                  textAlign: 'right',
                  padding: '20px 20px',
                  borderRadius: '5px',
                  backgroundColor: '#4478F9',
                }}
              >
                <Typography
                  variant='body1'
                  align='center'
                  sx={{ fontWeight: 700, fontSize: '20px', color: 'white' }}
                >
                  Total Blog
                </Typography>
                <Typography
                  variant='body1'
                  align='center'
                  sx={{
                    fontWeight: 700,
                    fontSize: '30px',
                    color: 'white',
                  }}
                >
                  4
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>
      <Container>
        <section id='blog-list-container'>
          <Grid container spacing={4} sx={{ marginTop: '40px' }}>
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
            <>
              {blog.creator.id === loggedInUser.id && (
                <DeleteButton handleDeleteClick={handleDeleteClick} />
              )}
              <Togglable buttonLabel='new comment'>
                <CommentForm blogId={id} createComment={createComment} />
              </Togglable>
            </>
          )}

          <Button
            variant='contained'
            style={commentButtonStyle}
            startIcon={<ChatIcon style={commentIconStyle} />}
          >
            Comment
          </Button>
        </div>
      </Container>
    </>
  )
}

export default Blog

import { useContext } from 'react'
import { useParams, Link } from 'react-router-dom'
import useUsers from '../../hooks/useUsers'
import { UserContext } from '../../contexts/UserContext'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { Typography, Container, Grid, Paper, Avatar } from '@mui/material'
import line from '../../assets/images/Line.png'
import img from '../../assets/images/post2.png'

const User = () => {
  const { id } = useParams()

  const [loggedInUser] = useContext(UserContext)
  const { oneUser, isLoadingOneUser, isOneUserError } = useUsers(id)

  if (!loggedInUser) {
    return <div>Log in to view this page</div>
  }

  if (isLoadingOneUser) {
    return <Loading />
  }

  if (isOneUserError) {
    return <Error />
  }

  // const user = users.find(user => user.id === id)
  const user = oneUser

  return (
    <>
      {/* <section>
        <Typography variant='h2'>{user.name}</Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <ListItemText
                primary={<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>}
              />
            </ListItem>
          ))}
        </List>
      </section> */}

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
                <Avatar src={img} alt='post' sx={{ width: 120, height: 120 }} />
                <div>
                  <Typography
                    variant='h6'
                    sx={{ fontWeight: 700, fontSize: 24, mt: 1 }}
                  >
                    {user?.name}
                  </Typography>
                  <Typography variant='body1' sx={{ margin: '0px' }}>
                    Lorem Ipsum has been the industrys standard dummy text ever
                    since
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
                  {user?.blogs?.length}
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Container>

      <Container>
        <section id='blog-list-container'>
          <Grid container spacing={4} sx={{ marginTop: '40px' }}>
            {user.blogs.map((blog) => (
              <Grid item xs={12} sm={6} md={6} key={blog.id}>
                <img src={img} style={{ width: '100%' }} />

                <Typography variant='h3'>{blog.title}</Typography>
                <Typography variant='body1' className='caption'>
                  Efficiently unleash cross-media information without
                  cross-media value. Quickly maximize. Efficiently unleash
                  cross-media information without cross-media value. Quickly
                  maximize. Efficiently unleash cross-media.
                </Typography>
                <Typography
                  variant='body2'
                  color='blue'
                  sx={{
                    marginBottom: '20px',
                    fontWeight: '500',
                    '& a': {
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'text-decoration 0.3s', // Add a transition for smooth effect
                      '&:hover': {
                        textDecoration: 'underline',
                      },
                    },
                  }}
                >
                  <Link to={`/blogs/${blog.id}`}>Read More</Link>
                </Typography>
              </Grid>
            ))}
          </Grid>
        </section>
      </Container>
    </>
  )
}

export default User

import { useContext } from 'react'
import { Link } from 'react-router-dom'
import useUsers from '../../hooks/useUsers'
import { UserContext } from '../../contexts/UserContext'
import Loading from '../FetchStateUI/Loading'
import Error from '../FetchStateUI/Error'
import { Typography, Container, Grid, Card } from '@mui/material'
import img from '../../assets/images/post1.png'
import line from '../../assets/images/Line.png'

const UserList = () => {
  const [loggedInUser] = useContext(UserContext)
  const { users, isLoadingUsers, isUsersError } = useUsers()

  if (!loggedInUser) {
    return <div>Log in to view this page</div>
  }

  if (isLoadingUsers) {
    return <Loading />
  }

  if (isUsersError) {
    return <Error />
  }

  return (
    <div>
      {/* <Typography variant='h2'>Users</Typography> */}
      {/* <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs added</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .sort((a, b) => b.blogs.length - a.blogs.length)
              .map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      <Container
        maxWidth='xl'
        style={{
          backgroundImage: `url(${line})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundColor: '#f8f9fb',
        }}
      >
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          sx={{ height: '250px' }}  
        >
          <Grid item xs={12} md={6}>
            <div style={{ textAlign: 'center' }}>
              <Typography
                variant='h1'
                sx={{
                  fontSize: '52px',
                  fontWeight: 700,
                  lineHeight: '60px',
                  letterSpacing: '-0.01em',
                  marginTop: '0px',
                  color: 'black',
                }}
              >
                Users Interface
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Grid container spacing={6} style={{ marginTop: '40px' }}>
          {users
            ?.sort((a, b) => b.blogs.length - a.blogs.length)
            .map((user) => (
              <Grid item xs={12} sm={6} md={3} key={user.id}>
                <Card
                  style={{
                    padding: '16px',
                    backgroundColor: '#F8F9FB',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={img}
                    alt='post'
                    style={{
                      width: '120px',
                      height: '120px',
                      borderRadius: '50%',
                      marginTop: '30px',
                    }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <Typography
                      variant='h6'
                      sx={{ marginTop: '20px', fontWeight: '600' }}
                    >
                      {user.name}
                    </Typography>
                    <Typography
                      component='div'
                      sx={{ marginTop: '20px', fontWeight: '500' }}
                    >
                      Lorem Ipsum has been the industrys standard dummy text
                      ever since the 15
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
                      <Link to={`/users/${user.id}`}>
                        Click Here To See Blog
                      </Link>
                    </Typography>
                  </div>
                </Card>
              </Grid>
            ))}
        </Grid>
      </Container>
    </div>
  )
}

export default UserList

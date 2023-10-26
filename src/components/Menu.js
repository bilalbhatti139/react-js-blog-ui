import { Link } from 'react-router-dom'
import { useContext } from 'react'
import useAuthentication from '../hooks/useAuthentication'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { AppBar, Toolbar, Button, Box } from '@mui/material'
import { useLoginModal } from '../contexts/LoginModalContext'
import logo from '../assets/images/logo.png'
import PeopleIcon from '@mui/icons-material/People'

const Menu = () => {
  const { handleLogout } = useAuthentication()
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
  const { openModal, openBlogModal } = useLoginModal()

  const toolbarStyles = {
    display: 'grid',
    gridTemplateColumns: {
      xs: '5% 45% 45% 5%',
      xl: '10% 40% 40% 10%',
    },
  }

  const leftBoxStyles = {
    gridColumn: '2/3',
    display: 'flex',
    justifyContent: 'start',
  }

  const rightBoxStyles = {
    gridColumn: '3/4',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
  }

  const handleLogoutClick = () => {
    try {
      handleLogout()
      showNotification('You have been successfully logged out.', 'success')
    } catch (error) {
      showNotification(
        'Error: There was a problem logging you out. Please try again.',
        'error'
      )
    }
  }

  return (
    <AppBar
      position='static'
      sx={{
        backgroundColor: '#F8F9FB',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={toolbarStyles}>
        <Box sx={leftBoxStyles}>
          <Button
            component={Link}
            sx={{ color: '#000', fontWeight: '600' }}
            to='/'
          >
            <img src={logo} />
          </Button>
        </Box>

        {loggedInUser ? (
          <Box sx={rightBoxStyles}>
            {loggedInUser !== null && (
              <>
                <Button
                  variant='contained'
                  sx={{
                    marginRight: '15px',
                    textTransform: 'capitalize',
                    backgroundColor: '#427ef8',
                    fontWeight: '600',
                    '&:hover': {
                      backgroundColor: '#427ef8', // Keep the same color on hover
                    },
                  }}
                  size='medium'
                  onClick={() => {
                    openBlogModal()
                  }}
                >
                  Add New Blog
                </Button>
                <Button
                  variant='contained'
                  sx={{
                    marginRight: '15px',
                    backgroundColor: '#427ef8',
                    textTransform: 'capitalize',
                    fontWeight: '600',
                    '&:hover': {
                      backgroundColor: '#427ef8', // Keep the same color on hover
                    },
                  }}
                  size='medium'
                  component={Link}
                  to='/users'
                >
                  <PeopleIcon sx={{ marginRight: '10px' }} />
                  Users
                </Button>
              </>
            )}
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#427ef8',
                textTransform: 'capitalize',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#427ef8', // Keep the same color on hover
                },
              }}
              size='medium'
              onClick={handleLogoutClick}
            >
              Log Out
            </Button>
          </Box>
        ) : (
          <Box sx={rightBoxStyles}>
            <Button
              variant='contained'
              sx={{
                backgroundColor: '#427ef8',
                textTransform: 'capitalize',
                fontWeight: '600',
                '&:hover': {
                  backgroundColor: '#427ef8', // Keep the same color on hover
                },
              }}
              size='large'
              onClick={openModal}
            >
              Log In
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Menu

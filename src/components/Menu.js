import { Link } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import useAuthentication from '../hooks/useAuthentication'
import { UserContext } from '../contexts/UserContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { AppBar, Toolbar, Button, Box, Drawer } from '@mui/material'
import { useLoginModal } from '../contexts/LoginModalContext'
import logo from '../assets/images/logo.png'
import PeopleIcon from '@mui/icons-material/People'
import MenuIcon from '@mui/icons-material/Menu';

const Menu = () => {
  const { handleLogout } = useAuthentication()
  const [loggedInUser] = useContext(UserContext)
  const [, showNotification] = useContext(NotificationContext)
  const { openModal, openBlogModal } = useLoginModal()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);


  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  }

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

  const checkScreenWidth = () => {
    if (window.innerWidth < 850) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsDrawerOpen(false)

    }
  };

  useEffect(() => {
    checkScreenWidth(); // Initial check

    // Add an event listener for screen size changes
    window.addEventListener('resize', checkScreenWidth);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', checkScreenWidth);
    };
  }, []);

  console.log("isMobile", isMobile)
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

        {isMobile && (<Box sx={rightBoxStyles}>
          <Button
            variant='contained'
            sx={{

              textTransform: 'capitalize',
              fontWeight: '600',

            }}
            size='large'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </Button>
        </Box>)}
        {loggedInUser && !isMobile ? (
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
        ) : !isMobile ? (
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
        ) : ""}
      </Toolbar>
      <Drawer
        anchor='right'
        open={isDrawerOpen}
        onClose={toggleDrawer}

      >
        <Box sx={{ width: 200, p: 2, display: "flex", flexDirection: "column", }}>
          {/* <Button
            component={Link}
            sx={{ color: '#000', fontWeight: '600' }}
            to='/'
          >
            <img src={logo} />
            <MenuIcon/>
          </Button> */}
          <Button
            variant='contained'
            sx={{

              textTransform: 'capitalize',
              fontWeight: '600',
              color: "black", "&:hover": {
                backgroundColor: "#427ef8", // Change this to the desired hover color
                color:"white"
              },
            }}

            size='large'
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </Button>
          <Button onClick={isDrawerOpen} component={Link} to='/' sx={{
            fontSize: "20px", color: "black", "&:hover": {
              backgroundColor: "#427ef8", // Change this to the desired hover color
              color: "white"
            },
          }}>
            Home
          </Button>
          {loggedInUser && (
            <>
              <Button
                onClick={() => {
                  openBlogModal();
                  toggleDrawer();
                }}
                sx={{
                  fontSize: "20px",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "#427ef8", // Change this to the desired hover color
                    color: "white"
                  },
                }}
              >
                Add New Blog
              </Button>

              <Button

                component={Link}
                onClick={isDrawerOpen}
                to="/users"
                sx={{
                  fontSize: "20px",
                  color: "black", "&:hover": {
                    backgroundColor: "#427ef8", // Change this to the desired hover color
                    color: "white"
                  },

                }}
              >
                Users
              </Button>
              <Button onClick={handleLogoutClick} sx={{
                fontSize: "20px", color: "black", "&:hover": {
                  backgroundColor: "#427ef8", // Change this to the desired hover color
                  color: "white"
                },
              }}>
                Log Out
              </Button>
            </>
          )}
          {!loggedInUser && (
            <Button onClick={openModal} sx={{
              fontSize: "20px", "&:hover": {
                backgroundColor: "#427ef8", // Change this to the desired hover color
                color: "white"
              },
            }}>
              Log In
            </Button>
          )}
        </Box>
      </Drawer>
    </AppBar>
  )
}

export default Menu

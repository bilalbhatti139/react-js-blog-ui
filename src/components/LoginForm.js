import { useContext } from 'react'
import loginService from '../services/login'
import useAuthentication from '../hooks/useAuthentication'
import useField from '../hooks/useField'
import { NotificationContext } from '../contexts/NotificationContext'
import {
  Typography,
  Button,
  Box,
  Stack,
  FormGroup,
  FormControlLabel,
} from '@mui/material'
import CustomFormLabel from './Login/CustomFormLabel'
import CustomTextField from './Login/CustomTextField'
import CustomCheckbox from './Login/CustomCheckbox'
import { useLoginModal } from '../contexts/LoginModalContext'

const LoginForm = () => {
  const { handleLogin } = useAuthentication()
  const {
    value: username,
    onChange: handleUsernameChange,
    reset: resetUsername,
  } = useField('text')
  const {
    value: password,
    onChange: handlePasswordChange,
    reset: resetPassword,
  } = useField('text')
  const [, showNotification] = useContext(NotificationContext)
  const { closeModal } = useLoginModal()

  const handleLoginClick = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })
      handleLogin(user)
      showNotification(
        `Welcome back${
          user.name !== 'anonymous' ? `, ${user.name}` : ''
        }! You have successfully logged in.`,
        'success'
      )
      resetUsername()
      resetPassword()
      closeModal()
    } catch (error) {
      if (error.response && error.response.status === 401) {
        showNotification('Wrong username or password', 'error')
      } else {
        showNotification(
          'Error: There was a problem logging you in. Please try again.',
          'error'
        )
      }
    }
  }

  return (
    <>
      <Typography
        fontWeight='700'
        variant='h2'
        mb={1}
        align='center'
        color='black'
      >
        Welcome To Log In
      </Typography>
      {/* <AuthSocialButtons title='Sign in with' /> */}
      <Stack>
        <Box>
          <CustomFormLabel htmlFor='username'>Your Name</CustomFormLabel>
          <CustomTextField
            label='Enter Your Name Here.....'
            id='username'
            value={username}
            name='Username'
            variant='outlined'
            fullWidth
            onChange={handleUsernameChange}
            autoComplete='off'
          />
        </Box>

        <Box>
          <CustomFormLabel htmlFor='password'>Your Password</CustomFormLabel>
          <CustomTextField
            label='Enter Your Password Here.....'
            id='password'
            name='Password'
            type='password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={handlePasswordChange}
          />
        </Box>

        <Stack
          justifyContent='space-between'
          direction='row'
          alignItems='center'
          my={2}
        >
          <FormGroup>
            <FormControlLabel
              control={<CustomCheckbox defaultChecked />}
              label='Remeber this Device'
            />
          </FormGroup>
        </Stack>
      </Stack>
      <Box>
        <Button
          color='secondary'
          variant='contained'
          size='large'
          fullWidth
          type='submit'
          onClick={handleLoginClick}
        >
          Log In
        </Button>
      </Box>
      <Typography
        fontWeight='700'
        variant='h2'
        mb={1}
        align='center'
        color='black'
      >
        Already a member login?
      </Typography>
    </>
  )
}

export default LoginForm

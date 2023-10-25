import { Routes, Route } from 'react-router-dom'

import UserList from './components/UserListPage'
import User from './components/UserPage'
import BlogList from './components/BlogListPage'
import Blog from './components/BlogPage'
import Menu from './components/Menu'
import Notification from './components/Notification'

import LoginModal from './components/Modal/LoginModal'
import { useLoginModal } from './contexts/LoginModalContext'

const App = () => {
  const { openLoginModal } = useLoginModal()

  console.log('openLoginModal', openLoginModal)

  return (
    <div>
      <Menu />

      <Notification />

      {/* {loggedInUser === null && (
        <Togglable buttonLabel='log in'>
          <LoginForm />
        </Togglable>
      )} */}
      {openLoginModal && <LoginModal />}

      <Routes>
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/users/:id' element={<User />} />
        <Route path='/users' element={<UserList />} />
        <Route path='/' element={<BlogList />} />
      </Routes>
    </div>
  )
}

export default App

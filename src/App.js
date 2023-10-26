import { Routes, Route } from 'react-router-dom'
import UserList from './components/UserListPage'
import User from './components/UserPage'
import BlogList from './components/BlogListPage'
import Blog from './components/BlogPage'
import Menu from './components/Menu'
import Notification from './components/Notification'
import LoginModal from './components/Modal/LoginModal'
import { useLoginModal } from './contexts/LoginModalContext'
import useBlogs from './hooks/useBlogs'
import AddNewBlogModal from './components/Modal/AddNewBlogModal'
import BlogForm from './components/BlogListPage/BlogForm'
import { useContext } from 'react'
import { UserContext } from './contexts/UserContext'

const App = () => {
  const { openLoginModal, openNewBlogModal } = useLoginModal()
  const [loggedInUser] = useContext(UserContext)
  const { createBlog } = useBlogs()

  return (
    <div>
      <Menu />

      <Notification />

    
      {openLoginModal && <LoginModal />}

      {loggedInUser !== null && openNewBlogModal && (
        <div>
          <AddNewBlogModal>
            <BlogForm createBlog={createBlog} />
          </AddNewBlogModal>
        </div>
      )}

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

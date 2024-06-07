import { Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import Home from './pages/Home.jsx'
import SignIn from './pages/SignIn.jsx'
import SignUp from './pages/SignUp.jsx'
import Posts from './pages/Posts.jsx'
import { AuthContextProvider } from './context/auth/auth.context.jsx'
import PostCreate from './pages/PostCreate.jsx'
import Post from './pages/Post.jsx'
import ConfirmAccount from './pages/ConfirmAccount.jsx'
import NotFound from './pages/NotFound.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <AuthContextProvider>
      <MainLayout>
        <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/posts' element={<Posts />} />
          <Route path='/posts/:id' element={<Post />} />
          <Route path='/posts/create' element={<PostCreate />} />
            <Route path='/confirm-account' element={<ConfirmAccount />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
          <ToastContainer
            position='top-right'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={true}
            pauseOnHover={true}
            draggable={true}
            progress={undefined}
            theme="light"
          />
        </>
      </MainLayout>

    </AuthContextProvider>
  )
}

export default App

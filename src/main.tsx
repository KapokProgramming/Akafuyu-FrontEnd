import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from 'react-query';
import './main.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './pages/Home/home'
import AddPost from './pages/AddPost/Post'
import Status from './pages/Status/Status'
import Posts from './pages/Posts/Posts'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PostPage from './pages/Post/Post';
import Profile from './pages/Profile/Profile';

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/posts" element = {<Posts />} />
          <Route path="/posts/:page" element={<Posts />}></Route>
          <Route path="/post/:id" element={<PostPage />} /> 
          <Route path="/add/post" element={<AddPost />}></Route>
          <Route path='/status' element={<Status />}></Route>

          <Route path='/login' element = {<Login />}></Route>
          <Route path='/register' element= {<Register/>} />
          <Route path='/profile/:id' element = {<Profile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
)

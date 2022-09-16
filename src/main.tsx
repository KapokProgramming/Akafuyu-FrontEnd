import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Post from './pages/Post/Post'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/post" element= {<Post />}></Route>
    </Routes>
  </BrowserRouter>
)

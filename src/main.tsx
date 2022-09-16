import React from 'react'
import ReactDOM from 'react-dom/client'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/home'
import Post from './pages/Post/Post'
import Status from './pages/Status/Status'
import { QueryClient, QueryClientProvider } from 'react-query';


const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/post" element={<Post />}></Route>
        <Route path='/status' element={<Status />}></Route>
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/home';
import { Post_details } from './components/Post_details';
import { Create_post } from './pages/Create_post';
import { Login } from './pages/login';
import { Register } from './pages/register';
import { useEffect, useState } from 'react';
import { MyPosts } from './pages/myPosts';


function App() {

  const [current_user, setCurrent_user] = useState()
  
  useEffect(() => {
        const res = localStorage.getItem("dablog_user")
        setCurrent_user(JSON.parse(res))
        
  }, [])
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/create-post' element={<Create_post />}/>
        <Route path='/post/:id' element={<Post_details />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/my-posts/:user_id' element={<MyPosts/>}/>
      </Routes>
    </BrowserRouter>

  );
}

export default App;

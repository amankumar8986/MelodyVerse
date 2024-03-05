import React from 'react';
import {Route, createBrowserRouter, createRoutesFromElements, RouterProvider, Outlet } from 'react-router-dom';
import Signup from './components/Signup';
import PostList from './components/PostList';

const Root = () => {
  return (
    <div>
      <Outlet />
    </div>
  )
}
const router = createBrowserRouter(createRoutesFromElements(<Route path='/' element={<Root />}>
  <Route path='/' element={<Signup />} />
  <Route path="/signup" element={<Signup />} />
  <Route path="/posts" element={<PostList />} />
</Route>));

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

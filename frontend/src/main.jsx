import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import SingUp from "./pages/SingUp.jsx"
import Login from "./pages/Login.jsx"
import {Provider } from "react-redux"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home.jsx'
import store from "./store/store.js"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                //<AuthLayout authentication={false}>
                    <Login />
               // </AuthLayout>
            ),
        },
        {
            path: "/signup",
            element: (
               // <AuthLayout authentication={false}>
                    <SingUp />
               // </AuthLayout>
            ),
        },
        // {
        //     path: "/all-posts",
        //     element: (
        //         <AuthLayout authentication>
        //             {" "}
        //             <AllPosts />
        //         </AuthLayout>
        //     ),
        // },
        // {
        //     path: "/add-post",
        //     element: (
        //         <AuthLayout authentication>
        //             {" "}
        //             <AddPost />
        //         </AuthLayout>
        //     ),
        // },
        // {
        //     path: "/edit-post/:slug",
        //     element: (
        //         <AuthLayout authentication>
        //             {" "}
        //             <EditPost />
        //         </AuthLayout>
        //     ),
        // },
        // {
        //     path: "/post/:slug",
        //     element: <Post />,
        // },
    ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} />
    <RouterProvider router={router} />
  </StrictMode>,
)



// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <Provider store={store}>
//     <RouterProvider router={router}/>
//     </Provider>
//   </React.StrictMode>,
// )
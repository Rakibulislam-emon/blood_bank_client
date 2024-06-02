import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Layouts/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />

            }
        ]
    },
    // dashboard
    {
         path:'dashboard',
         element:<Dashboard/>,
         children:[
            {
                path:'profile',
                element:<Profile/>
            }
         ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <SignUp/>}
])
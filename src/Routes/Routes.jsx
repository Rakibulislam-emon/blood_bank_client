import { createBrowserRouter } from "react-router-dom";
import Main from "../Layouts/Main";
import Home from "../Layouts/Home";
import Login from "../Authentication/Login/Login";
import SignUp from "../Authentication/SignUp/SignUp";
import Dashboard from "../Pages/Dashboard/Dashboard/Dashboard";
import Profile from "../Pages/Dashboard/Profile/Profile";
import DashboardHome from "../Pages/Dashboard/Greetings/DashboardHome/DashboardHome";
import CreateDonationRequest from "../Pages/Dashboard/Doner/CreateDonationRequest/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/Doner/MyDonationRequests/MyDonationRequests";
import DonerRequestEdit from "../Pages/Dashboard/Doner/DonerHomePage/DonerRequestEdit/DonerRequestEdit";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers/AllUsers";
import ContentManageMent from "../Pages/Dashboard/Admin/ContentManageMent/ContentManageMent";
import BlogDetails from "../Pages/Dashboard/Admin/ContentManageMent/BlogDetails/BlogDetails";
import AddBlogs from "../Pages/Dashboard/Admin/ContentManageMent/AddBlogs/AddBlogs";
import AllBloodDonationRequest from "../Pages/Dashboard/Admin/AllBloodDonationRequest/AllBloodDonationRequest";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import DonationRequestsDetails from "../Pages/DonationRequests/DonationRequestsDetails";
import AllBlogs from "../Pages/AllBlogs/AllBlogs";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'donation-requests',
                element:<DonationRequests/>
            },
            {
                path:'donation-requests-detail/:id',
                element: <DonationRequestsDetails/>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/usersBloodRequests/${params.id}`)
            },
            {
                path:'/all-blogs',
                element: <AllBlogs/>,
            },
            {
                path: '/blogDetails/:id',
                element:<BlogDetails/>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/getBlogs/${params.id}`)
                
            },
        ]
    },
    // dashboard
    {
        path: 'dashboard',
        element: <Dashboard />,
        children: [
            {
                path: '',
                element: <DashboardHome />
            },
          
            {
                path: 'profile',
                element: <Profile />
            },
            // users links
            {
                path: 'create-donation-request',
                element: <CreateDonationRequest />
            },
            {
                path: 'my-donation-requests',
                element: <MyDonationRequests />
            },
            {
                path: 'edit/:id',
                element: <DonerRequestEdit />,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/edit/${params.id}`)
            },
            // admin links
            {
                path: 'all-users',
                element: <AllUsers />
            },
            {
                path:'content-management',
                element:<ContentManageMent/>
            },
            // problem links
           
            {
                path: 'add-blog',
                element:<AddBlogs/>
            },
            {
                path:'all-blood-donation-request',
                element:<AllBloodDonationRequest/>
            }
          
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <SignUp /> }
])
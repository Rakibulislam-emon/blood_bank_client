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
import SearchDonor from "../Pages/Home/SearchDonor/SearchDonor";
import NotFound from "../Components/Shared/NotFound/NotFound";
import FoundingPage from "../Pages/FoundingPage/FoundingPage";
import Payment from "../Pages/FoundingPage/Payment/Payment";
import PrivateRoute from "./PrivateRoute";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement:<NotFound/>,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path:'/search-donor',
                element:<PrivateRoute><SearchDonor/></PrivateRoute>
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
            {
                path:'/funding',
                element: <FoundingPage/>
            },
            {
                path: '/payment',
                element: <PrivateRoute><Payment/></PrivateRoute>
            }
        ]
    },
    // dashboard
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: '',
                element: <PrivateRoute><DashboardHome /></PrivateRoute>
            },
          
            {
                path: 'profile',
                element:<PrivateRoute> <Profile /></PrivateRoute>
            },
            // users links
            {
                path: 'create-donation-request',
                element: <PrivateRoute><CreateDonationRequest /></PrivateRoute>
            },
            {
                path: 'my-donation-requests',
                element: <PrivateRoute><MyDonationRequests /></PrivateRoute>
            },
            {
                path: 'edit/:id',
                element: <PrivateRoute><DonerRequestEdit /></PrivateRoute>,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_URL}/edit/${params.id}`)
            },
            // admin links
            {
                path: 'all-users',
                element:<PrivateRoute> <AllUsers /></PrivateRoute>
            },
            {
                path:'content-management',
                element:<PrivateRoute><ContentManageMent/></PrivateRoute>
            },
            {
                path: 'add-blog',
                element:<PrivateRoute><AddBlogs/></PrivateRoute>
            },
            {
                path:'all-blood-donation-request',
                element:<PrivateRoute><AllBloodDonationRequest/></PrivateRoute>
            }
          
        ]
    },
    { path: '/login', element: <Login /> },
    { path: '/register', element: <SignUp /> }
])
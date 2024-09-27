import useGetAllUsersRole from "../../../../Hooks/useGetAllUsersRole";
import AdminHomePage from "../../Admin/AdminHomePage/AdminHomePage";
import DonerHomePage from "../../Doner/DonerHomePage/DonerHomePage";
// import Greetings from "../Greetings";


const DashboardHome = () => {
    const [role] = useGetAllUsersRole()
    
    return (
        <div className=" ">
            {/* <Greetings /> */}
            {/* users homePage */}
            {role === 'donor' && <DonerHomePage />}

            {/* admins HomePage */}
           
            {role === 'admin' && <AdminHomePage/>}
            { role === 'volunteer' && <AdminHomePage />}
        </div>
    );
};

export default DashboardHome;
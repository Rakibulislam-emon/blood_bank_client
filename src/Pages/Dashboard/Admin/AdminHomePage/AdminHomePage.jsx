import useAuth from "../../../../Hooks/useAuth";
import useGetAllUsersRole from "../../../../Hooks/useGetAllUsersRole";
import AdminsHomePage from "../AdminsHomePage/AdminsHomePage";

const AdminHomePage = () => {
    const { user } = useAuth();
    const [role] = useGetAllUsersRole()
    console.log('role:', role)
    return (
        <div className=" min-h-screen">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-40 flex flex-col items-center justify-center shadow-lg rounded-lg p-4">
                <div className="text-center text-white">
                    <h3 className="text-4xl font-bold">Welcome, {user?.displayName}!</h3>
                    <p className="text-lg">Welcome back, {role}! Manage your tasks efficiently and keep the platform running smoothly.</p>
                </div>
            </div>
            <div className="container mx-auto py-8">
                <AdminsHomePage />
            </div>
        </div>
    );
};

export default AdminHomePage;

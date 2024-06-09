import useAuth from "../../../../Hooks/useAuth";
import AdminsHomePage from "../AdminsHomePage/AdminsHomePage";

const AdminHomePage = () => {
    const { user } = useAuth();

    return (
        <div className=" min-h-screen">
            <div className="bg-blue-500 h-40 flex items-center justify-center">
                <h3 className="text-4xl text-white">Welcome, {user?.displayName}!</h3>
            </div>
            <div className="container mx-auto py-8">
                <AdminsHomePage />
            </div>
        </div>
    );
};

export default AdminHomePage;

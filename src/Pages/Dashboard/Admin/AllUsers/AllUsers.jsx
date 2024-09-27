import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaUserShield, FaUserCheck, FaLock, FaUnlock } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from 'sweetalert2';
// import useGetAllUsersRole from "../../../../Hooks/useGetAllUsersRole";
import { Helmet } from "react-helmet-async";
const AllUsers = () => {
    // const [role] = useGetAllUsersRole()
    // console.log('role:', role)
    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get('/allUsers');
            return res.data;
        },
    });

    const handleBlockUnblock = async (userId, status) => {
        const newStatus = status === 'active' ? 'blocked' : 'active';
        await axiosSecure.patch(`userStatus/${userId}`, { status: newStatus });
        refetch();
    };

    const handleRoleChange = async (userId, newRole) => {
        console.log('newRole:', newRole)
        console.log(userId);


        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "promote!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`userRole/${userId}`, { role: newRole })
                    .then((response) => {
                        console.log(response.data);
                        if (response.data.modifiedCount === 0) {
                            toast.error('cant be the same role updated')
                        }
                        if (response.data.modifiedCount > 0) {

                            Swal.fire({
                                title: "promoted successfully",
                                text: " ",
                                icon: "success"
                            });
                            refetch();
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an error deleting your file.",
                            icon: "error"
                        });
                    });
            }
        });


        //    const res = await axiosSecure.patch(`userRole/${userId}`, { role: newRole });
        //    console.log(res.data);
        //    if(res.data.modifiedCount > 0){
        //     toast.success('promoted  successfully')
        //    }
        //     refetch();
    };
    // console.log(users);
    if (isLoading) {
        return <h1 className="text-center">Loading...</h1>
    }
    return (
        <div className="">
            <Helmet title="all-users" />
            <h1 className="text-3xl ml-10">All Users ({users.length})</h1>
            <div className="overflow-x-auto">
                <table className="table w-full text-center text-md md:text-xl bg-white shadow-md rounded-lg">
                    <thead className="bg-gray-200 text-xl font-bold">
                        <tr>
                            <th className="px-4 py-2">Avatar</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} className="hover:bg-gray-50">
                                <td className="px-4 py-2">
                                    <div className="flex items-center gap-3 text-sm">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={user.image} alt="User Avatar" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.role}</td>
                                <td className="px-4 py-2">{user.status}</td>
                                <td className="px-4 py-2">
                                    {user.status === 'active' ? (
                                        <button
                                            disabled={user.role === 'admin'}
                                            onClick={() => handleBlockUnblock(user._id, user.status)}
                                            className="btn btn-ghost btn-xs h-10 bg-red-500 text-white    mr-2"
                                        >
                                            <FaLock />
                                            block
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleBlockUnblock(user._id, user.status)}
                                            className="btn btn-ghost btn-xs bg-green-500 text-white h-10 p-2 mr-2"
                                        >
                                            <FaUnlock />
                                            UnBlock
                                        </button>
                                    )}
                                    <button
                                        disabled={user.role === 'admin'}
                                        onClick={() => handleRoleChange(user._id, 'volunteer')}
                                        className="btn btn-ghost btn-xs bg-blue-500 text-white h-10  my-4  mr-2"
                                    >
                                        <FaUserCheck />
                                        volunteer
                                    </button>
                                    <button
                                        disabled={user.role === 'admin'}
                                        onClick={() => handleRoleChange(user._id, 'admin')}
                                        className="btn btn-ghost btn-xs bg-purple-500 text-white h-10  p-2"
                                    >
                                        <FaUserShield />
                                        Admin
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;

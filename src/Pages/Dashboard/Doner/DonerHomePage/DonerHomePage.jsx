/* eslint-disable react/no-unescaped-entities */
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
// import { CiViewList } from "react-icons/ci";
import Swal from 'sweetalert2';
// import useRole from "../../../../Hooks/useRole";

const DonerHomePage = () => {
    // const [status] = useRole();
   

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: data = [], refetch, isLoading } = useQuery({
        queryKey: ['myDonationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBloodRequests/${user?.email}`);
          
            if (!res.data) {
                <span className="loading loading-spinner loading-lg"></span>;
            }
            // Sort the data by formattedDateTime in descending order and limit to the 3 most recent entries
            return res.data.sort((a, b) => new Date(b.formattedDateTime) - new Date(a.formattedDateTime)).slice(0, 3);
        },
        enabled: !!user?.email
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`${import.meta.env.VITE_API_URL}/bloodRequestsDelete/${id}`)
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success"
                        });
                        refetch();
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
    };
    const handleStatusUpdate = async (id, status) => {
        console.log(id, status)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${status} `
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/updateStatus/${id}`, {
                    status: status
                })
                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({
                            title: `${status}`,
                            text: `Your request  has ${status}.`,
                            icon: "success"
                        });
                        refetch();
                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: `There was an error to ${status}.`,
                            icon: "error"
                        });
                    });
            }
        });



    }

    if (isLoading) {
        return <span className="loading flex h-screen left-0 loading-spinner loading-lg"></span>;
    }

    return (
        <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6  lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 h-40 flex flex-col items-center justify-center shadow-lg rounded-lg p-4">
                <h3 className="text-4xl text-white font-bold">
                    Welcome, {user?.displayName}!
                </h3>
                <p className="text-lg text-white mt-2">
                    We're glad to have you back. Dive into your dashboard to manage your activities and explore new features.
                </p>
                <p className="text-sm text-white italic mt-1">
                    "The best way to find yourself is to lose yourself in the service of others." - 
                </p>
            </div>                   
                     <div className="overflow-x-auto">

                        <table className="min-w-full  font-bold text-start text-sm  text-surface">
                            <thead className="border-b text-center bg-black text-white border-neutral-200 font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Recipient name</th>
                                    <th scope="col" className="px-6 py-4">Recipient location</th>
                                    <th scope="col" className="px-6 py-4">Donation date</th>
                                    <th scope="col" className="px-6 py-4">Donation time</th>
                                    <th scope="col" className="px-6 py-4">Donation status</th>
                                    <th scope="col" className="px-6 py-4">Donor information</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4 ">action</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4"></th>


                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {data.map((item, index) => (
                                    <tr key={item._id} className="border-b border-neutral-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.recipientName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.district} <br /> {item?.upazila}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.requestedData}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.requestedData} <br /> {item?.requestedTime}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.requesterName} <br /> {item?.requesterEmail}</td>



                                        {/* condition used by status */}
                                        {item?.status !== 'pending' ? <>
                                            <td>
                                                <button

                                                    onClick={() => handleStatusUpdate(item?._id, 'done')} className="py-3 px-6 text-white rounded-lg bg-green-500 shadow-lg block md:inline-block  "
                                                    disabled={item?.status !== 'inProgress'}

                                                >done
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleStatusUpdate(item?._id, 'canceled')}
                                                    className="py-3 px-6 text-white rounded-lg bg-[#2a2a4c] shadow-lg block md:inline-block  "
                                                    disabled={item?.status !== 'inProgress'}

                                                >cancel
                                                </button>
                                            </td>
                                        </> : <>
                                            {/* <td className="whitespace-nowrap px-6 py-4">
                                                <button

                                                    className=' p-3  text-white rounded-lg bg-violet-500 shadow-lg block md:inline-block  '>viewDetails
                                                    <CiViewList className="text-center w-full" size={20} />
                                                </button>
                                            </td> */}
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Link to={`/dashboard/edit/${item?._id}`}>
                                                    <button className="py-3 px-6 text-white rounded-lg bg-green-500 shadow-lg block md:inline-block  ">Edit
                                                        <TbEdit size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button onClick={() => handleDelete(item?._id)} className="py-3 px-6 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block  ">Delete
                                                    <MdDelete className="ml-2" size={20} />
                                                </button>
                                            </td>
                                        </>}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="border  ">
                {/* view all button */}
                <Link to={'my-donation-requests'} className="btn border flex  mx-auto font-bold   lg:btn-wide">View All</Link>
            </div>
        </div>
    );
};

export default DonerHomePage;


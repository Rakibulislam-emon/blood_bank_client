import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
// import { CiViewList } from "react-icons/ci";
import Swal from 'sweetalert2';
import useRole from "../../../../Hooks/useRole";

const MyDonationRequests = () => {
    const [status] = useRole();
    console.log('status:', status);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: data = [], refetch, isLoading } = useQuery({
        queryKey: ['myDonationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBloodRequests/${user?.email}`);
            return res.data
        },
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




        //   const result = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/updateStatus/${id}`, {
        //     status: status
        // })
        // if (result.data.modifiedCount > 0) {
        //     toast.success('confirmed')
        // }
        // console.log(result.data);

    }

    if (isLoading) {
        return <span className="loading flex left-0 loading-spinner loading-lg"> </span>;
    }
    if (data.length === 0) {
        return <span className="loading" />
    }
    console.log(data);
    return (
        <div className="flex flex-col overflow-x-auto">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-start text-sm font-bold text-surface">
                            <thead className="border-b border-neutral-200 font-medium">
                                <tr className="bg-black text-white">
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Recipient name</th>
                                    <th scope="col" className="px-6 py-4">Recipient location</th>
                                    <th scope="col" className="px-6 py-4">Donation date</th>
                                    <th scope="col" className="px-6 py-4">Donation time</th>
                                    <th scope="col" className="px-6 py-4">Donation status</th>
                                    <th scope="col" className="px-6 py-4">Donor information</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
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
        </div>
    );
};

export default MyDonationRequests;
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
// import { CiViewList } from "react-icons/ci";
import Swal from 'sweetalert2';
// import useRole from "../../../../Hooks/useRole";
// import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useGetAllUsersRole from "../../../../Hooks/useGetAllUsersRole";
import toast from "react-hot-toast";
import { useState } from "react";
// import toast from "react-hot-toast";


const AllBloodDonationRequest = () => {
    const [filter,setFilter ] = useState()
    const [role] = useGetAllUsersRole()
    console.log('role:', role)
    // const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: data = [], refetch, isLoading } = useQuery({
        queryKey: ['allRequestedBlood'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bloodRequests`);
            return res.data
        },
    });
    console.log(data.length);
    const handleDelete = (id) => {
        if (role === 'volunteer') {
            return toast.error('only admin have the access to the do this action')
        }
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
    // check user role for redirect to edit page 
    const handleCheck = () => {
        if (role === 'volunteer') {
            return toast.error('only admin have the access to the do this action')
        }
    }

    // update status of bloodRequests collection

    const handleStatusUpdate = async (id, status) => {

        console.log(id, status)
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/updateStatus/${id}`, {
                    status: status
                })
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




        //   const result = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/updateStatus/${id}`, {
        //     status: status
        // })
        // if (result.data.modifiedCount > 0) {
        //     toast.success('confirmed')
        // }
        // console.log(result.data);

    }



    if (isLoading) {
        return <span className="loading flex left-0 loading-spinner loading-lg"></span>;
    }
    if (data.length === 0) {
        return <span className="loading" />
    }
    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };
    const filteredData = data.filter((item) => {
        if (filter === 'pending') {
            return item.status === 'pending';
        } else if (filter === 'inProgress'){
             return item.status === 'inProgress';
        }  else if (filter === 'canceled'){
             return item.status === 'canceled';
        } else if (filter === 'done'){
            return item.status === 'done'
        } else{
            return item
        }
    })
    console.log(filteredData);
 
    return (
        <div className="flex flex-col overflow-x-auto">
           <div className="flex justify-end">
           <div >
                <span>Sort by</span>
                <select
                    onChange={handleFilterChange}
                    name="" className="border-red-500 p-4 border-4 mx-4">
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="inProgress">Inprogress</option>
                    <option value="canceled">Canceled</option>
                    <option value="done">Done</option>
                </select>
            </div>
           </div>
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
                                    <th scope="col" className="px-6 py-4"></th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                    <th scope="col" className="px-6 py-4"></th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {filteredData.map((item, index) => (
                                    <tr key={item._id} className="border-b border-neutral-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item?.recipientName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.district} <br /> {item.upazila}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requestedData}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requestedData} <br /> {item.requestedTime}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requesterName} <br /> {item.requesterEmail}</td>
                                        {/* condition used by status */}
                                        {item.status === 'inProgress' ? <>
                                            <td>

                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleStatusUpdate(item._id, 'done')} className="py-3 px-6 text-white rounded-lg bg-green-500 shadow-lg block md:inline-block  ">done
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleStatusUpdate(item._id, 'canceled')}
                                                    className="py-3 px-6 text-white rounded-lg bg-[#2a2a4c] shadow-lg block md:inline-block  ">cancel
                                                </button>
                                            </td>
                                        </> : <>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                {/* <button
                                           
                                                className=' p-3  text-white rounded-lg bg-violet-500 shadow-lg block md:inline-block  '>viewDetails
                                                    <CiViewList className="text-center w-full" size={20} />
                                                </button> */}
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <Link
                                                    onClick={handleCheck}
                                                    to={role !== 'volunteer' ? `/dashboard/edit/${item._id}` : undefined}>
                                                    <button className="py-3 px-6 text-white rounded-lg bg-green-500 shadow-lg block md:inline-block  ">Edit
                                                        <TbEdit size={20} />
                                                    </button>
                                                </Link>
                                            </td>
                                            <td className="whitespace-nowrap px-6 py-4">
                                                <button onClick={() => handleDelete(item._id)} className="py-3 px-6 text-white rounded-lg bg-red-500 shadow-lg block md:inline-block  ">Delete
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

export default AllBloodDonationRequest;
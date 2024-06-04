import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import Swal from 'sweetalert2';
import useRole from "../../../../Hooks/useRole";

const DonerHomePage = () => {
    const [status] = useRole();
    console.log('status:', status);

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: data = [], refetch, isLoading } = useQuery({
        queryKey: ['myDonationRequests'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBloodRequests/${user?.email}`);
            console.log(res.data);
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

    if (isLoading) {
        return <span className="loading flex left-0 loading-spinner loading-lg"></span>;
    }

    return (
        <div className="flex flex-col overflow-x-auto">
            {data?.length}
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-start text-sm font-light text-surface">
                            <thead className="border-b border-neutral-200 font-medium">
                                <tr>
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
                                {data.map((item, index) => (
                                    <tr key={item._id} className="border-b border-neutral-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.recipientName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.district} <br /> {item.upazila}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requestedData}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requestedData} <br /> {item.requestedTime}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.status}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requesterName} <br /> {item.requesterEmail}</td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button>viewDetails
                                                <CiViewList className="text-center w-full" size={20} />
                                            </button>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <Link to={`edit/${item._id}`}>
                                                <button className="Btn">Edit
                                                    <TbEdit size={20} />
                                                </button>
                                            </Link>
                                        </td>
                                        <td className="whitespace-nowrap px-6 py-4">
                                            <button onClick={() => handleDelete(item._id)} className="Btn">Delete
                                                <MdDelete size={20} />
                                            </button>
                                        </td>
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

export default DonerHomePage;

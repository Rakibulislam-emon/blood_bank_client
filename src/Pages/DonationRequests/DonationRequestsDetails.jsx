import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
// import DonateModal from "./DonateModal";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from 'sweetalert2';
import useAuth from "../../Hooks/useAuth";
// import useAxiosSecure from "../../Hooks/useAxiosSecure";
// import useAuth from "../../Hooks/useAuth";
// import { useState } from "react";

const DonationRequestsDetails = () => {
    // const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const [disabledButtons, setDisabledButtons] = useState({});
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const data = useLoaderData()
    console.log('data:', data)
    const donorInfo = {
        donorEmail: user?.email,
        donorName: user?.displayName
    }
    // console.log(donorInfo);
    const handleDonate = async (id, status) => {
        console.log(id, status)

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, donate! `
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/usersBloodRequests/${id}`, {
                    status: status,
                    donorInfo: donorInfo
                })

                    .then((response) => {
                        console.log(response.data);
                        Swal.fire({

                            title: `donation in progress`,
                            text: `Your donation  is ${status}.`,
                            icon: "success"

                        })
                        navigate('/donation-requests')
                        setDisabledButtons(prevState => ({
                            ...prevState,
                            [id]: true
                        }))

                    })
                    .catch((error) => {
                        console.error(error);
                        Swal.fire({
                            title: "Error!",
                            text: `There was an error to donation.`,
                            icon: "error"
                        });
                    });
            }
        });

    }


    return (
        <div className="flex flex-col overflow-x-auto ">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-start text-sm font-bold text-surface">
                            <thead className="border-b border-neutral-200 font-medium">
                                <tr className="bg-black text-white">
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Recipient name</th>
                                    <th scope="col" className="px-6 py-4">Recipient location</th>
                                    <th scope="col" className="px-6 py-4"> Hospital Name</th>
                                    <th scope="col" className="px-6 py-4">Donation date</th>
                                    <th scope="col" className="px-6 py-4">Donation time</th>
                                    <th scope="col" className="px-6 py-4">Donation status</th>
                                    <th scope="col" className="px-6 py-4">Requester information</th>
                                    <th scope="col" className="px-6 py-4">Requested Message</th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-center">
                                {data
                                    .map((item, index) => (
                                        <tr key={item._id} className="border-b border-neutral-200">
                                            <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.recipientName}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.district} <br /> {item?.upazila}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.hospitalName}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.requestedData} </td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.requestedTime} </td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.status}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.requesterName} <br /> {item?.requesterEmail}</td>
                                            <td className="whitespace-nowrap px-6 py-4">{item?.requestedMessage}</td>
                                            {/* condition used by status */}
                                            <td>
                                                <button
                                                    disabled={disabledButtons[item._id] || user?.email === item?.requesterEmail}
                                                    onClick={() => handleDonate(item._id, 'inProgress')} className="p-3 text-white rounded-lg bg-violet-500 shadow-lg inline-flex items-center justify-center">donate</button>
                                                {/* <button
                                                    onClick={() => setShowModal(true)}
                                                    className="p-3 text-white rounded-lg bg-violet-500 shadow-lg inline-flex items-center justify-center">donate</button> */}
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                        {/* { showModal &&
                            <DonateModal data={data} donorInfo={donorInfo} handleDonate={handleDonate}  onClose={()=>setShowModal(false)}/>
                        } */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationRequestsDetails;
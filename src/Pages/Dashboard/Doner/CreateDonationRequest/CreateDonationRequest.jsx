import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";
import useUserStatus from "../../../../Hooks/useUserStatus";
import { useEffect, useState } from "react";
import bloodBg from '../../../../assets/images/bloodbg.jpg';

const CreateDonationRequest = () => {
    const [sortedUpazila, setSortedUpazila] = useState();
    const [status] = useUserStatus();
    const blockedUserCheck = status;
    const { user } = useAuth();
    const axiosCommon = useAxiosCommon();

    // Get divisions data
    const { data: divisions = [] } = useQuery({
        queryKey: ['divisions'],
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/divisions`);
            return res.data;
        },
    });

    // Get upazilas data
    const { data: upozilas = [] } = useQuery({
        queryKey: ['upozilas'],
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/upozila`);
            return res.data;
        },
    });

    // Sorted upazilas
    useEffect(() => {
        const sorted = [...upozilas].sort((a, b) => a.name.localeCompare(b.name));
        setSortedUpazila(sorted);
    }, [upozilas]);

    // Form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const bloodRequestInfo = {
            requesterName: form.requesterName.value,
            requesterEmail: form.email.value,
            recipientName: form.recipientName.value,
            district: form.district.value,
            upazila: form.upazila.value,
            hospitalName: form.hospitalName.value,
            bloodGroup: form.bloodGroup.value,
            fullAddress: form.fullAddress.value,
            requestedData: form.date.value,
            requestedTime: form.time.value,
            requestedMessage: form.message.value,
            status: 'pending',
            formattedDateTime: new Date().toISOString(),
        };

        try {
            if (blockedUserCheck === 'blocked') {
                return toast.error('You have been blocked');
            }
            const res = await axiosCommon.post(`/bloodRequests/${user?.email}`, bloodRequestInfo);
            console.log(res.data);
            form.reset();
            toast.success('Request successful');
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="flex items-center justify-center p-6"
            style={{
                // background image 
                backgroundImage: `url(${bloodBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'scroll',
                minHeight: '100vh',
                color: 'white',
                fontFamily: 'Poppins, sans-serif'
            }}>
            <div className="mx-auto w-full max-w-lg rounded-2xl shadow-lg" style={{ background: 'linear-gradient(to right, #667eea, #764ba2)' }}>
                <h1 className="text-2xl font-bold text-center text-white mb-8">Blood Donation Request Form</h1>
                <form className="p-8 bg-white rounded-lg" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="mb-5">
                            <label htmlFor="requesterName" className="block text-base font-medium text-gray-700 mb-2">Requester Name</label>
                            <input
                                required
                                type="text"
                                name="requesterName"
                                id="requesterName"
                                placeholder="Your Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="recipientName" className="block text-base font-medium text-gray-700 mb-2">Recipient Name</label>
                            <input
                                required
                                type="text"
                                name="recipientName"
                                id="recipientName"
                                placeholder="Recipient Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="district" className="block text-base font-medium text-gray-700 mb-2">District</label>
                            <select
                                name="district"
                                id="district"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option>Select your division</option>
                                {divisions && divisions.map((division) => (
                                    <option key={division._id} value={division.name}>{division.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="upazila" className="block text-base font-medium text-gray-700 mb-2">Upazila</label>
                            <select
                                name="upazila"
                                id="upazila"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                {sortedUpazila && sortedUpazila.map((upozila) => (
                                    <option key={upozila._id} value={upozila.name}>{upozila.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="hospitalName" className="block text-base font-medium text-gray-700 mb-2">Hospital Name</label>
                            <input
                                required
                                type="text"
                                name="hospitalName"
                                id="hospitalName"
                                placeholder="Hospital Name"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="bloodGroup" className="block text-base font-medium text-gray-700 mb-2">Blood Group</label>
                            <select
                                name="bloodGroup"
                                required
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                <option value="">Select blood group</option>
                                <option value="A+">A+</option>
                                <option value="A-">A-</option>
                                <option value="B+">B+</option>
                                <option value="B-">B-</option>
                                <option value="AB+">AB+</option>
                                <option value="AB-">AB-</option>
                                <option value="O+">O+</option>
                                <option value="O-">O-</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="fullAddress" className="block text-base font-medium text-gray-700 mb-2">Full Address</label>
                            <input
                                required
                                type="text"
                                name="fullAddress"
                                id="fullAddress"
                                placeholder="Please kindly give your Full Address"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2 mb-5">
                            <label htmlFor="date" className="block text-base font-medium text-gray-700 mb-2">Date</label>
                            <input
                                required
                                type="date"
                                name="date"
                                id="date"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                        <div className="w-full px-3 sm:w-1/2 mb-5">
                            <label htmlFor="time" className="block text-base font-medium text-gray-700 mb-2">Time</label>
                            <input
                                required
                                type="time"
                                name="time"
                                id="time"
                                className="w-full rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="message" className="block text-base font-medium text-gray-700 mb-2">Message</label>
                        <textarea
                            name="message"
                            id="message"
                            placeholder="Your Message"
                            className="w-full h-24 rounded-md border border-gray-300 bg-white py-3 px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md bg-indigo-600 py-3 px-4 font-semibold text-white transition duration-200 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Submit Request
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;

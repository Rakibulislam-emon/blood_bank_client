
import toast from "react-hot-toast";
import useAuth from "../../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useLoaderData } from "react-router-dom";
const DonerRequestEdit = () => {
    const userInfo = useLoaderData()

    console.log(userInfo);
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    // get divisions data
    const { data: divisions = [], } = useQuery({
        queryKey: ['divisions'],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/divisions`);
            return res.data;
        },
    });
    console.log(divisions);
    // get upozilas data
    const { data: upozilas = [] } = useQuery({
        queryKey: ['upozilas'],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/upozila`);
            return res.data;
        },
    })
    console.log(upozilas);
    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const requesterName = form.requesterName.value
        const requesterEmail = form.email.value
        const recipientName = form.recipientName.value
        const district = form.district.value
        const upazila = form.upazila.value
        const hospitalName = form.hospitalName.value
        const bloodGroup = form.bloodGroup.value
        const fullAddress = form.fullAddress.value
        const requestedData = form.date.value
        const requestedTime = form.time.value
        const requestedMessage = form.message.value

        console.table(requesterName, requesterEmail, recipientName, district, upazila, hospitalName, bloodGroup, fullAddress, requestedData, requestedTime, requestedMessage,)
        const bloodRequestInfo = {
            requesterName,
            requesterEmail,
            recipientName,
            district,
            upazila,
            hospitalName,
            bloodGroup,
            fullAddress,
            requestedData,
            requestedTime,
            requestedMessage,

        }
        try {
            const res = await axiosSecure.put(`/bloodRequests-edit/${userInfo._id}`, bloodRequestInfo)
            console.log(res.data);
            form.reset()
            toast.success('Edited successful')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }
    return (
        
            <div className="flex items-center justify-center p-12">
                <div className="mx-auto w-full max-w-[550px] bg-white">
                    {<form onSubmit={handleSubmit}>
                        <div className="mb-5">
                            <label htmlFor="requesterName" className="mb-3 block text-base font-medium text-[#07074D]">
                                Requester Name
                            </label>
                            <input
                                type="text"
                                name="requesterName"
                                id="requesterName"
                                placeholder="Your Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={user?.displayName}
                                readOnly
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Your Email"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base 
                            font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={user?.email}
                                readOnly
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="recipientName" className="mb-3 block text-base font-medium text-[#07074D]">
                                Recipient Name
                            </label>
                            <input
                                defaultValue={userInfo.recipientName}
                                type="text"
                                name="recipientName"
                                id="recipientName"
                                placeholder="Recipient Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="district" className="mb-3 block text-base font-medium text-[#07074D]">
                                District
                            </label>
                            <select

                                name="district"
                                id="district"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

                            >
                                {/* Add district options here */}
                                {
                                    divisions && divisions.map((division) => {
                                        return (
                                            <option key={division._id} value={division.name}>
                                                {division.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="upazila" className="mb-3 block text-base font-medium text-[#07074D]">
                                Upazila
                            </label>
                            <select
                                name="upazila"
                                id="upazila"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={userInfo.upazila}
                            >
                                {/* Add upazila options here */}
                                {
                                    upozilas && upozilas.map((upozila) => {
                                        return (
                                            <option key={upozila._id} value={upozila.name}>
                                                {upozila.name}
                                            </option>
                                        );
                                    })
                                }
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="hospitalName" className="mb-3 block text-base font-medium text-[#07074D]">
                                Hospital Name
                            </label>
                            <input
                                defaultValue={userInfo.hospitalName}
                                type="text"
                                name="hospitalName"
                                id="hospitalName"
                                placeholder="Hospital Name"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                            />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="bloodGroup" className="mb-3 block text-base font-medium text-[#07074D]">
                                Blood Group
                            </label>
                            <select
                                name="bloodGroup"
                                required
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"

                            >
                                <option value="" disabled selected>Select blood group</option>
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
                            <label htmlFor="fullAddress" className="mb-3 block text-base font-medium text-[#07074D]">
                                Full Address
                            </label>
                            <input
                                type="text"
                                name="fullAddress"
                                id="fullAddress"
                                placeholder="Please kindly give your Full Address"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={userInfo.fullAddress}
                            />
                        </div>
                        <div className="-mx-3 flex flex-wrap">
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        name="date"
                                        id="date"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        defaultValue={userInfo.requestedData}

                                    />
                                </div>
                            </div>
                            <div className="w-full px-3 sm:w-1/2">
                                <div className="mb-5">
                                    <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Time
                                    </label>
                                    <input
                                        type="time"
                                        name="time"
                                        id="time"
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                        defaultValue={userInfo.requestedTime}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="message" className="mb-3 block text-base font-medium text-[#07074D]">
                                Request Message
                            </label>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Your message"
                                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                defaultValue={userInfo.requestedMessage}

                            ></textarea>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>}
                </div>
            </div>
    );
};

export default DonerRequestEdit;
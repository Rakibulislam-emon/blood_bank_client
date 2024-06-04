import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../../Hooks/useAxiosCommon";
import useAuth from "../../../../Hooks/useAuth";
import toast from "react-hot-toast";

const CreateDonationRequest = () => {
    const { user } = useAuth()
    const axiosCommon = useAxiosCommon()
    // get divisions data
    const { data: divisions = [], } = useQuery({
        queryKey: 'divisions',
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/divisions`);
            return res.data;
        },
    });
    console.log(divisions);
    // get upozilas data
    const { data: upozilas = [] } = useQuery({
        queryKey: 'upozilas',
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/upozila`);
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
        const status = 'pending'
        const today = new Date();

        // Get the year, month, and day
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
        const day = String(today.getDate()).padStart(2, '0'); // Add leading zero if needed

        // Get the hours, minutes, and seconds
        const hours = String(today.getHours()).padStart(2, '0'); // Add leading zero if needed
        const minutes = String(today.getMinutes()).padStart(2, '0'); // Add leading zero if needed
        const seconds = String(today.getSeconds()).padStart(2, '0'); // Add leading zero if needed

        // Format the date and time
        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        console.log(formattedDateTime)
        console.table(requesterName, requesterEmail, recipientName, district, upazila, hospitalName, bloodGroup, fullAddress, requestedData, requestedTime, requestedMessage, status)
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
            status,
            formattedDateTime
        }
        try {
            const res = await axiosCommon.post('/bloodRequests', bloodRequestInfo)
            console.log(res.data);
            form.reset()
            toast.success('Requested successful')
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong')
        }

    }

    return (
        <div className="flex items-center justify-center p-12">
            <div className="mx-auto w-full max-w-[550px] bg-white">
                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <label htmlFor="requesterName" className="mb-3 block text-base font-medium text-[#07074D]">
                            Requester Name
                        </label>
                        <input
                            required
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
                            required
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
                            required
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
                            <option>Select your division</option>
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
                            required
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
                        <label htmlFor="fullAddress" className="mb-3 block text-base font-medium text-[#07074D]">
                            Full Address
                        </label>
                        <input
                            required
                            type="text"
                            name="fullAddress"
                            id="fullAddress"
                            placeholder="Please kindly give your Full Address"
                            className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                        />
                    </div>
                    <div className="-mx-3 flex flex-wrap">
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Date
                                </label>
                                <input
                                    required
                                    type="date"
                                    name="date"
                                    id="date"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                />
                            </div>
                        </div>
                        <div className="w-full px-3 sm:w-1/2">
                            <div className="mb-5">
                                <label htmlFor="time" className="mb-3 block text-base font-medium text-[#07074D]">
                                    Time
                                </label>
                                <input
                                    required
                                    type="time"
                                    name="time"
                                    id="time"
                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
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
                        ></textarea>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                        >
                            Request
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateDonationRequest;

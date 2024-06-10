import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { CiViewList } from "react-icons/ci";
import Container from "../../Components/Shared/Container/Container";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const DonationRequests = () => {
    const axiosSecure = useAxiosSecure();
    const { data: data = [],  isLoading } = useQuery({
        queryKey: ['AllBloodDonationRequest'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bloodRequests`);
            return res.data
        },
    });
    console.log(data[0]);
    if(isLoading){
          return <div>Loading...</div>

    }
    return (
      <Container>
        <Helmet title="Donation Requests"/>
          <div className="flex flex-col items-center justify-center mb-10  bg-gray-100 ">
            <div className="w-full max-w-full bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">All Donation Requests</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-start text-sm font-bold text-surface">
                        <thead className="border-b border-neutral-200 font-medium">
                            <tr className="bg-black text-white">
                                <th scope="col" className="px-6 py-4">#</th>
                                <th scope="col" className="px-6 py-4">Recipient Name</th>
                                <th scope="col" className="px-6 py-4">Location</th>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4">Time</th>
                                <th scope="col" className="px-6 py-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-center">
                            {data
                            .filter(item => item.status === 'pending')
                            .map((item, index) => (

                                <tr key={item._id} className="border-b border-neutral-200">
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item?.recipientName}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item?.district} <br /> {item?.upazila}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item?.requestedData}</td>
                                    <td className="whitespace-nowrap px-6 py-4">{item?.requestedTime}</td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                        <Link to={`/donation-requests-detail/${item._id}`}
                                            className="p-3 text-white rounded-lg bg-violet-500 shadow-lg block md:inline-block"
                                           
                                        >
                                            View Details
                                            <CiViewList className="ml-2" size={20} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </Container>
    );
};

export default DonationRequests;
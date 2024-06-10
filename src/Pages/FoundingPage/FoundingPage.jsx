import { Link } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const FoundingPage = () => {
    const axiosSecure = useAxiosSecure();
    const { data: donations = [] } = useQuery({
        queryKey: ['founding'],
        queryFn: async () => {
            const res = await axiosSecure.get('/donations');
            return res.data;
        }
    });

    const truncatePaymentIntentId = (id) => {
        if (!id) return '';
        return `${id.slice(0, 4)}...${id.slice(-4)}`;
    };

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <Helmet title="donations"/>
            <div className="container mx-auto">
                <div className="flex flex-col items-center justify-center mb-8">
                    <h1 className="text-4xl font-bold italic mb-4">All Donations</h1>
                    <Link to={'/payment'} className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-200">
                        Give Donations +
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="table-auto w-full text-center bg-white shadow-md rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="px-4 py-2">Avatar</th>
                                <th className="px-4 py-2">Email</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Donated Amount</th>
                                <th className="px-4 py-2">Transaction ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            {donations.map(user => (
                                <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-4 py-2">
                                        <div className="flex items-center justify-center">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={user.donatorImage} alt="User Avatar" className="object-cover rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-2">{user.donatorEmail}</td>
                                    <td className="px-4 py-2">{user.donatorName}</td>
                                    <td className="px-4 py-2">{user.givenAmount}</td>
                                    <td className="px-4 py-2">{truncatePaymentIntentId(user.paymentIntentId)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FoundingPage;

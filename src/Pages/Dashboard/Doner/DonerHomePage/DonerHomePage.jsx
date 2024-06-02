import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
const DonerHomePage = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: data = [],  } = useQuery({
        queryKey: 'myDonationRequests',
        queryFn: async () => {
            const res = await axiosSecure.get(`/myBloodRequests/${user?.email}`)
            if (!res.data) {
                <span className="loading loading-spinner loading-lg"></span>

            }
            return res.data;

        }
    })
    if (data?.length > 3) {
        return <p> cant show more then 3</p>
    }

    console.log(data);
    return (
        <div className="flex  flex-col overflow-x-auto">
            {data?.length}
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                        <table
                            className="min-w-full text-start text-sm font-light text-surface ">
                            <thead
                                className="border-b border-neutral-200 font-medium">
                                <tr>
                                    <th scope="col" className="px-6 py-4">#</th>
                                    <th scope="col" className="px-6 py-4">Recipient name</th>
                                    <th scope="col" className="px-6 py-4">Recipient location</th>
                                    <th scope="col" className="px-6 py-4">Donation date</th>
                                    <th scope="col" className="px-6 py-4">Donation time </th>
                                    <th scope="col" className="px-6 py-4">Donation status </th>
                                    <th scope="col" className="px-6 py-4">Donor information</th>
                                    <th scope="col" className="px-6 py-4"> </th>
                                    <th scope="col" className="px-6 py-4">Action</th>
                                    <th scope="col" className="px-6 py-4"></th>

                                </tr>
                            </thead>
                            {
                                data && data.map(item => <tbody key={item._id} className="text-center">
                                    <tr className="border-b border-neutral-200">
                                        <td className="whitespace-nowrap px-6 py-4 font-medium">1</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.recipientName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.fullAddress}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.recipientName}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requestedData} <br /> {item.requestedTime}</td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.status} </td>
                                        <td className="whitespace-nowrap px-6 py-4">{item.requesterName} <br /> {item.requesterEmail}</td>
                                        <td className="whitespace-nowrap px-6 py-4"><button>viewDetails</button></td>
                                        <td className="whitespace-nowrap px-6 py-4"><button>edit</button></td>
                                        <td className="whitespace-nowrap px-6 py-4"><button>delete</button></td>

                                    </tr>

                                </tbody>)
                            }
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonerHomePage;
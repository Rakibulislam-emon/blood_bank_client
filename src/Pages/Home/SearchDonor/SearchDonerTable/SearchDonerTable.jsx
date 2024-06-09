/* eslint-disable react/prop-types */






const SearchDonerTable = ({ donor }) => {

    return (

        <div className="overflow-x-auto">
            <table className="table w-full text-center text-md md:text-xl bg-white shadow-md rounded-lg">
                <thead className="bg-gray-200 text-xl font-bold">
                    <tr>
                        <th className="px-4 py-2">Avatar</th>
                        <th className="px-4 py-2">Email</th>
                        <th className="px-4 py-2">Name</th>
                        <th className="px-4 py-2">District</th>
                        <th className="px-4 py-2">Upazila</th>
                        <th className="px-4 py-2">Role</th>
                        <th className="px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody>

                    <tr className="hover:bg-gray-50">

                        <td className="px-4 py-2">
                            <div className="flex items-center gap-3 text-sm">
                                <div className=" mx-auto ">
                                    <div className="mask  mask-squircle w-12 h-12">
                                        <img src={donor.image} alt="User Avatar" />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td className="px-4 py-2">{donor.email}</td>
                        <td className="px-4 py-2">{donor.name}</td>
                        <td className="px-4 py-2">{donor.district}</td>
                        <td className="px-4 py-2">{donor.upazila}</td>
                        <td className="px-4 py-2">{donor.role}</td>
                        <td className="px-4 py-2">{donor.status}</td>

                    </tr>
                </tbody>
            </table>


        </div>
    );
};

export default SearchDonerTable;
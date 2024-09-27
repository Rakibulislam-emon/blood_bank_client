import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import './SearchDonor.css';
// import SearchDonerTable from "./SearchDonerTable/SearchDonerTable";
import toast from "react-hot-toast";

const SearchDonor = () => {
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [donors, setDonors] = useState([]);
    const [sortedUpazila, setSortedUpazila] = useState([]);
    const axiosCommon = useAxiosCommon();

    const { data: divisions = [] } = useQuery({
        queryKey: ['divisions'],
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/divisions`);
            return res.data;
        },
    });

    const { data: upozilas = [] } = useQuery({
        queryKey: ['upozilas'],
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/upozila`);
            return res.data;
        },
    });

    useEffect(() => {
        if (upozilas && upozilas.length > 0) {
            const sorted = [...upozilas].sort((a, b) => a.name.localeCompare(b.name));
            setSortedUpazila(sorted);
        }
    }, [upozilas]);

    const handleSearch = (e) => {
        e.preventDefault();
        axiosCommon.get(`${import.meta.env.VITE_API_URL}/donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                setDonors(res.data);
               
                if(res.data.length === 0){
                    toast.error('no data found for your search term');
                }
            
            })
            .catch(err => {
                console.log(err);
            });
    };

  

    return (
        <div className="p-4">
            <div className="flex flex-col items-center justify-center">
                <label htmlFor="bloodGroup" className="mb-6 text-center my-4 font-medium text-gray-900 dark:text-gray-400 text-3xl">Search For Donor</label>
                <span className="mb-2">demo: B+ Dhaka Abhaynagar</span>
                <form onSubmit={handleSearch} className="w-full max-w-2xl">
                    <div className="flex flex-col lg:flex-row gap-2">
                        <select
                            required
                            id="bloodGroup"
                            className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                            onChange={(e) => setBloodGroup(e.target.value)}
                            value={bloodGroup}
                        >
                            <option value="">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                        </select>

                        <select
                            required
                            id="district"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setDistrict(e.target.value)}
                            value={district}
                        >
                            <option value="">Select your division</option>
                            {divisions.map((division) => (
                                <option key={division._id} value={division.name}>
                                    {division.name}
                                </option>
                            ))}
                        </select>

                        <select
                            required
                            id="upazila"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setUpazila(e.target.value)}
                            value={upazila}
                        >
                            <option value="">Select upazila</option>
                            {sortedUpazila.map((upozila) => (
                                <option key={upozila._id} value={upozila.name}>
                                    {upozila.name}
                                </option>
                            ))}
                        </select>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-600 transition"
                        >
                            Search
                        </button>
                    </div>
                </form>
                {donors.length > 0 && (
                    <div className="w-full mt-4">
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
                {
                    donors.map(donor => <tbody key={donor._id}>

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
                    </tbody>)
                }
            </table>


        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDonor;

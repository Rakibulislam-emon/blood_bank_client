import { useQuery } from "@tanstack/react-query";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import { useEffect, useState } from "react";
import './SearchDonor.css'
const SearchDonor = () => {
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [upazila, setUpazila] = useState('');
    const [donors, setDonors] = useState([]);
    const [sortedUpazila, setSortedUpazila] = useState([])
    const axiosCommon = useAxiosCommon()
    
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
    })
 
     useEffect(()=>{
        if(upozilas && upozilas.length > 0) {
            const sorted = [...upozilas].sort((a,b)=>a.name.localeCompare(b.name));
            setSortedUpazila(sorted);
        }
     },[upozilas])
  

    const handleSearch = (e) => {
        e.preventDefault();
        console.log(bloodGroup, district, upazila);
        axiosCommon.get(`${import.meta.env.VITE_API_URL}/donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
            .then(res => {
                console.log(res.data);
                setDonors(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }
    //   const handleSearch = (e) => {
    //     const {data } = useQuery({
    //         queryKey: ['donors'],
    //         queryFn: async () => {
    //            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`)
    //            return res.data;
    //         },
    //     })
    //   }
    //     console.log(data[0].bloodGroup);

    return (
        <div className="">
            <div className=" grid items-center justify-center">
                <label htmlFor="bloodGroup" className="mb-2 text-center text-sm font-medium text-gray-900 dark:text-gray-400">Select Blood Group</label>
                <form onSubmit={handleSearch}>
                    <div className="flex gap-x-2">

                        <select id="bloodGroup" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

                        <select id="district" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setDistrict(e.target.value)}
                            value={district}
                        >
                            <option value={""}>Select your division</option>
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

                        <select id="upazila" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block max-w-lg p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setUpazila(e.target.value)}
                            value={upazila}
                        >
                            <option value="">Select upazila</option>
                            {
                                sortedUpazila && sortedUpazila.map((upozila) => {
                                    return (
                                        <option key={upozila._id} value={upozila.name}>
                                            {upozila.name}
                                        </option>
                                    );
                                })
                            }
                        </select>
                        <button type="submit" className="button flex">
                            <span>
                                search
                            </span>
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default SearchDonor;

import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../../Components/Utils";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";

const Profile = () => {
    const { user ,updateUserProfile} = useAuth();
    const axiosCommon = useAxiosCommon()
    const { email } = user || {};
    const axiosSecure = useAxiosSecure();
    // get divisions data
    const { data: divisions = [], } = useQuery({
        queryKey: 'divisions',
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/divisions`);
            return res.data;
        },
    });
    const { data: upozilas = [] } = useQuery({
        queryKey: 'upozilas',
        queryFn: async () => {
            const res = await axiosCommon.get(`${import.meta.env.VITE_API_URL}/upozila`);
            return res.data;
        },
    })
    // Fetch user profile data
    const { data ,refetch} = useQuery({
        queryKey: ['profile', email],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/profile/${user?.email}`);
            return res.data;
        },
    });
    const [toggle, setToggle] = useState(true);

    const handleEditClick = () => {
        setToggle(prevToggle => !prevToggle);
        console.log(toggle); // This will log the previous value of toggle, not the updated one
    };

    // handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault()
        const form = e.target
        const firstName = form.firstName.value
        const lastName = form.lastName.value
        const photo = form.image.files[0]
        const email = user?.email
        const profession = form.profession.value
        const district = form.district.value
        const upozila = form.upozila.value
        const bloodGroup = form.bloodGroup.value
        const bio = form.bio.value
        const fullName = `${firstName} ${lastName}`
        console.log(firstName, lastName, photo, email, district, upozila, bloodGroup, bio);
        try {
            const image_Url = await imageUpload(photo);
            console.log('Image URL:', image_Url);
            const updateInfo = {
                firstName,
                lastName,
                image: image_Url,
                email,
                district,
                upozila,
                 profession,
                bloodGroup,
                bio,
            }
            if (updateInfo) {
                const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/profile-update/${email}`, updateInfo )
                console.log(res.data);
                if(res.data.modifiedCount > 0) {
                    toast.success('profile updated successfully')
                  const update= await  updateUserProfile (fullName,image_Url)
                  console.log(update);
                    refetch()
                    setToggle(true)
                }
            } else {
                return alert('updateFailed')
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <form onSubmit={handleUpdate} className="w-full min-h-screen py-1 md:w-2/3 lg:w-3/4">
            <div className="p-2 md:p-4">
                <div className="w-full px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
                    <h2 className="pl-6 text-2xl font-bold sm:text-xl">Public Profile</h2>
                    <div className="grid max-w-2xl mx-auto mt-8">
                        <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                            <img
                                className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                src={data?.image}
                                alt="Bordered avatar"
                            />
                            <div className="flex flex-col space-y-5 sm:ml-8">
                                <button
                                    type="button"
                                    onClick={handleEditClick}
                                    className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                >
                                    Edit
                                </button>
                                <button
                                    type="submit"
                                    // onClick={handleSaveClick}
                                    className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                <div className="w-full">
                                    <input name="firstName" type="text" id="firstName" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.name} readOnly={toggle} />
                                </div>
                                <div className="w-full">
                                    <input type="text" name="lastName" id="lastName" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={'...'} readOnly={toggle} />
                                </div>
                            </div>

                            <div className="mb-2 sm:mb-6">
                                <input
                                    name="image"
                                    type="file"
                                    accept="image/*"
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"  disabled={toggle} />
                            </div>

                            <div className="mb-2 sm:mb-6">
                                <input type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.email} readOnly />
                            </div>

                            <div className="mb-2 sm:mb-6">
                                <input name="profession" placeholder="profession" type="text" id="profession" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.profession} readOnly={toggle} />
                            </div>

                            <div className="mb-2 sm:mb-6">
                                <select
                                    disabled={toggle}
                                    name="district"

                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                >
                                    <option>{data?.district}</option>
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

                            <div className="mb-2 sm:mb-6">
                                <label htmlFor="upazila" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Upazila</label>
                                <select
                                    disabled={toggle}
                                    name="upozila"
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                >
                                    <option >{data?.upazila}</option>
                                    {/* Add options for upazilas */}
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

                            <div className="mb-2 sm:mb-6">
                                <label htmlFor="bloodGroup" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Blood Group</label>
                                <select
                                    name="bloodGroup"
                                  
                                    className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    disabled={toggle}
                                >
                                    <option value="">{data?.bloodGroup}</option>
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

                            <div className="mb-6">
                                <label htmlFor="bio" className="block mb-2 text-sm font-medium text-indigo-900 dark:text-white">Bio</label>
                                <textarea name="bio" id="bio" rows="4" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500" defaultValue={data?.bio} readOnly={toggle} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Profile;

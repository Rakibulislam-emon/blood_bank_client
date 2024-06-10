import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import { imageUpload } from "../../../Components/Utils";
import useAxiosCommon from "../../../Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const Profile = () => {
    const { user, updateUserProfile } = useAuth();
    const axiosCommon = useAxiosCommon();
    const axiosSecure = useAxiosSecure();

    const { data: divisions = [] } = useQuery({
        queryKey: ['divisions'],
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
    });

    const { data, refetch } = useQuery({
        queryKey: ['profile', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`${import.meta.env.VITE_API_URL}/profile/${user?.email}`);
            return res.data;
        },
    });

    const [toggle, setToggle] = useState(true);

    const handleEditClick = () => {
        setToggle(prevToggle => !prevToggle);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const photo = form.image.files[0];
        const email = user?.email;
        const profession = form.profession.value;
        const district = form.district.value;
        const upozila = form.upozila?.value;
        const bloodGroup = form.bloodGroup.value;
        const bio = form.bio.value;
        const fullName = `${firstName} ${lastName}`;

        try {
            const image_Url = await imageUpload(photo);
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
            };

            if (updateInfo) {
                const res = await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/profile-update/${email}`, updateInfo);
                if (res.data.modifiedCount > 0) {
                    toast.success('Profile updated successfully');
                    await updateUserProfile(fullName, image_Url);
                    refetch();
                    setToggle(true);
                }
            } else {
                return alert('Update failed');
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="border">
            <Helmet title="profile"/>
            <form onSubmit={handleUpdate} className="w-full min-h-screen py-1 mx-auto bg-gray-50">
                <div className="p-2 md:p-4">
                    <div className="w-full border-red-600 border-4 px-6 pb-8 mt-8 sm:max-w-xl sm:rounded-lg mx-auto bg-white shadow-md">
                        <h2 className="pl-6 text-2xl font-bold sm:text-xl text-indigo-900">Public Profile</h2>
                        <div className="grid max-w-2xl mx-auto mt-8">
                            <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
                                <img
                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-indigo-300 dark:ring-indigo-500"
                                    src={data?.image}
                                    alt="Profile Avatar"
                                />
                                <div className="flex flex-col space-y-5 sm:ml-8">
                                    <button
                                        type="button"
                                        onClick={handleEditClick}
                                        className="py-3.5 px-7 text-base font-medium text-indigo-100 focus:outline-none bg-[#202142] rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        {toggle ? "Edit" : "Cancel"}
                                    </button>
                                    <button
                                        type="submit"
                                        className="py-3.5 px-7 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>

                            <div className="items-center mt-8 sm:mt-14 text-[#202142]">
                                <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
                                    <div className="w-full">
                                        <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-indigo-900">First Name</label>
                                        <input 
                                        required
                                        name="firstName" type="text" id="firstName" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.name?.split(' ')[0]} readOnly={toggle} />
                                    </div>
                                    <div className="w-full">
                                        <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-indigo-900">Last Name</label>
                                        <input 
                                        required
                                        type="text" name="lastName" id="lastName" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.name?.split(' ')[1] || ''} readOnly={toggle} />
                                    </div>
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="image" className="block mb-2 text-sm font-medium text-indigo-900">Profile Image</label>
                                    <input

required
name="image"
                                        type="file"
                                        accept="image/*"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                        disabled={toggle}
                                    />
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-indigo-900">Email</label>
                                    <input 
                                    required
                                    type="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.email} readOnly />
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="profession" className="block mb-2 text-sm font-medium text-indigo-900">Profession</label>
                                    <input 
                                    required
                                    name="profession" placeholder="Profession" type="text" id="profession" className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5" defaultValue={data?.profession} readOnly={toggle} />
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="district" className="block mb-2 text-sm font-medium text-indigo-900">District</label>
                                    <select
                                        disabled={toggle}
                                        name="district"
                                        id="district"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    >
                                        <option>{data?.district}</option>
                                        {divisions.map((division) => (
                                            <option key={division._id} value={division.name}>
                                                {division.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="upazila" className="block mb-2 text-sm font-medium text-indigo-900">Upazila</label>
                                    <select
                                        disabled={toggle}
                                        name="upazila"
                                        id="upazila"
                                        className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                                    >
                                        <option>{data?.upazila}</option>
                                        {upozilas.map((upozila) => (
                                            <option key={upozila._id} value={upozila.name}>
                                                {upozila.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-2 sm:mb-6">
                                    <label htmlFor="bloodGroup" className="block mb-2 text-sm font-medium text-indigo-900">Blood Group</label>
                                    <select
                                        name="bloodGroup"
                                        id="bloodGroup"
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
                                    <label htmlFor="bio" className="block mb-2 text-sm font-medium text-indigo-900">Bio</label>
                                    <textarea name="bio" id="bio" rows="4" className="block p-2.5 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500" defaultValue={data?.bio} readOnly={toggle} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Profile;

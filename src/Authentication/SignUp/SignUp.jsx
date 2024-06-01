import { Link, useNavigate, } from "react-router-dom";
import { useQuery } from '@tanstack/react-query'
import useAuth from "../../Hooks/useAuth";
import useAxiosCommon from "../../Hooks/useAxiosCommon";
import { imageUpload } from "../../Components/Utils";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
const SignUp = () => {
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()
    const axiosCommon = useAxiosCommon()
    const { createUser,updateUserProfile } = useAuth();
    // get divisions data
    const { data: divisions = [] } = useQuery({
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

    const handleCreateUser = async (e) => {
        e.preventDefault();
        
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm_password.value;
        const avatar = form.avatar.files[0];
        const bloodGroup = form.blood_group.value;
        const district = form.district.value;
        const upazila = form.upazila.value;
        const role = 'donor';
        const status = 'active';
      
        if (password !== confirmPassword) {
          console.error('Passwords do not match');
          return; // Exit if passwords don't match
        }
      
        try {
          // Upload avatar image and get the URL
          const image_Url = await imageUpload(avatar);
          console.log('Image URL:', image_Url);
      
          const userInfo = {
            name,
            email,
            password,
            image: image_Url,
            bloodGroup,
            district,
            upazila,
            role,
            status
          };
          console.log('User Info:', userInfo);
      
          // Create user with email and password
          const result = await createUser(email, password);
          console.log('User Created:', result);
      
          
          // Update user profile with name and image URL
          const update = await updateUserProfile(name, image_Url);
          console.log('Profile Updated:', update);
          // Post user info to your server
          if( !userInfo ){
            return alert('User not found')
          } else{

              const res = await axiosSecure.post('/users', userInfo);
              console.log('Sent to Server:', res.data);
          }
      
          // Navigate to login page after successful registration
          navigate('/login');
      
        } catch (error) {
          console.error('Error during user creation:', error.message);
        }
      };
      

    return (
        <div className="font-[sans-serif] text-[#333]">

            <div className="min-h-screen flex flex-col items-center justify-center">
                <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                    <div className="md:h-full max-md:mt-10 bg-[#000842] rounded-xl lg:p-12 p-8">
                        <img
                            src="https://readymadeui.com/signin-image.webp"
                            className="w-full h-full object-contain"
                            alt="signup-image"
                        />
                    </div>
                    <div className="md:max-w-md w-full sm:px-6 py-4">
                        <form onSubmit={handleCreateUser}>
                            <div className="mb-12">
                                <h3 className="text-3xl font-extrabold">Sign Up</h3>
                                <p className="text-sm mt-4">
                                    Already have an account?
                                    <Link
                                        to={'/login'}
                                        className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap"
                                    >
                                        Sign in here
                                    </Link>
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Name</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Enter name"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Email</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Enter email"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Avatar</label>
                                <input
                                    name="avatar"
                                    type="file"
                                    accept="image/*"
                                    // required
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Blood Group</label>
                                <select
                                    name="blood_group"
                                    required
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
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
                            <div className="mb-4">
                                <label className="text-xs block mb-2">District</label>

                                <select

                                    name="district"
                                    required
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                >
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
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Upazila</label>
                                <select
                                    name="upazila"
                                    required
                                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                >
                                    <option value="">Select upazila</option>
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
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Enter password"
                                    />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label className="text-xs block mb-2">Confirm Password</label>
                                <div className="relative flex items-center">
                                    <input
                                        name="confirm_password"
                                        type="password"
                                        required
                                        className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                                        placeholder="Confirm password"
                                    />
                                </div>
                            </div>
                            <div className="mt-12">
                                <button
                                    type="submit"
                                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                                >
                                    Sign Up
                                </button>
                            </div>
                            <p className="my-8 text-sm text-gray-400 text-center">or continue with</p>
                            <div className="space-x-8 flex justify-center">
                                <button type="button" className="border-none outline-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30px" className="inline" viewBox="0 0 512 512">
                                        {/* Add Google icon path */}
                                    </svg>
                                </button>
                                {/* Add buttons for other social login options */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SignUp

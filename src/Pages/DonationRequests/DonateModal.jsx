/* eslint-disable react/prop-types */
// import Swal from 'sweetalert2';
// import useAxiosSecure from '../../Hooks/useAxiosSecure';
// import { useNavigate } from 'react-router-dom'
const DonateModal = ({onClose ,handleDonate  ,donorInfo ,data}) => {
    console.log('data:', data)
    console.log('donorInfo:', donorInfo)
    // eslint-disable-next-line react/prop-types
    const {donorName ,donorEmail} = donorInfo
    console.log( donorName ,donorEmail)

    // const navigate = useNavigate()
    // const axiosSecure = useAxiosSecure()
    
    
 
    // const handleDonate = async (id, status) => {
    //     console.log(id, status)
        
    //     Swal.fire({
    //         title: "Are you sure?",
    //         text: "You won't be able to revert this!",
    //         icon: "warning",
    //         showCancelButton: true,
    //         confirmButtonColor: "#3085d6",
    //         cancelButtonColor: "#d33",
    //         confirmButtonText: `Yes, donate! `
    //     }).then(async (result) => {
    //         if (result.isConfirmed) {
    //             await axiosSecure.patch(`${import.meta.env.VITE_API_URL}/usersBloodRequests/${id}`, {
    //                 status: status,
    //                 donorInfo : donorInfo
    //             })

    //                 .then((response) => {
    //                     console.log(response.data);
    //                     Swal.fire({

    //                         title: `donation in progress`,
    //                         text: `Your donation  is ${status}.`,
    //                         icon: "success"

    //                     })
    //                     navigate('/donation-requests')

    //                 })
    //                 .catch((error) => {
    //                     console.error(error);
    //                     Swal.fire({
    //                         title: "Error!",
    //                         text: `There was an error to donation.`,
    //                         icon: "error"
    //                     });
    //                 });
    //         }
    //     });

    // }


    return (
     <div className=" my-20">
           <div 
            className="relative mx-auto  w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
            <div className="w-full">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold text-gray-900">Donate blood !</h1>
                    <p className="mt-2 text-gray-500">Confirm Your Donation</p>
                </div>
                <div className="mt-5">
                    <div onSubmit={handleDonate} >
                    <div className="relative mt-6">
                            <input
                             type="UserName" name="UserName" id="UserName" placeholder={donorName} className="peer peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" />
                            <label htmlFor="UserName" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">{donorName} </label>
                        </div>
                        <div className="relative mt-6">
                            <input type="email" name="email" id="email" placeholder="Email Address" className="peer mt-1 w-full border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-gray-500 focus:outline-none" autoComplete="NA" />
                            <label htmlFor="email" className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">{donorEmail}</label>
                        </div>
                       
                      {
                        data.map(data =>   <div key={data._id} className="my-6">
                        <button  onClick={handleDonate}  className="w-full mb-4 rounded-md bg-green-500 px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">Confirm</button>
                        <button  onSubmit={onClose} className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none">cancel</button>
                    </div>)
                      }
                        
                    </div>
                </div>
            </div>
        </div>
     </div>
    );
};

export default DonateModal;
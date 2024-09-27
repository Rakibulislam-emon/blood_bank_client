import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useGetAllUsersRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: role = '', isLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/role/${user?.email}`)
            // console.log(res.data)
            return res.data.role
        }
    })
    return [role, isLoading]
};

export default useGetAllUsersRole;
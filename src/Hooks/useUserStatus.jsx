import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUserStatus = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: status = '', isLoading } = useQuery({
        queryKey: ['status', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/role/${user?.email}`)
            console.log(res.data.status)
            return res.data.status
        }
    })
    return [status, isLoading]
};

export default useUserStatus;
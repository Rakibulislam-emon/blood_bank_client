import useAuth from './useAuth'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
const useRole = () => {
    const { user, loading } = useAuth()
    const axiosSecure = useAxiosSecure()

    const { data: status = '', isLoading ,refetch } = useQuery({
        queryKey: ['status', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const { data } = await axiosSecure.get(`/usersRole/${user?.email}`)
            console.log(data)
            return data.status
        },
    })

    //   Fetch user info using logged in user email

    return [status, isLoading ,refetch]
}

export default useRole
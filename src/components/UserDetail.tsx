// import { noop } from '@tanstack/react-query';
import {useUser} from '../hooks/useUser';

interface Props {
    userId: number | null;
}

export const UserDetail = ({userId}: Props) => {
    const {data: user, isLoading, isError, error} = useUser(userId);

    if (!userId) {
        return <p>select a user to see details</p>;
    }

    if(isLoading) {
        return <p>loading user...</p>
    }

    if (isError) {
        return <p style={{color: 'red'}}>Error: {error.message}</p>
    }

    if (!user){
        return null;
    }

    return(
        <div style={{ border: '1px solid #ccc', padding: '12px', marginTop: '16px' }}>
            <h2>{user.name}</h2>
            <p>Email:{user.email}</p>
            <p>Phone:{user.phone}</p>
            <p>Website:{user.website}</p>
            <p>Company:{user.company.name}</p>
            <p>City:{user.address.city}</p>
        </div>
    )
}
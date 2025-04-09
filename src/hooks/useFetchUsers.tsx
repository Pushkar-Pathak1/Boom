import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks';
import { getDocs, orderBy, query, where } from 'firebase/firestore';
import { userRef } from '../utils/FirebaseConfig';
import { get } from 'http';
import { UserType } from '../utils/Types';

const useFetchUsers = () => {
    const [users, setUsers] = useState<Array<UserType>>([]);
    const uid=useAppSelector((zoom)=>zoom.auth.userInfo?.uid);

    useEffect(()=>{
        if (uid) {
            const getUsers = async () => {
                const firestoreQuery = query(userRef, where("uid", "!=", uid), orderBy("uid"));
                const data = await getDocs(firestoreQuery);
                const firebaseUsers: Array<UserType & { label: string }> = [];
        
                data.forEach((user) => {
                    const userData = user.data() as UserType;
        
                    firebaseUsers.push({
                        ...userData,
                        label: typeof userData.name === 'string' ? userData.name : 'Unnamed User',
                    });
                    
                });
        
                setUsers(firebaseUsers);
            };
            getUsers();
        }
        
    },[uid])
    return users;
}

export default useFetchUsers

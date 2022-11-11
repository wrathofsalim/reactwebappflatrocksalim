import * as userService from '../../services/UserService';
import { useAuthContext } from '../../contexts/AuthContext';
import React, { useEffect, useState } from 'react';

export const DeleteUser = ({item}) => {
    const { user } = useAuthContext();


    const [id, SetId] = useState(item.id);
    const [status, SetStatus] = useState(item.status);

    useEffect(() => {
        userService.getById(id)
            .then(res => {
                SetId(res[0])
                SetStatus(res[7]);
            });
    }, []);

    const onUserDelete = (e) => {
        e.preventDefault();
        let response = userService.deleteById(id, user.accessToken);
        return console.log(response)
        // window.location.reload(false);
    }


}   
import { useState, useEffect } from 'react';
import http from "../../../api/http-common";

export const useAvatar = (url) => {
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        const fetchAvatar = async () => {
            try {
                const response = await http.get(url, {
                    responseType: 'blob'
                });
                const imageUrl = URL.createObjectURL(response.data);
                setAvatar(imageUrl);
            } catch (error) {
                console.error('Error fetching avatar', error);
            }
        };

        fetchAvatar();

        return () => {
            if (avatar) {
                URL.revokeObjectURL(avatar);
            }
        };
    }, [url]);

    return avatar;
};

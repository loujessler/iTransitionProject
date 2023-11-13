import {useState, useEffect} from 'react';
import cookies from "../../../services/cookies";
import profileService from "../../../api/services/profileService";
import {useAuth} from "../../../shared/providers/AuthProvider";

export const useAvatar = () => {
    const [avatar, setAvatar] = useState(null);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        const fetchAvatar = async () => {
            const currentUserId = sessionStorage.getItem('currentUserId');

            if (!currentUserId) {
                console.error('No current user ID found');
                return;
            }

            const storedAvatar = sessionStorage.getItem(`userAvatarUrl_${currentUserId}`);

            if (storedAvatar) {
                setAvatar(storedAvatar);
            } else {
                // Предполагается, что profileService.profile() требует токен для авторизации
                const token = cookies.get('authToken');
                if (token && isAuthenticated) {
                    try {
                        const response = await profileService.profile(token);
                        const avatarUrl = response.profile.avatar;
                        sessionStorage.setItem(`userAvatarUrl_${currentUserId}`, avatarUrl);
                        setAvatar(avatarUrl);
                    } catch (error) {
                        console.error('Error fetching avatar', error);
                    }
                }
            }
        };

        const currentUserId = sessionStorage.getItem('currentUserId');
        if (currentUserId && isAuthenticated) {
            fetchAvatar();
        }
    }, [isAuthenticated]);

    return avatar;
};

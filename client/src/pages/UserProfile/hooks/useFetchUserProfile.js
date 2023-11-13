import { useState, useEffect, useContext } from 'react';
import http from '../../../api/http-common';
import { useLoading } from "../../../shared/providers/LoadingProvider";
import { ErrorContext } from "../../../shared/contexts/ErrorContext";
import cookies from "../../../services/cookies";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../shared/providers/AuthProvider";
import profileService from "../../../api/services/profileService"


export function useFetchUserProfile(page = 1, pageSize = 6, edit) {
    const { setLoading } = useLoading();
    const [data, setData] = useState({
        userProfile: null,
        userCollections: null,
        totalPages: 0
    });
    const { showError, resetError } = useContext(ErrorContext);
    const navigate = useNavigate();
    const { logOut } = useAuth();

    const fetchData = async (currentPage) => {
        const token = cookies.get('authToken');
        if (!token) {
            navigate('/', { state: { openAuthDialog: true } });
            return;
        }

        setLoading(true);
        resetError();

        try {
            const userResponse = await profileService.profile(token);
            const collectionsResponse = await http.get(`user/${userResponse.id}/collections/?page=${currentPage}&page_size=${pageSize}`, {
                headers: { Authorization: `Token ${token}` }
            });

            setData({
                userProfile: userResponse,
                userCollections: collectionsResponse.data.collections,
                totalPages: collectionsResponse.data.total_pages,
            });
        } catch (error) {
            showError(error.response?.data?.detail || 'An error occurred while fetching profile data.');
            if (error.response?.status === 401) {
                logOut();
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [page, pageSize, edit]);

    return { data, fetchData };
}

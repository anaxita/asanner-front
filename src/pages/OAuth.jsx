import React, {useEffect} from 'react';
import axios from 'axios';
import {useSearchParams} from "react-router-dom";

// OAuth component that handles the OAuth flow with Asana and redirects to the projects page when complete
export const OAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code');

    useEffect(() => {
        if (!code) {
            window.location.href = '/login';
        }

        axios
            .post(`${import.meta.env.VITE_API_URL}/login?code=${code}`, {})
            .then((response) => {
                const {access_token} = response.data;
                localStorage.setItem('token', access_token);
                window.location.href = '/projects';
            })
            .catch((error) => {
                console.error('Error fetching access token:', error);
            });

    }, []);

    return (<>Authenticating...</>);
};
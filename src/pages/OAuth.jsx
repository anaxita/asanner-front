import React, {useEffect} from 'react';
import jwtDecode from "jwt-decode";
import {useSearchParams} from "react-router-dom";
import {makeHttpRequest} from "../api/make_http_request";
import {Spinner} from "react-bootstrap";

// OAuth component that handles the OAuth flow with Asana and redirects to the projects page when complete
export const OAuth = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const code = searchParams.get('code');
    if (!code) {
        window.location.href = '/login';
    }

    useEffect(() => {
        makeHttpRequest('POST', `/login?code=${code}`)
            .then(r => {
                const {data, err} = r;
                if (err) {
                    console.log(err)
                } else {
                    const {access_token} = data;
                    localStorage.setItem('token', access_token);
                    const decoded = jwtDecode(access_token);
                    localStorage.setItem('user', JSON.stringify(decoded.user));
                    window.location.href = '/projects';
                }
            });

    }, [code]);

    return (
        <div className="bg-light vh-100">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Авторизация...</span>
            </Spinner>
        </div>
    );
};
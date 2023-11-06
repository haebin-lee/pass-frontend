import React, { useEffect } from "react";
import { useLocation, useHistory } from 'react-router-dom';
import { googleLogin } from '../services/api'

export default function GoogleLoginCallback() {
    const location = useLocation();

    useEffect(() => {
        const getAuthorizationCode = () => {
            const searchParams = new URLSearchParams(location.search);
            return searchParams.get('code')
        };

        const authorizationCode = getAuthorizationCode();

        if (authorizationCode) {
            googleLogin({'code': authorizationCode})
                .then((res) => {

                })
                .catch((error) => {
                    console.log('google login error', error)
                })
        } else {

        }
    }, [location]);

    return (
      <div>
        <p>Handling Google login callback...</p>
        {/* You can display a loading spinner or message here while processing the callback. */}
      </div>
    );


}

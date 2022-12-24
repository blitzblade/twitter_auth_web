import { useState, useEffect } from 'react';
import axios from 'axios';

const CallbackPage = () => {
    const API_URL = "http://localhost:5001"
    const [details, setDetails] = useState({user_id: "",username: "xxx", access_token: "xxx", access_token_secret: "xxx"})
    useEffect(() => {
        //pick params and send api request to get final user data
        const path = window.location.href;
        
        if (path.includes("?")){
            const query = path.split("?")[1];
            let _params = query.split("&").map((x) =>  x.split("="));
            _params = { oauth_token: _params[0][1], oauth_verifier: _params[1][1]};
            console.log(_params);
            
            axios.get(`${API_URL}/api/auth_twitter_callback`,
            { params: _params })
            .then((data)=>{
                console.log(data)
                setDetails({username: data.username, access_token: data.access_token, access_token_secret: data.access_token_secret})
                //{"message": "success", "user_id": user_id, 
                //"username": username, "access_token": auth.access_token, 
                //"access_token_secret": auth.access_token_secret}


            });
        }

        return () => {
            console.log('Component will be unmount');
        }
    }, []);

    return (
        <>
            <div className='container'>
                <div className='white-container'>
                    <div className='p'>
                        Username: {details.username}
                    </div>
                    <div className="p">
                        Access Token: {details.access_token}
                    </div>
                    <div className="p">
                        Access Token Secret: {details.access_token_secret}
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default CallbackPage;
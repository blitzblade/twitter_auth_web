import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import env from 'react-dotenv';

const CallbackPage = () => {
    const [details, setDetails] = useState({user_id: "",username: "xxx", access_token: "xxx", access_token_secret: "xxx"})
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        //pick params and send api request to get final user data
        if (dataFetchedRef.current) return;

        const path = window.location.href;
        
        if (path.includes("?")){
            const query = path.split("?")[1];
            let _params = query.split("&").map((x) =>  x.split("="));
            _params = {
                consumer_key: localStorage.getItem('consumer_key'),
                consumer_secret: localStorage.getItem('consumer_secret'),
                oauth_token: _params[0][1],
                oauth_verifier: _params[1][1]
            };
            console.log(_params);
            
            axios.get(`${env.API_URL}/api/auth_twitter_callback`,
            { params: _params })
            .then((data)=>{
                
                console.log("DATA")
                let d = data.data;
                console.log(d)
                setDetails({username: d.username, access_token: d.access_token, access_token_secret: d.access_token_secret})
                //{"message": "success", "user_id": user_id, 
                //"username": username, "access_token": auth.access_token, 
                //"access_token_secret": auth.access_token_secret}
            });

            dataFetchedRef.current = true;
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
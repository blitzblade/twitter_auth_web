
import { useState } from 'react';
import axios from 'axios';
import env from 'react-dotenv'

const AuthorizeTweep = () => {
    const API_URL = env.API_URL;
    let initialState = {
        consumer_key: "",
        consumer_secret: "",
        callback_url: ""
    }
    const [details, setDetails] = useState(initialState);
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(details)
        
        axios.post(
            `${API_URL}/api/auth_twitter`, details)
                   .then(res => {
                     console.log(res);
                     console.log(res.data);
                     const data = res.data;

                     localStorage.setItem('consumer_key', details.consumer_key);
                     localStorage.setItem('consumer_secret', details.consumer_secret)

                     if (data.redirect_url === null){
                        console.log("redirect url is null");
                      }else{
                        window.location.href = data.redirect_url;
                      }
                 })
      }
    return (
        <div className="container">
            <form>
                <p>Generate Tokens</p>
                <div>
                    <input type="text" placeholder="Consumer Key" value={details.consumer_key}
                    onChange={(event) => setDetails({...details, consumer_key: event.target.value}) }/>
                </div>
                <div>
                <input type="text" placeholder="Consumer Secret" value={details.consumer_secret} 
                    onChange={(event)=> setDetails({...details, consumer_secret: event.target.value})}/>
                </div>
                <div>
                <input type="text" placeholder="Callback URL" value={details.callback_url}
                    onChange={(event)=> setDetails({...details, callback_url: event.target.value})}/>
                </div>
            
                
                <div>
                <input type="button" value="Authorize" onClick={handleSubmit} />
                </div>
                
            </form>

            <div className="drops">
            <div className="drop drop-1"></div>
            <div className="drop drop-2"></div>
            <div className="drop drop-3"></div>
            <div className="drop drop-4"></div>
            <div className="drop drop-5"></div>
  </div>
        </div>
      )
}

export default AuthorizeTweep;

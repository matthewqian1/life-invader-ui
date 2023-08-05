import { useState } from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_URL

function Login(){
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    loginRequest(username, password, navigate);
  }

  return (
    <div className="basePage" style={{minHeight:"100vh"}}>
      <h1 className="homeHeading">Welcome to Life Invader!</h1>
      <div>
      <img src="https://media.giphy.com/media/VJ65NK5synjTaL4D0I/giphy.gif" style={{float:"left"}}></img>
      </div>
      
      <div className="create">
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input 
            type="text" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <textarea
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></textarea>
          <button style={{backgroundColor:"green"}}>Login</button>
        </form>
        <hr></hr>
        <div >
        <button style={{backgroundColor: "black", float:"left"}} onClick={() => {
          navigate('/register');
        }}>
          Register
        </button>
            <button style={{backgroundColor:"blue", float:"right"}} onClick={() => {
              loginRequest("user1", "password", navigate)
            }}>
                Log in as test user
            </button>
          </div>
      </div>
      
    </div>
  );
}

export function loginRequest (username, password, navigate) {
  const credentials = { username, password};
  console.log(baseUrl);
  fetch(`${baseUrl}/account/login` , {
    method: 'POST',
    headers: { "Content-Type": "application/json"},
    body: JSON.stringify(credentials)
  })
  .then(data => {
    if (data.status !== 200) {
      data.text().then(text => { alert(text) });
    } else {
      data.text().then(token => {
        console.log(token);
        navigate('/user', {state:{token:`${token}`}})
      }
        )
      ;
      
    }
  })
}
 
export default Login;

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
    <div>
      <div>
        <button onClick={() => {
          navigate('/register');
        }}>
          Register
        </button>
      </div>
      <div>
        <button onClick={(e) => {
          loginRequest("user1", "password", navigate)
        }}>
          Log in as test user
        </button>
      </div>
      <div className="create">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input 
            type="text" 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password</label>
          <textarea
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></textarea>
          <button>Add</button>
        </form>
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

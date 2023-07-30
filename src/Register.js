import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import { loginRequest } from "./Login";
import { useNavigate } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API_BASE_URL

function Register(){
  const [username, setUsername] = useState('matt');
  const [password, setPassword] = useState('password');
  const [activityLevel, setActivityLevel] = useState('LOW');
  const [email, setEmail] = useState('email123@gmail.com');
  const [weightKg, setWeightKg] = useState('80');
  const [heightCm, setHeightCm] = useState('185');
  const [age, setAge] = useState('25');
  const [caloriesSuggested, setCaloriesSuggested] = useState(false);
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
  const [disableSubmit, setDisableSubmit] = useState(true);
  const navigate = useNavigate();

  const suggestCalories = (e) => {
     e.preventDefault();
     const form = { username, password, email, activityLevel, weightKg, heightCm, age, dailyCalorieGoal};
     fetch(`${baseUrl}/nutrition/getRecommendedCalories` , {
         method: 'POST',
         headers: { "Content-Type": "application/json"},
         body: JSON.stringify(form)
       })
       .then(data => {
         if (data.status !== 200) {
           return data.text().then(text => { alert(text) });
         }
         data.json().then(calories => {
           console.log(calories);
           setCaloriesSuggested(true);
           setDailyCalorieGoal(calories);
           setDisableSubmit(false);
         }
         );
       })
      };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = { username, password, email, activityLevel, weightKg, heightCm, age, dailyCalorieGoal};
      fetch(`${baseUrl}/account/create` , {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(form)
      })
      .then(data => {
        if (data.status !== 200) {
          return data.text().then(text => { alert(text) });
        }
        loginRequest(username, password, navigate);

      })
    } 
  

  return (
    <div className="create">
      <h2>Register</h2>
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
        <label>Email:</label>
        <input 
          type="text" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Weight(kg):</label>
        <input 
          type="number" 
          required 
          value={weightKg}
          onChange={(e) => setWeightKg(e.target.value)}
        />
        <label>Height(cm):</label>
        <input 
          type="number" 
          required 
          value={heightCm}
          onChange={(e) => setHeightCm(e.target.value)}
        />
        <label>Age:</label>
        <input 
          type="number" 
          required 
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <label>Choose activity level:</label>
        <select required onChange={(e) => setActivityLevel(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MODERATE">Moderate</option>
          <option value="HIGH">High</option>
        </select>
        <button onClick={suggestCalories}>Suggest Calories</button>
        <br></br>
        {caloriesSuggested && <label>Calculated Daily Calorie Goal: {dailyCalorieGoal}</label>}
        <br></br>
        <button disabled={disableSubmit}>Create Account</button>
      </form>
    </div>
  );
}
 
export default Register;
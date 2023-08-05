import { useState, useEffect } from "react";
import {useLocation} from 'react-router-dom';
import './App.css';
import LineGraph from "./components/LineGraph.tsx";
import AddCalories from "./AddCalories";

const baseUrl = process.env.REACT_APP_API_BASE_URL

function UserPage(){
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [dailyCalorieGoal, setDailyCalorieGoal] = useState('');
  const [consumptionSnapshot, SetConsumptionSnapshot] = useState([]);
  const [loadConsumptionSnapshot, setLoadConsumptionSnapshot] = useState(true);
  const [consumptionBreakdown, setConsumptionBreakdown] = useState([]);
  const [loadConsumptionBreakdown, setLoadConsumptionBreakdown] = useState(true);

  var date = new Date();
  var dd = String(date.getDate()).padStart(2, '0');
  var mm = String(date.getMonth() + 1).padStart(2, '0'); 
  var yyyy = date.getFullYear();
  date = yyyy + '-' + mm + '-' + dd;
  const [consumptionBreakdownDate, setConsumptionBreakdownDate] = useState(date);
  useEffect(() => {
    fetch(`${baseUrl}/account/account` , {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": `${location.state.token}`}
    })
    .then(res => res.json()) 
    .then(data => {
        setUsername(data.username);
        setDailyCalorieGoal(data.dailyCalorieGoal);
        console.log(dailyCalorieGoal);
    })
  }, []);

  useEffect(() => {
    if (loadConsumptionSnapshot) {
    fetch(`${baseUrl}/nutrition/consumption/snapshot` , {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": `${location.state.token}`}
    })
    .then(res => res.json()) 
    .then(data => {
        console.log(data);
        SetConsumptionSnapshot(data.history);
        setLoadConsumptionSnapshot(false);
    })
  }
  }, [loadConsumptionSnapshot]);

  useEffect(() => {
    fetch(`${baseUrl}/nutrition/consumption/breakdown?date=${consumptionBreakdownDate}` , {
      method: 'GET',
      headers: { "Content-Type": "application/json", "Authorization": `${location.state.token}`}
    })
    .then(res => res.json()) 
    .then(data => {
        console.log(data);
        setConsumptionBreakdown(data);
    })
  }, [consumptionBreakdownDate, loadConsumptionSnapshot]);
  


  return (
    <div className="basePage" style={{minHeight:"100vh"}}>
    <div>
      <div class="fst-italic" style={{fontSize: '20px'}}>
      Logged in as {username}
      
</div>
<img className="profilePhoto" src={require("./img/Doggo.jpg")} alt="profile pic" ></img>
<div className='heading1' style={{backgroundColor:"white"}}>
                <h1>1 week consumption</h1>
            </div>
<div className="sideBySide" style={{backgroundColor:"white"}}>
  <LineGraph data={consumptionSnapshot}></LineGraph>
  <AddCalories token={location.state.token} reload={setLoadConsumptionSnapshot}></AddCalories>
  <div className="create">
    <h2 style={{color:"red"}}>Consumption Breakdown ({consumptionBreakdownDate})</h2>
    <form>
      <label>Choose Date</label>
      <input 
          type="date" 
          required 
          value={consumptionBreakdownDate}
          onChange={(e) => setConsumptionBreakdownDate(e.target.value)}
      />
    </form>
    <table>
      <tr style={{fontStyle: "italic"}}>
        <th>Food</th>
        <th>Weight(mg)</th>
        <th>Calories</th>
      </tr>
      {consumptionBreakdown.map((item) => {
        return (
        <tr>
          <td>{item.foodItem}</td>
          <td>{item.weightGrams}</td>
          <td>{item.calories}</td>
        </tr>
        )
      })}
    </table>
  </div>
</div>

    
    </div>
    </div>
  );
}
 
export default UserPage;
import { useState } from "react";
import NutritionDetails from "./NutritionDetails";

function AddCalories(data){
  const [foodItem, setFoodItem] = useState('');
  const [weightGrams, setWeightGrams] = useState('');
  const [showNutritionDetails, setShowNutritionDetails] = useState(false);
  const [nutritionDetails, setNutritionDetails] = useState('');
  const [resultMsg, setResultMsg] = useState('');
  const [showResultMsg, setShowResultMsg] = useState(false);

  const searchFood = (e) => {
    e.preventDefault();
    if (foodItem === '') {
      alert("Enter a food item");
      return;
    }
    fetch(`http://localhost:8080/nutrition/search/${foodItem}` , {
      method: 'GET',
      headers: { "Content-Type": "application/json"}
    }).then((result) => {
      if (result.status !== 200) {
        alert("invalid food item, check spelling and try again")
        setShowNutritionDetails(false)
      } else {
        result.json().then(data => {
          setNutritionDetails(data);
          setShowNutritionDetails(true);
        })
      }
      
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showNutritionDetails) {
      alert("Cannot submit entry, invalid food item");
      return;
    }
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); 
    var yyyy = date.getFullYear();
    date = yyyy + '-' + mm + '-' + dd;
    const body = { foodItem, weightGrams, date };
    fetch(`http://localhost:8080/nutrition/addEntry` , {
      method: 'POST',
      headers: { "Content-Type": "application/json", "Authorization": `${data.token}`},
      body: JSON.stringify(body)

    }).then((result) => {
      setFoodItem('');
      setWeightGrams('');
      setShowNutritionDetails(false);
      if (result.status === 200) {
        setResultMsg(`food item ${foodItem} successfully added!`);
        data.reload(true);
      } else {
        setResultMsg(`Error adding food item ${foodItem}`)
      }
      setShowResultMsg(true);
    })
  }

  return (
    <div className="create" >
      <h2>Enter Food</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input 
          type="text" 
          required 
          value={foodItem}
          onChange={(e) => setFoodItem(e.target.value)}
        />
        <button onClick={searchFood}>Search</button>
        <br></br>
        {showNutritionDetails && <NutritionDetails data={nutritionDetails}/>}
        <br></br>
        <label>Weight(grams):</label>
        <textarea
          required
          value={weightGrams}
          onChange={(e) => setWeightGrams(e.target.value)}
        ></textarea>
        <button>Add</button>
      </form>
      {showResultMsg && <label style={{paddingTop:"20px"}}>{resultMsg}</label>}
    </div>
  );
}
 
export default AddCalories;
import { useState } from "react";
import NutritionDetails from "./NutritionDetails";

const baseUrl = process.env.REACT_APP_API_BASE_URL

function AddCalories(data){
  const [foodItem, setFoodItem] = useState('');
  const [weightGrams, setWeightGrams] = useState(0);
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
    fetch(`${baseUrl}/nutrition/search/${foodItem}` , {
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
    fetch(`${baseUrl}/nutrition/addEntry` , {
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
    <div className="create" style={{padding: "20px", border:"outset"}}>
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
        <input
          required
          type="numeric"
          value={weightGrams}
          onChange={(e) => setWeightGrams(e.target.value)}
        ></input>
        {weightGrams !== 0 && showNutritionDetails && <label style={{color: "red"}}>Total calories to be added: {(weightGrams * nutritionDetails.calories) / nutritionDetails.servingSizeG}</label>}
        <button>Add</button>
      </form>
      {showResultMsg && <label style={{paddingTop:"20px"}}>{resultMsg}</label>}
    </div>
  );
}
 
export default AddCalories;
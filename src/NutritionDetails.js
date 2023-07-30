import { useState } from "react";
import {useLocation} from 'react-router-dom';

function NutritionDetails( detailsJson ){

  if (detailsJson !== null) {
    return (
      <>
         <br></br>
        <div style={{border: "1px dashed black", padding:"10px"}}>
          <h5><i>Nutrition details for - {detailsJson.data.name}</i></h5>
            <label>calories:               {detailsJson.data.calories}</label>
            <label>carbs(mg):               {detailsJson.data.carbohydratesTotalMg}</label>
            <label>cholesterol(mg) :        {detailsJson.data.cholesterolMg}</label>
            <label>fat saturated(mg) :        {detailsJson.data.fatSaturatedG}</label>
            <label>fat total(mg) :        {detailsJson.data.fatTotalG}</label>
            <label>protein(g) :        {detailsJson.data.proteinG}</label>
            <label>fiber(g) :        {detailsJson.data.fiberG}</label>
            <label>servingSize(g) :        {detailsJson.data.servingSizeG}</label>
            <label>sugar(g) :        {detailsJson.data.sugarG}</label>
        </div>
        </>
      );
  } else {
    return <div></div>
  }

  
}
 
export default NutritionDetails;
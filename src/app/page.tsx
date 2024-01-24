"use client"

import { ChangeEvent, useState } from "react";
import styles from "./page.module.css";
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import { v4 } from 'uuid'; // Importa uuid
import { db } from "./firebase_service";// Importa tu instancia de Firestore desde donde esté configurada
 
enum FoodType {
  Dairy = "FoodType.dairy",
  Drink = "FoodType.drink",
  Fruit = "FoodType.fruit",
  Grain = "FoodType.grain",
  Legume = "FoodType.legume",
  Meat = "FoodType.meat",
  Nut = "FoodType.nut",
  Processed = "FoodType.processed",
  Sweet = "FoodType.sweet",
  Vegetable = "FoodType.vegetable",
  Other = "FoodType.other",
}

interface Inputs {
  id: string;
  addedBy: string;
  name: string;
  foodType: FoodType;
  calories: number;
  proteins: number;
  carbs: number;
  fats: number;
}

export default function Home() {
  const initialInputs: Inputs = {
    id: "",
    name: "",
    foodType: FoodType.Other,
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    addedBy: "app",
  };
  
  const [inputs, setInputs] = useState<Inputs>(initialInputs);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const sanitizedValue = id === 'calories' || id === 'proteins' || id === 'carbs' || id === 'fats'
    ? value.replace(',', '.')
    : value;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: id === 'name' ? sanitizedValue : id === 'foodType' ? sanitizedValue as FoodType : parseFloat(sanitizedValue) }));
  };

  const handleSaveClick = async () => {
    try { 
      const uniqueId = v4(); // Genera un id único con uuid
      const newInputs = { ...inputs, id: uniqueId };
      await setDoc(doc(db, 'foods', uniqueId),  newInputs);  
      setInputs(initialInputs);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <main className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="foodType">Food Type</label>
        <select id="foodType" onChange={handleInputChange} value={inputs.foodType}>
          {Object.values(FoodType).map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="calories">Calories</label>
        <input type="number" id="calories" onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="proteins">Proteins</label>
        <input type="number" id="proteins" onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="carbs">Carbs</label>
        <input type="number" id="carbs" onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="fats">Fats</label>
        <input type="number" id="fats" onChange={handleInputChange} />
      </div>

      <button className={styles.saveButton} onClick={handleSaveClick}>
        Guardar
      </button>
    </main>
  );
}
"use client"
import { ChangeEvent, useState, useEffect } from "react";
import styles from "./page.module.css";
import { collection, addDoc, setDoc, doc, getDocs } from 'firebase/firestore';
import { v4 } from 'uuid'; // Importa uuid
import { db } from "./firebase_service";// Importa tu instancia de Firestore desde donde esté configurada 
import { Food, FoodType } from "@/models/food";


export default function Home() {
  const initialInputs: Food = {
    id: "",
    name: "",
    foodType: FoodType.Other,
    calories: 0,
    proteins: 0,
    carbs: 0,
    fats: 0,
    addedBy: "app",
  };
  
  const [inputs, setInputs] = useState<Food>(initialInputs);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });
  const [selectedFood, setSelectedFood] = useState<Food | null>(null); // Track selected food for editing

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    const sanitizedValue = id === 'calories' || id === 'proteins' || id === 'carbs' || id === 'fats' ? value.replace(',', '.') : value;
    setInputs((prevInputs) => ({ ...prevInputs, [id]: id === 'name' ? sanitizedValue : id === 'foodType' ? sanitizedValue as FoodType : parseFloat(sanitizedValue) }));
  };

  const handleFoodItemClick = (food: Food) => {
    setSelectedFood(food);
    setInputs(food);
  };

  const handleSaveClick = async () => {
    try {
      if (selectedFood) {
        // Update existing food
        await setDoc(doc(db, 'foods', selectedFood.id), inputs);
      } else {
        // Add new food
        const uniqueId = v4();
        await setDoc(doc(db, 'foods', uniqueId), { ...inputs, id: uniqueId });
      }
      setInputs(initialInputs);
      setSelectedFood(null); // Clear selected food after saving
    } catch (e) {
      console.error("Error adding/updating document: ", e);
    }
  };

  const [foodsList, setFoodsList] = useState<Food[]>([]);

  // Fetch data from Firestore and update the state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "foods"));
        const foodsData = querySnapshot.docs.map((doc) => doc.data() as Food);
        setFoodsList(foodsData);
      } catch (e) {
        console.error("Error fetching documents: ", e);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs once after the initial render

  const handleSortClick = (key: string) => {
    setSortConfig({
      key,
      direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });
  };

  const sortedFoodsList = [...foodsList].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
  
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
  
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
  
    // Handle other data types or fallback to default order
    return 0;
  });

  return (
    <main className={styles.container}>
      <div className={styles.inputContainer}>
        <label htmlFor="name">Name</label>
        <input type="text" id="name" value={inputs.name} onChange={handleInputChange} />
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
        <input type="number" id="calories" value={inputs.calories} onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="proteins">Proteins</label>
        <input type="number" id="proteins" value={inputs.proteins} onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="carbs">Carbs</label>
        <input type="number" id="carbs" value={inputs.carbs} onChange={handleInputChange} />
      </div>

      <div className={styles.inputContainer}>
        <label htmlFor="fats">Fats</label>
        <input type="number" id="fats" value={inputs.fats} onChange={handleInputChange} />
      </div>

      <button className={styles.saveButton} onClick={handleSaveClick}>
        Guardar
      </button>

      {/* List of documents */}
      <table className={styles.foodsTable}>
        <thead>
          <tr>
            <th onClick={() => handleSortClick('name')}>Name</th>
            <th onClick={() => handleSortClick('foodType')}>Food Type</th>
            <th onClick={() => handleSortClick('calories')}>Calories</th>
            <th onClick={() => handleSortClick('proteins')}>Proteins</th>
            <th onClick={() => handleSortClick('carbs')}>Carbs</th>
            <th onClick={() => handleSortClick('fats')}>Fats</th>
          </tr>
        </thead>
        <tbody>
          {sortedFoodsList.map((food) => (
            <tr key={food.id} className={styles.foodItem} onClick={() => handleFoodItemClick(food)}>
              <td>{food.name}</td>
              <td>{food.foodType}</td>
              <td>{food.calories}</td>
              <td>{food.proteins}</td>
              <td>{food.carbs}</td>
              <td>{food.fats}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 


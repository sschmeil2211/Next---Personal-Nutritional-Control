"use client"
import { ChangeEvent, useState, useEffect } from "react";
import styles from "./page.module.css";
import { Food, FoodType, MeasureType } from "@/app/models/food";
import { renderTableBody, renderTableHeader } from "../../components/tables";
import { useFood } from "@/app/providers/food_provider";
import FoodCard from "@/app/components/food_card";


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
        measureType: MeasureType.g
    };

    const [inputs, setInputs] = useState<Food>(initialInputs);
    const [selectedFood, setSelectedFood] = useState<Food | null>(null);
    const { foods, createFood, updateFood } = useFood();
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' }>({ key: '', direction: 'asc' });
    const [foodsList, setFoodsList] = useState<Food[]>([]);

    useEffect(() => setFoodsList(foods), [foods]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        if (id === 'foodType' || id === 'measureType')
            setInputs((prevInputs) => ({ ...prevInputs, [id]: value as FoodType | MeasureType }));
        else {
            const sanitizedValue = id === 'calories' || id === 'proteins' || id === 'carbs' || id === 'fats' ? value.replace(',', '.') : value;
            setInputs((prevInputs) => ({ ...prevInputs, [id]: id === 'name' ? sanitizedValue : parseFloat(sanitizedValue) }));
        }
    };

    const handleFoodItemClick = (food: Food) => {
        setSelectedFood(food);
        setInputs(food);
    };

    const handleSaveClick = async () => {
        try {
            selectedFood ? await updateFood(inputs) : await createFood(inputs);
            setInputs(initialInputs);
            setSelectedFood(null);
        } catch (e) {
            console.error('Error adding/updating document: ', e);
        }
    };

    const handleSortClick = (key: string) => setSortConfig({
        key,
        direction: sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc',
    });

    const sortedFoodsList = [...foodsList].sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (typeof aValue === 'string' && typeof bValue === 'string')
            return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        if (typeof aValue === 'number' && typeof bValue === 'number')
            return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
        return 0;
    });

    return (
        <main className={styles.container}>
            <FoodCard
                handleSaveClick={handleSaveClick}
                inputs={inputs}
                handleInputChange={handleInputChange}
            />
            <table className={styles.foodsTable}>
                <tbody>
                    {renderTableHeader({ handleSortClick })}
                    {renderTableBody({ sortedFoodsList, handleFoodItemClick })}
                </tbody>
            </table>
        </main>
    );
}


import React, { ChangeEvent } from 'react';
import Image from 'next/image';
import styles from "./page.module.css";
import { FoodType } from '@/app/models/food';

interface FoodTypeSelectorProps {
    selectedFoodType: FoodType;
    onSelectFoodType: (foodType: FoodType) => void;
}

const FoodTypeSelector: React.FC<FoodTypeSelectorProps> = ({ selectedFoodType, onSelectFoodType }) => {
    // Define an array of FoodType values
    const foodTypes: FoodType[] = [
        FoodType.Dairy,
        FoodType.Drink,
        FoodType.Fruit,
        FoodType.Grain,
        FoodType.Legume,
        FoodType.Meat,
        FoodType.Nut,
        FoodType.Processed,
        FoodType.Sweet,
        FoodType.Vegetable,
        FoodType.Other,
    ];

    const handleFoodTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value as FoodType;
        onSelectFoodType(selectedType);
    };  

    const path = selectedFoodType.split('.')[1];

    return (
        <div className={styles.container}>
            <select 
                className={styles.foodTypeSelector} // Add appropriate styling
                value={selectedFoodType}
                onChange={handleFoodTypeChange}
            >
                {foodTypes.map((type) => (
                    <option key={type} value={type}>{type.toString().split('.')[1].toUpperCase()}</option>
                ))}
            </select>
            <div className={styles.imageContainer}>
                <Image
                    src={require(`../../../assets/images/food_types/${path}.png`)}
                    alt='food type'
                    height={100}
                />
            </div>
        </div>
    );
};

export default FoodTypeSelector;
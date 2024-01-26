import React, { ChangeEvent } from 'react';
import styles from "./page.module.css";
import MacronutrientInput from '../macronutrient_input';
import CaloriesInput from '../calories_input';
import { FoodType } from '@/app/models/food';
import FoodTypeSelector from '../food_type_selector';

interface NutritionCardProps {
    inputs: {
        name: string;
        foodType: FoodType;
        calories: number;
        proteins: number;
        carbs: number;
        fats: number;
    };
    handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleSaveClick: () => void;
}

const FoodCard: React.FC<NutritionCardProps> = ({ inputs, handleInputChange, handleSaveClick }) => {

    return (
        <div className={styles.nutritionCard}>
            <div className={styles.nameContainer}>
                <div className={styles.name}>Nombre</div>
                <input
                    id='name'
                    className={styles.inputContainer}
                    value={inputs.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.nutritionInfo}>
                <FoodTypeSelector
                    onSelectFoodType={(foodType) => handleInputChange({ target: { id: 'foodType', value: foodType } } as ChangeEvent<HTMLSelectElement>)}
                    selectedFoodType={inputs.foodType}
                />
                <CaloriesInput
                    value={inputs.calories}
                    onChange={handleInputChange}
                />
                <div className={styles.macroInfo}>
                    <MacronutrientInput
                        id='carbs'
                        color='#FFFF00'
                        label='Carbs'
                        value={inputs.carbs}
                        onChange={handleInputChange}
                    />
                    <MacronutrientInput
                        id='proteins'
                        color='#03A9F4'
                        label='Proteins'
                        value={inputs.proteins}
                        onChange={handleInputChange}
                    />
                    <MacronutrientInput
                        id='fats'
                        color='#8BC34A'
                        label='Fats'
                        value={inputs.fats}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className={styles.perServing}>Every 100g</div>
            <button className={styles.saveButton} onClick={handleSaveClick}>
                Guardar
            </button>
        </div>
    );
};

export default FoodCard;
import React, { ChangeEvent } from "react";
import styles from "./page.module.css";
import { FoodType } from "@/app/models/food";

interface InputFieldsProps {
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

interface Field {
    label: string;
    id: string;
    type: string;
    value: string | number;
    options?: string[];
}

export const InputFields: React.FC<InputFieldsProps> = ({ inputs, handleInputChange, handleSaveClick }) => {
    const inputFields: Field[] = [
        { label: 'Name', id: 'name', type: 'text', value: inputs.name },
        { label: 'Food Type', id: 'foodType', type: 'text', value: inputs.foodType, options: Object.values(FoodType) },
        { label: 'Calories', id: 'calories', type: 'number', value: inputs.calories },
        { label: 'Proteins', id: 'proteins', type: 'number', value: inputs.proteins },
        { label: 'Carbs', id: 'carbs', type: 'number', value: inputs.carbs },
        { label: 'Fats', id: 'fats', type: 'number', value: inputs.fats },
    ];

    return (
        <>
            {inputFields.map((field) => (
                field.options
                    ? renderSelect(field.label, field.id, field.options, field.value, handleInputChange)
                    : renderInput(field.label, field.id, field.type, field.value, handleInputChange)
            ))}
        </>
    );
};

const renderInput = (label: string, id: string, type: string, value: string | number, onChange: (e: ChangeEvent<HTMLInputElement>) => void) => (
    <div className={styles.inputContainer} key={id}>
        <label htmlFor={id}>{label}</label>
        <input type={type} id={id} value={value} onChange={onChange} />
    </div>
);

const renderSelect = (label: string, id: string, options: string[], value: string | number, onChange: (e: ChangeEvent<HTMLSelectElement>) => void) => (
    <div className={styles.inputContainer} key={id}>
        <label htmlFor={id}>{label}</label>
        <select id={id} onChange={onChange} value={value}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    </div>
);
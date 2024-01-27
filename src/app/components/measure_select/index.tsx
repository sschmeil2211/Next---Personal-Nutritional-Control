import React, { ChangeEvent } from 'react'; 
import styles from "./page.module.css";
import { MeasureType } from '@/app/models/food';

interface MeasureTypeSelectorProps {
    selectedMeasureType: MeasureType;
    onSelectMeasureType: (foodType: MeasureType) => void;
}

const MeasureTypeSelector: React.FC<MeasureTypeSelectorProps> = ({ selectedMeasureType, onSelectMeasureType }) => {
    // Define an array of FoodType values
    const measureType: MeasureType[] = [
        MeasureType.g,
        MeasureType.ml, 
    ];

    const handleFoodTypeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const selectedType = e.target.value as MeasureType;
        onSelectMeasureType(selectedType);
    }; 
    return (
        <div className={styles.container}>
            <div className={styles.perServing}>Every 100
                <select
                    className={styles.measureTypeSelector} // Add appropriate styling
                    value={selectedMeasureType}
                    onChange={handleFoodTypeChange}
                >
                    {measureType.map((type) => (
                        <option key={type} value={type}>{type.toString().split('.')[1]}</option>
                    ))}
                </select> 
            </div> 
        </div>
    );
};

export default MeasureTypeSelector;
import React, { ChangeEvent } from 'react'; 
import styles from "./page.module.css"; 

interface CaloriesInputProps {  
    value: number 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const CaloriesInput: React.FC<CaloriesInputProps> = ({ 
    value,  
    onChange
}) => {
    return (
        <div className={styles.caloriesContainer}>
            <div className={styles.calories}>Calories</div>
            <input 
                id="calories"
                className={styles.caloriesValue} 
                type={'number'} 
                value={value}  
                onChange={onChange} 
            /> 
        </div> 
    );
};

export default CaloriesInput;
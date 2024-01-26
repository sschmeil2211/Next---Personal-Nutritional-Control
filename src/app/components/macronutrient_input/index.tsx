import React, { ChangeEvent } from 'react';
import styles from "./page.module.css";

interface MacronutrientInputProps { 
    id: string
    label: string,
    color: string,
    value: number,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const MacronutrientInput: React.FC<MacronutrientInputProps> = ({
    label, 
    value, 
    color,
    id,
    onChange
}) => {
    return (
        <div className={styles.macro}>
            <div className={styles.macroName}>{label}:</div>
            <input 
                className={styles.macroValue} 
                id={id}
                type={'number'}
                value={value} 
                style={{color}}
                onChange={onChange} 
            /> 
        </div>
    );
};

export default MacronutrientInput;
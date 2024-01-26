// components/tables.tsx
import React from 'react';
import { Food } from '@/app/models/food';
import Image from 'next/image';
import styles from "./page.module.css";

interface TableHeaderProps {
    handleSortClick: (key: string) => void;
}

export const renderTableHeader: React.FC<TableHeaderProps> = ({ handleSortClick }) => (
    <tr>
        <th onClick={() => handleSortClick('foodType')}>Food Type</th>
        <th onClick={() => handleSortClick('name')}>Name</th>
        <th onClick={() => handleSortClick('calories')}>Calories</th>
        <th onClick={() => handleSortClick('proteins')}>Proteins</th>
        <th onClick={() => handleSortClick('carbs')}>Carbs</th>
        <th onClick={() => handleSortClick('fats')}>Fats</th>
    </tr>
);

interface TableBodyProps {
    sortedFoodsList: Food[];
    handleFoodItemClick: (food: Food) => void;
}

export const renderTableBody: React.FC<TableBodyProps> = ({ sortedFoodsList, handleFoodItemClick }) => (
    <>
        {sortedFoodsList.map((food) => (
            <tr key={food.id} onClick={() => handleFoodItemClick(food)}>
                <td className={styles.column}>
                    <Image
                        src={require(`../../../assets/images/food_types/${food.foodType.split('.')[1].toLowerCase()}.png`)}
                        alt='food type'
                        height={25}
                    />
                </td>
                <td className={styles.column}>{food.name}</td>
                <td className={styles.column}>{food.calories}</td>
                <td className={styles.column}>{food.proteins}</td>
                <td className={styles.column}>{food.carbs}</td>
                <td className={styles.column}>{food.fats}</td>
            </tr>
        ))}
    </>
);
// components/tables.tsx
import React from 'react';
import { Food } from '@/app/models/food';

interface TableHeaderProps {
    handleSortClick: (key: string) => void;
}

export const renderTableHeader: React.FC<TableHeaderProps> = ({ handleSortClick }) => (
    <tr>
        <th onClick={() => handleSortClick('name')}>Name</th>
        <th onClick={() => handleSortClick('foodType')}>Food Type</th>
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
            <tr key={food.id} /* className={styles.foodItem} */ onClick={() => handleFoodItemClick(food)}>
                <td>{food.name}</td>
                <td>{food.foodType}</td>
                <td>{food.calories}</td>
                <td>{food.proteins}</td>
                <td>{food.carbs}</td>
                <td>{food.fats}</td>
            </tr>
        ))}
    </>
);
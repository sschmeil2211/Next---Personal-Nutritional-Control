import { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { Food } from "@/app/models/food";
import { FoodRepository } from "../repositories/food_repository";

interface FoodProviderProps {
    children: ReactNode;
}

interface FoodContextType {
    foods: Food[];
    createFood: (food: Food) => Promise<void>;
    updateFood: (food: Food) => Promise<void>;
}

const FoodContext = createContext<FoodContextType | undefined>(undefined);

export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
    const [foods, setFoods] = useState<Food[]>([]);
    const foodRepository = new FoodRepository();

    useEffect(() => {
        const fetchData = async () => {
            const foodsData = await foodRepository.getAllFoods();
            setFoods(foodsData);
        };

        fetchData();
    }, []);

    const createFood = async (food: Food): Promise<void> => {
        await foodRepository.createFood(food);
        setFoods([...foods, food]);
    };

    const updateFood = async (food: Food): Promise<void> => {
        await foodRepository.updateFood(food);
        setFoods((prevFoods) => prevFoods.map((f) => (f.id === food.id ? food : f)));
    };

    return (
        <FoodContext.Provider value={{ foods, createFood, updateFood }}>
            {children}
        </FoodContext.Provider>
    );
};

export const useFood = (): FoodContextType => {
    const context = useContext(FoodContext);
    if (!context) {
        throw new Error('useFood must be used within a FoodProvider');
    }
    return context;
};
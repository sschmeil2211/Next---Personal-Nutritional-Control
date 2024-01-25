import { collection, setDoc, doc, getDocs } from 'firebase/firestore'; 
import { db } from "../firebase_service";
import { v4 } from 'uuid'; // Importa uuid
import { Food } from "@/app/models/food";

export class FoodRepository {
    async createFood(food: Food): Promise<void> {
        const uniqueId = food.id || v4();
        await setDoc(doc(db, 'foods', uniqueId), { ...food, id: uniqueId });
    }

    async updateFood(food: Food): Promise<void> {
        if (food.id) 
            await setDoc(doc(db, 'foods', food.id), food); 
    }

    async getAllFoods(): Promise<Food[]> {
        const querySnapshot = await getDocs(collection(db, 'foods'));
        return querySnapshot.docs.map((doc) => doc.data() as Food);
    }
}
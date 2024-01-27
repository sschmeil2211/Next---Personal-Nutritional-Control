export interface Food {
    id: string;
    addedBy: string;
    name: string;
    foodType: FoodType;
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    measureType: MeasureType
    [key: string]: string | number; // Add an index signature
}

export enum FoodType {
    Dairy = "FoodType.dairy",
    Drink = "FoodType.drink",
    Fruit = "FoodType.fruit",
    Grain = "FoodType.grain",
    Legume = "FoodType.legume",
    Meat = "FoodType.meat",
    Nut = "FoodType.nut",
    Processed = "FoodType.processed",
    Sweet = "FoodType.sweet",
    Vegetable = "FoodType.vegetable",
    Other = "FoodType.other",
}

export enum MeasureType{
    g = "MeasureType.g",
    ml = "MeasureType.ml",
}

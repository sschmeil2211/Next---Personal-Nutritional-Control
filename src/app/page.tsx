"use client" 
import { FoodProvider } from './providers/food_provider';
import Home from "./screens/Home";


export default function app() {
  return (
    <FoodProvider>
      <Home />
    </FoodProvider>
  );
}
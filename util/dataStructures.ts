import { AnimalsFoods } from '../migrations/00004-createTableAnimalFoods';

export function reduceAnimalsWithFoods(animalsWithFoods: AnimalsFoods[]) {
  const animalWithFood = animalsWithFoods[0];

  if (!animalWithFood) {
    throw new Error('No animal found');
  }

  const animalWithFoods = {
    id: animalWithFood.animalId,
    firstName: animalWithFood.animalFirstName,
    type: animalWithFood.animalType,
    accessory: animalWithFood.animalAccessory,
    birthDate: animalWithFood.animalBirthDate,
    animalFoods: animalsWithFoods.map((animal) => {
      return {
        id: animal.animalFoodId,
        name: animal.animalFoodName,
        type: animal.animalFoodType,
      };
    }),
  };
  return animalWithFoods;
}

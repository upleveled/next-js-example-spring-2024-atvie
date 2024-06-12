import { expect, test } from '@jest/globals';
import { reduceAnimalsWithFoods } from '../dataStructures';

const animalWithFood = [
  {
    animalId: 1,
    animalFirstName: 'Lucia',
    animalType: 'Lion',
    animalAccessory: 'Car',
    animalBirthDate: new Date(),
    animalFoodId: 4,
    animalFoodName: 'Mango',
    animalFoodType: 'Fruit',
  },
  {
    animalId: 1,
    animalFirstName: 'Lucia',
    animalType: 'Lion',
    animalAccessory: 'Car',
    animalBirthDate: new Date(),
    animalFoodId: 3,
    animalFoodName: 'Rice',
    animalFoodType: 'Grain',
  },
];

const reducedAnimalWithFoods = {
  id: 1,
  firstName: 'Lucia',
  type: 'Lion',
  accessory: 'Car',
  birthDate: new Date(),
  animalFoods: [
    { id: 4, name: 'Mango', type: 'Fruit' },
    { id: 3, name: 'Rice', type: 'Grain' },
  ],
};

test('reduce animal favorite foods', () => {
  expect(reduceAnimalsWithFoods(animalWithFood)).toStrictEqual(
    reducedAnimalWithFoods,
  );
});

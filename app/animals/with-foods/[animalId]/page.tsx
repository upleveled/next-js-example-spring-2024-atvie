import Image from 'next/image';
import { notFound } from 'next/navigation';
import {
  getAnimalsWithFoodsInsecure,
  getAnimalWithFoodsInsecure,
} from '../../../../database/animals';
import { reduceAnimalsWithFoods } from '../../../../util/dataStructures';

type Props = {
  params: Promise<{
    animalId: string;
  }>;
};

export default async function AnimalFoodsPage(props: Props) {
  const params = await props.params;

  const animalsWithFood = await getAnimalsWithFoodsInsecure(
    Number(params.animalId),
  );

  const animalWithFoodsArray = await getAnimalWithFoodsInsecure(
    Number(params.animalId),
  );

  if (!animalsWithFood[0] || !animalWithFoodsArray) {
    notFound();
  }

  console.log(animalsWithFood);

  const animalWithFoods = reduceAnimalsWithFoods(animalsWithFood);

  console.log(animalWithFoods);

  return (
    <div>
      <h1>
        {animalWithFoods.firstName} (using data transformation in JavaScript)
      </h1>
      <Image
        src={`/images/${animalWithFoods.firstName.toLowerCase()}.webp`}
        alt={`A picture of ${animalWithFoods.firstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoods.type} carrying a {animalWithFoods.accessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoods.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-foods-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
      <br />
      <br />
      <br />
      <h1>
        {animalWithFoodsArray.animalFirstName} (using data transformation in SQL
        - using json_agg)
      </h1>
      <Image
        src={`/images/${animalWithFoodsArray.animalFirstName.toLowerCase()}.webp`}
        alt={`A picture of ${animalWithFoodsArray.animalFirstName}`}
        width={200}
        height={200}
      />
      <p>
        This is a {animalWithFoodsArray.animalType} carrying a{' '}
        {animalWithFoodsArray.animalAccessory}
      </p>
      <br />
      Who likes:
      <ul>
        {animalWithFoodsArray.animalFoods.map((animalFood) => {
          return (
            <li key={`animal-with-food-${animalFood.name}-${animalFood.id}`}>
              {animalFood.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

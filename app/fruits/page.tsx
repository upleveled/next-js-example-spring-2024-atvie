import Link from 'next/link';
import { fruits } from '../../database/fruits';
import { getCookie } from '../../util/cookies';
import { parseJson } from '../../util/json';
import { FruitComment } from './[fruitId]/actions';

// const fruits = [
//   { id: 1, name: 'Apple', icon: '🍎' },
//   { id: 2, name: 'Banana', icon: '🍌' },
//   { id: 3, name: 'Kiwi', icon: '🥝' },
//   { id: 4, name: 'Strawberry', icon: '🍓' },
//   { id: 5, name: 'Orange', icon: '🍊' },
// ]

// const cookie = [
//   { id: 1, comment: 'asdasd' },
//   { id: 4, comment: 'qweqwe' },
// ];

// Combine fruits with comments from cookies
// [
//   { id: 1, name: 'Apple', icon: '🍎', comment: 'asdasd' },
//   { id: 2, name: 'Banana', icon: '🍌', comment: undefined },
//   { id: 3, name: 'Kiwi', icon: '🥝', comment: undefined },
//   { id: 4, name: 'Strawberry', icon: '🍓', comment: 'qweqwe' },
//   { id: 5, name: 'Orange', icon: '🍊', comment: undefined },
// ]

export default async function FruitsPage() {
  // get cookie and parse it!
  const fruitsCommentsCookie = await getCookie('fruitComments');

  let fruitComments = parseJson(fruitsCommentsCookie) as FruitComment[];

  if (!Array.isArray(fruitComments)) {
    // Don't communicate error to user, use empty array instead
    fruitComments = [];
  }

  return (
    <>
      <h1>Fruits</h1>
      {fruits.map((fruit) => {
        const fruitComment = fruitComments.find(
          // (fruitObject: (typeof fruits)[number]) => fruit.id === fruitObject.id,
          (fruitObject) => fruit.id === fruitObject.id,
        );

        return (
          <div key={`fruit-${fruit.id}`}>
            <Link href={`/fruits/${fruit.id}`}>
              <h2>
                {fruit.icon} {fruit.name}
              </h2>
            </Link>
            <div>{fruitComment?.comment}</div>
          </div>
        );
      })}
    </>
  );
}

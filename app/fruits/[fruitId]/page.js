import { notFound } from 'next/navigation';
import { getFruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import FruitCommentForm from './FruitCommentPage';

export default function SingleFruitPage(props) {
  const fruit = getFruit(Number(props.params.fruitId));

  if (!fruit) {
    notFound();
  }

  // get cookie and parse it!
  const fruitsCommentsCookie = getCookie('fruitComments');

  const fruitsComments = JSON.parse(fruitsCommentsCookie);

  const fruitCommentToDisplay = fruitsComments.find((fruitComment) => {
    return fruitComment.id === fruit.id;
  });

  return (
    <>
      <h1>Fruit page</h1>
      <h2>
        {fruit.name} {fruit.icon}
      </h2>
      {/* Optional Chaining, means if fruitCommentToDisplay === undefined, return undefined, else display fruitCommentToDisplay.comment */}
      <div>{fruitCommentToDisplay?.comment}</div>
      <FruitCommentForm fruitId={fruit.id} />
    </>
  );
}

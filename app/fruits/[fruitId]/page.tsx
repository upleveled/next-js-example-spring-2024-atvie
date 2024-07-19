import { notFound } from 'next/navigation';
import { getFruit } from '../../../database/fruits';
import { getCookie } from '../../../util/cookies';
import { parseJson } from '../../../util/json';
import { FruitComment } from './actions';
import FruitCommentForm from './FruitCommentForm';

type Props = {
  params: {
    fruitId: string;
  };
};

export default function SingleFruitPage(props: Props) {
  const fruit = getFruit(Number(props.params.fruitId));

  if (!fruit) {
    notFound();
  }

  // get cookie and parse it!
  const fruitsCommentsCookie = getCookie('fruitComments');

  let fruitComments = parseJson(fruitsCommentsCookie) as FruitComment[];

  if (!Array.isArray(fruitComments)) {
    fruitComments = [];
  }

  const fruitCommentToDisplay = fruitComments.find(
    (fruitComment: FruitComment) => {
      return fruitComment.id === fruit.id;
    },
  );

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

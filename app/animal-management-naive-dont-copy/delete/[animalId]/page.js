import { notFound } from 'next/navigation';
import { deleteAnimalInsecure } from '../../../../database/animals';

export default async function DeleteAnimalNaivePage(props) {
  const animal = await deleteAnimalInsecure({
    id: Number(props.params.animalId),
  });

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} and first name {animal.firstName} Deleted
    </div>
  );
}

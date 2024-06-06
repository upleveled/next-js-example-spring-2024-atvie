import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

export default async function UpdateAnimalNaivePage(props) {
  const animal = await updateAnimalInsecure({
    id: Number(props.params.animalId),
    firstName: props.searchParams.firstName,
    type: props.searchParams.type,
    accessory: props.searchParams.accessory,
    birthDate: props.searchParams.birthDate,
  });

  if (!animal) {
    notFound();
  }

  return (
    <div>
      Animal with id {animal.id} updated with new name {animal.firstName}
    </div>
  );
}

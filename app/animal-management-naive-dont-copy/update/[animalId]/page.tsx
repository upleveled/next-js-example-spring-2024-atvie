import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

type Props = {
  params: {
    animalId: string;
  };
  searchParams: {
    firstName: string;
    type: string;
    accessory: string;
    birthDate: string;
  };
};

export default async function UpdateAnimalNaivePage(props: Props) {
  const animal = await updateAnimalInsecure({
    id: Number(props.params.animalId),
    firstName: props.searchParams.firstName,
    type: props.searchParams.type,
    accessory: props.searchParams.accessory,
    birthDate: new Date(props.searchParams.birthDate),
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

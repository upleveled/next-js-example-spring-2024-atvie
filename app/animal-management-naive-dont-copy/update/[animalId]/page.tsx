import { notFound } from 'next/navigation';
import { updateAnimalInsecure } from '../../../../database/animals';

type Props = {
  params: Promise<{
    animalId: string;
  }>;
  searchParams: Promise<{
    firstName: string;
    type: string;
    accessory: string;
    birthDate: string;
  }>;
};

export default async function UpdateAnimalNaivePage(props: Props) {
  const params = await props.params;
  const searchParams = await props.searchParams;

  const animal = await updateAnimalInsecure({
    id: Number(params.animalId),
    firstName: searchParams.firstName,
    type: searchParams.type,
    accessory: searchParams.accessory,
    birthDate: new Date(searchParams.birthDate),
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

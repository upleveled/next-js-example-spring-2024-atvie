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
  const animal = await updateAnimalInsecure({
    id: Number((await props.params).animalId),
    firstName: (await props.searchParams).firstName,
    type: (await props.searchParams).type,
    accessory: (await props.searchParams).accessory,
    birthDate: new Date((await props.searchParams).birthDate),
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

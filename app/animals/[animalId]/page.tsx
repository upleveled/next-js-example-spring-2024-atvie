import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalInsecure } from '../../../database/animals';

export async function generateMetadata(props: Props) {
  const singleAnimal = await getAnimalInsecure(Number(props.params.animalId));

  return {
    title: singleAnimal?.firstName,
    description: 'Single Animal Page',
  };
}

type Props = {
  params: {
    animalId: string;
  };
};

export default async function AnimalPage(props: Props) {
  const singleAnimal = await getAnimalInsecure(Number(props.params.animalId));

  console.log('Single animal: ', singleAnimal);

  if (!singleAnimal) {
    notFound();
  }

  const currentDate = new Date();

  // Create new date object to avoid mutating the original birth date
  const nextBirthDate = new Date(singleAnimal.birthDate);

  // Set birth date year to current year
  nextBirthDate.setUTCFullYear(currentDate.getFullYear());

  // Set UTC time to 0 to compare only days (avoid time zones)
  currentDate.setUTCHours(0, 0, 0, 0);
  nextBirthDate.setUTCHours(0, 0, 0, 0);

  if (nextBirthDate.getTime() < currentDate.getTime()) {
    nextBirthDate.setUTCFullYear(currentDate.getFullYear() + 1);
  }

  const daysUntilNextBirthDay =
    (nextBirthDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24);

  return (
    <div>
      <h1>{singleAnimal.firstName}</h1>
      <div>
        Birth Date:{' '}
        {singleAnimal.birthDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </div>
      <div>Days left until birthday: {daysUntilNextBirthDay}</div>

      <div>
        <Image
          src={`/images/${singleAnimal.firstName.toLowerCase()}.webp`}
          alt={singleAnimal.firstName}
          width={300}
          height={300}
        />
        this is a {singleAnimal.type} carrying {singleAnimal.accessory}
      </div>
    </div>
  );
}

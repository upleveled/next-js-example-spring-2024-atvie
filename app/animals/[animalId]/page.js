import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getAnimalInsecure } from '../../../database/animals';
import { formatDate, getDaysUntilNextBirthday } from '../../../util/dates';

export async function generateMetadata(props) {
  const singleAnimal = await getAnimalInsecure(Number(props.params.animalId));

  return {
    title: singleAnimal?.firstName,
    description: 'Single Animal Page',
  };
}

export default async function AnimalPage(props) {
  const singleAnimal = await getAnimalInsecure(Number(props.params.animalId));

  console.log('Single animal: ', singleAnimal);

  if (!singleAnimal) {
    notFound();
  }

  const currentDate = new Date();

  const daysUntilNextBirthDay = getDaysUntilNextBirthday(
    currentDate,
    singleAnimal.birthDate,
  );

  return (
    <div>
      <h1>{singleAnimal.firstName}</h1>
      <div>Birth Date: {formatDate(singleAnimal.birthDate)}</div>
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

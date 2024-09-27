import { notFound } from 'next/navigation';
import { createAnimalInsecure } from '../../../database/animals';

// searchParams
// ?firstName=Lucia&type=Duck&accessory=Bike&birthDate=2020-04-10

export default async function CreateAnimalNaivePage(props) {
  const searchParams = await props.searchParams;

  const animal = await createAnimalInsecure({
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
      <h1>{animal.firstName}</h1>
      <p>has been created with the following information</p>
      <p>Type: {animal.type}</p>
      <p>Accessory: {animal.accessory}</p>
      <p>
        Birth date:{' '}
        {animal.birthDate.toLocaleDateString('en-GB', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        })}
      </p>
    </div>
  );
}

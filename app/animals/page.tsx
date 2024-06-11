import Image from 'next/image';
import Link from 'next/link';
import { getAnimalsInsecure } from '../../database/animals';

export default async function AnimalsPage() {
  const animals = await getAnimalsInsecure();

  return (
    <div>
      These are my animals
      {animals.map((animal) => {
        return (
          <div
            key={`animals-${animal.id}`}
            data-test-id={`animal-type-${animal.type}`}
          >
            <Link href={`/animals/${animal.id}`}>
              <div>{animal.firstName}</div>
              <Image
                src={`/images/${animal.firstName.toLowerCase()}.webp`}
                alt={animal.firstName}
                width={300}
                height={200}
              />
            </Link>
          </div>
        );
      })}
    </div>
  );
}

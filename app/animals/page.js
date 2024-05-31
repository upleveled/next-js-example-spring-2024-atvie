import Image from 'next/image';
import Link from 'next/link';
import { getAnimals } from '../../database/animals';

export default function AnimalsPage() {
  const animals = getAnimals();

  return (
    <div>
      This are my animals
      {animals.map((animal) => {
        return (
          <div key={`animals-${animal.id}`}>
            <Link href={`/animals/${animal.id}`}>
              <div>{animal.firstName}</div>
              <Image
                src={`/images/${animal.firstName.toLowerCase()}.webp`}
                alt=""
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

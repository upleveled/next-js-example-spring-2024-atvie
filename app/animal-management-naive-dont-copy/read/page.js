import Image from 'next/image';
import Link from 'next/link';
import { getAnimalsInsecure } from '../../../database/animals';

export default async function AnimalsNaivePage() {
  const animals = await getAnimalsInsecure();

  return (
    <div>
      This are my animals
      {animals.map((animal) => {
        return (
          <div key={`animals-${animal.id}`}>
            <Link href={`/animal-management-naive-dont-copy/read/${animal.id}`}>
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

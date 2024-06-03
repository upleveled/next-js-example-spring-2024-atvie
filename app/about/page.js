export const metadata = {
  title: 'About',
  description: 'This is my about me page',
};

export default function AboutPage() {
  const myComplexObject = { name: 'Karl', age: 40 };

  console.log(myComplexObject);

  const myComplexObjectAsString = JSON.stringify(myComplexObject);

  console.log(myComplexObjectAsString);

  const myComplexObjectAsObject = JSON.parse(myComplexObjectAsString);

  console.log(myComplexObjectAsObject);

  return (
    <div>
      <h1>My About page</h1>
      <div>Render undefined, null, true, false</div>
      <div>{(undefined, null, true, false)}</div>
      {/* <div>{JSON.stringify([undefined])}</div>  */}
      <div>{JSON.stringify([undefined, null, true, false])}</div>
      <div>{myComplexObjectAsString}</div>
    </div>
  );
}

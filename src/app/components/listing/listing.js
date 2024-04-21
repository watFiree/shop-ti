export const Listing = ({ name, products }) => {
  return (
    <div>
      <h1>{name}</h1>
      {products.map(({ id, name, price }) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{price}</p>
        </div>
      ))}
    </div>
  );
};

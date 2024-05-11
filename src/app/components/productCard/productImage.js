import { useState, useEffect } from "react";
import Image from "next/image";

export const ProductImage = ({ alt, src, ...props }) => {
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
  }, [src]);

  return (
    <Image
      alt={alt}
      onError={setError}
      src={error ? "/productImage_fallback.webp" : src}
      {...props}
    />
  );
};

// src/componen/Kartu.tsx
import type { ReactNode } from 'react';

interface KartuProps {
  judul: string;
  children: ReactNode; // isi bebas yang diletakkan di antara <Kartu> dan </Kartu>
}

// Komponen pembungkus: judul dikirim lewat props, isi dikirim lewat children
function Kartu({ judul, children }: KartuProps) {
  return (
    <section className="kartu">
      <h2>{judul}</h2>
      {children}
    </section>
  );
}

export default Kartu;

// src/componen/ItemTransaksi.tsx
import { formatRupiah } from '../utils';
import type { Transaksi } from '../types';

interface ItemTransaksiProps {
  transaksi: Transaksi;
  onHapus: (id: string) => void; // fungsi pelapor milik App
}

function ItemTransaksi({ transaksi, onHapus }: ItemTransaksiProps) {
  const adalahPemasukan = transaksi.jenis === 'pemasukan';

  return (
    // className dinamis: 'item pemasukan' atau 'item pengeluaran'
    <li className={`item ${transaksi.jenis}`}>
      <div className="item-info">
        <span className="item-ket">{transaksi.keterangan}</span>
        <span className="item-jenis">{adalahPemasukan ? 'Pemasukan' : 'Pengeluaran'}</span>
      </div>

      {/* Pemasukan berwarna hijau, pengeluaran berwarna merah (diatur lewat CSS) */}
      <span className={`nominal ${transaksi.jenis}`}>
        {adalahPemasukan ? '+' : '-'} {formatRupiah(transaksi.nominal)}
      </span>

      {/* Dibungkus arrow function agar onHapus tidak langsung berjalan saat render */}
      <button
        type="button"
        className="tombol tombol-merah tombol-kecil"
        aria-label={`Hapus transaksi ${transaksi.keterangan}`}
        onClick={() => onHapus(transaksi.id)}
      >
        Hapus
      </button>
    </li>
  );
}

export default ItemTransaksi;

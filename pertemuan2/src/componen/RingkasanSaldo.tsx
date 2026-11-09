// src/componen/RingkasanSaldo.tsx
import { formatRupiah } from '../utils';

interface RingkasanSaldoProps {
  totalPemasukan: number;
  totalPengeluaran: number;
  saldo: number;
}

// Komponen tampilan saja: semua angka sudah dihitung oleh App dan dikirim lewat props
function RingkasanSaldo({ totalPemasukan, totalPengeluaran, saldo }: RingkasanSaldoProps) {
  return (
    <div className="ringkasan-saldo">
      <div className="saldo-utama">
        <span className="saldo-label">Total saldo</span>
        {/* className dinamis: saldo minus ditampilkan dengan warna berbeda */}
        <strong className={saldo < 0 ? 'saldo-angka negatif' : 'saldo-angka'}>
          {formatRupiah(saldo)}
        </strong>
      </div>

      <div className="saldo-rinci">
        <div className="kotak pemasukan">
          <span className="kotak-label">Pemasukan</span>
          <strong>{formatRupiah(totalPemasukan)}</strong>
        </div>
        <div className="kotak pengeluaran">
          <span className="kotak-label">Pengeluaran</span>
          <strong>{formatRupiah(totalPengeluaran)}</strong>
        </div>
      </div>
    </div>
  );
}

export default RingkasanSaldo;

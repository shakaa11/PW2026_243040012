// src/App.tsx
import { useEffect, useState } from 'react';
import './App.css';
import Kartu from './componen/Kartu';
import RingkasanSaldo from './componen/RingkasanSaldo';
import FormTransaksi from './componen/FormTransaksi';
import ItemTransaksi from './componen/ItemTransaksi';
import type { Transaksi, TransaksiBaru } from './types';

// Kunci (nama laci) tempat data disimpan di localStorage
const KUNCI_STORAGE = 'catatan-keuangan';

// Membaca data tersimpan. Jika kosong atau isinya rusak, pakai array kosong.
function bacaDataTersimpan(): Transaksi[] {
  const dataTersimpan = localStorage.getItem(KUNCI_STORAGE);
  if (!dataTersimpan) return [];

  try {
    const hasil: unknown = JSON.parse(dataTersimpan); // ubah teks JSON kembali menjadi array
    return Array.isArray(hasil) ? (hasil as Transaksi[]) : [];
  } catch {
    return []; // isi localStorage bukan JSON yang valid
  }
}

function App() {
  // 1. State utama: daftar transaksi. Fungsi di dalam useState() hanya dijalankan SEKALI,
  //    yaitu saat aplikasi pertama kali tampil, sehingga localStorage tidak dibaca berulang.
  const [daftarTransaksi, setDaftarTransaksi] = useState<Transaksi[]>(() => bacaDataTersimpan());

  // 2. Efek samping: simpan ke localStorage setiap kali daftarTransaksi berubah
  useEffect(() => {
    localStorage.setItem(KUNCI_STORAGE, JSON.stringify(daftarTransaksi)); // array -> teks JSON
  }, [daftarTransaksi]);

  // 3. Menambah transaksi: buat array BARU berisi transaksi lama + transaksi baru
  const tambahTransaksi = (transaksiBaru: TransaksiBaru) => {
    const transaksi: Transaksi = { id: Date.now().toString(), ...transaksiBaru };
    setDaftarTransaksi([...daftarTransaksi, transaksi]);
  };

  // 4. Menghapus transaksi: ambil semua transaksi KECUALI yang id-nya sama
  const hapusTransaksi = (id: string) => {
    setDaftarTransaksi(daftarTransaksi.filter((transaksi) => transaksi.id !== id));
  };

  // 5. Nilai turunan: dihitung dari state setiap render, TIDAK disimpan sebagai state baru
  const totalPemasukan = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pemasukan')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const totalPengeluaran = daftarTransaksi
    .filter((transaksi) => transaksi.jenis === 'pengeluaran')
    .reduce((jumlah, transaksi) => jumlah + transaksi.nominal, 0);

  const saldo = totalPemasukan - totalPengeluaran;

  return (
    <div className="wadah">
      <h1 className="judul">Catatan Keuangan Mini</h1>
      <p className="subjudul">Praktikum Web - Modul 2: Tugas Terstruktur</p>

      <Kartu judul="Ringkasan Saldo">
        <RingkasanSaldo
          totalPemasukan={totalPemasukan}
          totalPengeluaran={totalPengeluaran}
          saldo={saldo}
        />
      </Kartu>

      <Kartu judul="Tambah Transaksi">
        <FormTransaksi onTambah={tambahTransaksi} />
      </Kartu>

      <Kartu judul="Daftar Transaksi">
        {/* Conditional rendering dengan ternary: tampilkan pesan jika belum ada transaksi */}
        {daftarTransaksi.length === 0 ? (
          <p className="kosong">Belum ada transaksi. Yuk catat pemasukan atau pengeluaran pertamamu!</p>
        ) : (
          <ul className="daftar">
            {daftarTransaksi.map((transaksi) => (
              <ItemTransaksi key={transaksi.id} transaksi={transaksi} onHapus={hapusTransaksi} />
            ))}
          </ul>
        )}
      </Kartu>
    </div>
  );
}

export default App;

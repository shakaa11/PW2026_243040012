// src/types.ts - tipe data yang dipakai bersama oleh beberapa komponen

// Union type: jenis transaksi hanya boleh salah satu dari dua nilai ini
export type JenisTransaksi = 'pemasukan' | 'pengeluaran';

// Bentuk satu transaksi yang disimpan di state
export interface Transaksi {
  id: string;
  keterangan: string;
  nominal: number; // disimpan sebagai ANGKA (hasil Number(...) dari input teks)
  jenis: JenisTransaksi;
}

// Data transaksi yang dikirim formulir ke App (belum punya id, id dibuat oleh App)
export type TransaksiBaru = Omit<Transaksi, 'id'>;

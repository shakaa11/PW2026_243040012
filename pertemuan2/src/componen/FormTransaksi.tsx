// src/componen/FormTransaksi.tsx
import { useState, type FormEvent } from 'react';
import type { JenisTransaksi, TransaksiBaru } from '../types';

interface FormTransaksiProps {
  // Fungsi milik App yang dititipkan lewat props: anak "melapor" dengan memanggilnya
  onTambah: (transaksi: TransaksiBaru) => void;
}

const BATAS_KARAKTER = 50;

function FormTransaksi({ onTambah }: FormTransaksiProps) {
  // Tiga state lokal, satu untuk setiap kolom formulir (formulir terkendali)
  const [keterangan, setKeterangan] = useState('');
  const [nominal, setNominal] = useState(''); // nilai dari <input> SELALU berupa teks
  const [jenis, setJenis] = useState<JenisTransaksi>('pemasukan');

  // Nilai turunan: dihitung dari state, tidak perlu state baru
  const angka = Number(nominal); // ubah teks menjadi angka sebelum dipakai menghitung
  const nominalValid = Number.isFinite(angka) && angka > 0;
  const nominalSalah = nominal !== '' && !nominalValid;
  const keteranganTerlaluPanjang = keterangan.length > BATAS_KARAKTER;
  const tidakValid = keterangan.trim() === '' || keteranganTerlaluPanjang || !nominalValid;

  const tanganiKirim = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // mencegah halaman reload saat formulir dikirim
    if (tidakValid) return; // hentikan jika input tidak valid

    onTambah({ keterangan: keterangan.trim(), nominal: angka, jenis }); // "melapor" ke App
    setKeterangan(''); // kosongkan kembali input
    setNominal('');
  };

  return (
    <form onSubmit={tanganiKirim}>
      <div className="kolom">
        <label className="label" htmlFor="keterangan">Keterangan</label>
        <input
          id="keterangan"
          className="input"
          type="text"
          placeholder="Contoh: Uang saku bulanan"
          value={keterangan}
          onChange={(event) => setKeterangan(event.target.value)}
        />
      </div>
      {keteranganTerlaluPanjang && (
        <p className="galat">Keterangan maksimal {BATAS_KARAKTER} karakter.</p>
      )}

      <div className="baris">
        <div className="kolom">
          <label className="label" htmlFor="nominal">Nominal (Rp)</label>
          <input
            id="nominal"
            className="input"
            type="number"
            min="1"
            placeholder="Contoh: 50000"
            value={nominal}
            onChange={(event) => setNominal(event.target.value)}
          />
        </div>

        <div className="kolom">
          <label className="label" htmlFor="jenis">Jenis</label>
          <select
            id="jenis"
            className="input"
            value={jenis}
            onChange={(event) => setJenis(event.target.value as JenisTransaksi)}
          >
            <option value="pemasukan">Pemasukan</option>
            <option value="pengeluaran">Pengeluaran</option>
          </select>
        </div>

        <button className="tombol" type="submit" disabled={tidakValid}>
          Tambah
        </button>
      </div>
      {nominalSalah && <p className="galat">Nominal harus berupa angka lebih dari 0.</p>}
    </form>
  );
}

export default FormTransaksi;

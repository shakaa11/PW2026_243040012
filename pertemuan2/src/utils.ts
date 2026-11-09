// src/utils.ts - fungsi bantu

// Mengubah angka menjadi format rupiah, misalnya 5000 menjadi "Rp 5.000"
export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(angka);
}

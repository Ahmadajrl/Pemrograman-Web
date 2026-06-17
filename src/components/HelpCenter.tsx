/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HelpCircle, PhoneCall, BookOpen, Clock, HeartHandshake } from 'lucide-react';

export default function HelpCenter() {
  const faqs = [
    {
      q: "Bagaimana cara meminjam barang di AssetPro?",
      a: "Bagi Karyawan, silakan klik tombol besar 'Scan to Borrow Asset' di Dashboard, arahkan kamera ke barcode barang, atau masukan serial kode aset secara manual. Barang akan otomatis ditandai dan tercatat di bawah akun profil Anda."
    },
    {
      q: "Berapa lama batas waktu (due date) pinjaman?",
      a: "Secara bawaan sistem, batas waktu peminjaman adalah 14 hari kerja. Jika melewati batas tempo, sistem akan mengirimkan notifikasi penalti dan barang akan ditandai dengan status 'Terlambat/Overdue'."
    },
    {
      q: "Bagaimana cara melakukan pengembalian barang?",
      a: "Pengembalian barang dapat diproses langsung oleh Admin Logistics melalui tombol 'Scan Pengembalian' di Dashboard, atau dengan mengklik ikon 'Kembalikan' pada list inventaris terkait."
    },
    {
      q: "Siapa yang harus dihubungi jika terjadi kendala teknis atau scanner error?",
      a: "Silakan hubungi IT Support Desk langsung melalui Telepon Ekstensi atau Ext. 404 pada jam operasional kantor (08:00 - 17:00)."
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#c5c5d3]/40 p-6 shadow-2xs animate-fade-in relative z-10 text-[#191c1e]">
      
      <div className="border-b border-[#edeef0] pb-5 mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-[#00236f]" />
          Pusat Bantuan AssetPro (Help Center)
        </h2>
        <p className="text-xs text-[#757682] mt-0.5">
          Panduan operasional dan FAQ peminjaman pergudangan aset perusahaan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        <div className="border border-[#c5c5d3]/40 p-5 rounded-xl bg-[#f8f9fb]/50 flex flex-col gap-2">
          <PhoneCall className="w-6 h-6 text-[#006a61]" />
          <h3 className="font-bold text-sm">IT Support Support Desk</h3>
          <p className="text-xs text-[#757682] leading-relaxed">Hubungi ekstensi telepon internal: <strong>Ext. 404</strong></p>
        </div>

        <div className="border border-[#c5c5d3]/40 p-5 rounded-xl bg-[#f8f9fb]/50 flex flex-col gap-2">
          <BookOpen className="w-6 h-6 text-[#00236f]" />
          <h3 className="font-bold text-sm">SOP Regulasi Aset</h3>
          <p className="text-xs text-[#757682] leading-relaxed">Penggunaan laptop wajib didukung oleh serah terima divisi logistik tertulis.</p>
        </div>

        <div className="border border-[#c5c5d3]/40 p-5 rounded-xl bg-[#f8f9fb]/50 flex flex-col gap-2">
          <Clock className="w-6 h-6 text-[#ff9900]" />
          <h3 className="font-bold text-sm">Jam Operasional</h3>
          <p className="text-xs text-[#757682] leading-relaxed">Senin - Jumat: 08:00 WIB s/d 17:00 WIB (Sabtu/Minggu Tutup)</p>
        </div>

      </div>

      <div>
        <h3 className="font-bold text-base mb-4 flex items-center gap-2 text-slate-800">
          <HeartHandshake className="w-5 h-5 text-[#006a61]" /> Pertanyaan Yang Sering Diajukan (FAQ)
        </h3>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-[#edeef0] pb-4 last:border-none">
              <h4 className="font-bold text-sm text-[#00236f] mb-1.5">{faq.q}</h4>
              <p className="text-xs text-[#444651] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

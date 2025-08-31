import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import SectionContainer from '../layout/section-container';

export const dataAlurPendaftaran: {
  index: number;
  title: string;
  description: string[];
}[] = [
  {
    index: 1,
    title: 'Orangtua membuat akun baru untuk pendaftaran',
    description: [
      'Orang tua wajib melakukan registrasi untuk membuat akun baru sebelum melakukan pendaftaran siswa.',
      'Apabila sudah memiliki akun, silakan langsung login menggunakan akun yang telah terdaftar, tanpa perlu membuat akun baru.',
    ],
  },
  {
    index: 2,
    title: 'Mengisi data siswa yang akan didaftarkan',
    description: [
      'Pada tahap ini, orang tua diminta untuk mengisi formulir pendaftaran dengan data lengkap siswa. Data yang perlu dilengkapi meliputi informasi data diri siswa seperti nama lengkap, NISN, tempat dan tanggal lahir, serta jenis kelamin',
      'Selain itu, orang tua juga harus mengisi informasi mengenai ayah dan ibu, termasuk nama, pekerjaan, dan kontak yang dapat dihubungi. Selanjutnya, cantumkan informasi asal sekolah siswa seperti nama sekolah, alamat, dan nomor induk siswa.',
      'Terakhir, unggah berkas-berkas persyaratan pendaftaran sesuai dengan ketentuan yang berlaku, seperti akta kelahiran, kartu keluarga, dan ijazah atau dokumen pendukung lainnya.',
    ],
  },
  {
    index: 3,
    title: 'Melakukan pembayaran biaya pendaftaran',
    description: [
      'Setelah mengisi data siswa secara lengkap, langkah selanjutnya adalah melakukan pembayaran biaya pendaftaran. Informasi mengenai jumlah biaya, metode pembayaran, dan petunjuk transfer akan ditampilkan pada sistem.',
      'Pastikan pembayaran dilakukan sesuai instruksi yang diberikan, lalu unggah bukti pembayaran sebagai konfirmasi. Pendaftaran tidak dapat diproses lebih lanjut sebelum pembayaran dikonfirmasi oleh pihak sekolah.',
    ],
  },
  {
    index: 4,
    title: 'Verifikasi dan Penerimaan Siswa Baru.',
    description: [
      'Setelah seluruh data dan dokumen terisi lengkap serta pembayaran berhasil dikonfirmasi, pihak sekolah akan melakukan proses verifikasi. Admin sekolah akan meninjau data pendaftaran, memeriksa kelengkapan dokumen, dan melakukan validasi.',
      'Jika seluruh persyaratan dinyatakan sesuai, siswa akan diterima dan status pendaftaran akan diperbarui pada sistem. Informasi hasil seleksi atau penerimaan dapat dilihat melalui akun yang telah didaftarkan.',
    ],
  },
];

const AlurSection = () => {
  return (
    <SectionContainer title="Alur pendaftaran" description="Bagaimana cara pendaftaran siswa baru di sini">
      <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
        {dataAlurPendaftaran.map((alur) => (
          <AccordionItem value={`item-${alur.index}`} key={alur.index}>
            <AccordionTrigger>
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <h1 className="text-3xl font-bold">{alur.index}.</h1>
                <h3 className="text-base font-semibold">{alur.title}</h3>
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-lg text-muted-foreground">
              {alur.description.map((desc, index) => (
                <p key={index}>{desc}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </SectionContainer>
  );
};

export default AlurSection;

import { type ClassValue, clsx } from 'clsx';
import dayjs from 'dayjs';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const em = (e: { [key: string]: string }) => {
  return Object.entries(e)
    .map(([, v]) => v)
    .join(', ');
};

export function strLimit(text: string = '', limit: number = 50, end: string = '...'): string {
  if (text.length <= limit) return text;
  return text.slice(0, limit - end.length) + end;
}

export function dateDFY(date: string | Date) {
  return dayjs(date).format('DD MMMM YYYY');
}

export function dateDFYHIS(date: string | Date) {
  return dayjs(date).format('DD MMMM YYYY HH:mm:ss');
}

export function handlePasteScreenshot(callback: (file: File) => void) {
  const onPaste = (e: ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (const item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile();
        if (file) {
          callback(file);
        }
      }
    }
  };

  window.addEventListener('paste', onPaste);
  return () => window.removeEventListener('paste', onPaste); // biar bisa cleanup
}

// cara pakai handlePasteScreenShot

// useEffect(() => {
//   const cleanup = handlePasteScreenshot((file) => {
//     router.post(
//       route('article.upload-media', article.id),
//       {
//         file,
//       },
//       {
//         preserveScroll: true,
//         onSuccess: () => toast.success('upload completed'),
//         onError: (e) => toast.error(em(e)),
//       },
//     );
//   });

//   return cleanup;
// }, [article.id]);

export function generateSlug(text: string): string {
  const slugBase = text.replace(/\//g, '');
  return slugBase.toLowerCase().replace(/\s+/g, '-');
}

export function generatePassword(): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  const digits = '0123456789';

  const randomChars = (charset: string, length: number): string => {
    return Array.from({ length }, () => charset.charAt(Math.floor(Math.random() * charset.length))).join('');
  };

  const part1 = randomChars(letters, 4); // \w{4}
  const part2 = randomChars(digits, 4); // \d{4}

  return part1 + part2;
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) {
        acc[groupKey] = [];
      }
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>,
  );
}

export function copyMarkdownImage(alt: string, url: string) {
  const markdown = `![${alt}](${url})`;

  navigator.clipboard
    .writeText(markdown)
    .then(() => toast.success(`${alt} copied to clipboard`))
    .catch((err) => toast.error(err));
}

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function formatRupiah(angka: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(angka);
}

export function numberPad(num: number, size = 5): string {
  return num.toString().padStart(size, '0');
}

export function implode(...parts: (string | number | null | undefined)[]): string {
  return parts.filter((p) => p !== null && p !== undefined && String(p).trim() !== '').join(', ');
}

type AddressPart = string | number | null | undefined;

export function implodeAddress(
  provinsi?: AddressPart,
  kabupaten?: AddressPart,
  kecamatan?: AddressPart,
  kelurahan?: AddressPart,
  jalan?: AddressPart,
  rt?: AddressPart,
  rw?: AddressPart,
  kodepos?: AddressPart,
): string {
  const parts: string[] = [];

  if (jalan) parts.push(`${jalan}`);
  if (rt) parts.push(`RT ${rt}`);
  if (rw) parts.push(`RW ${rw}`);
  if (kelurahan) parts.push(`${kelurahan}`);
  if (kecamatan) parts.push(`Kec. ${kecamatan}`);
  if (kabupaten) parts.push(`${kabupaten}`);
  if (provinsi) parts.push(`${provinsi}`);
  if (kodepos) parts.push(`${kodepos}`);

  return parts.join(', ');
}

export function numberToWords(num: number): string {
  if (num === 0) return 'Nol';

  const units = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan'];

  const belasan = [
    'Sepuluh',
    'Sebelas',
    'Dua Belas',
    'Tiga Belas',
    'Empat Belas',
    'Lima Belas',
    'Enam Belas',
    'Tujuh Belas',
    'Delapan Belas',
    'Sembilan Belas',
  ];

  const puluhan = [
    '',
    'Sepuluh',
    'Dua Puluh',
    'Tiga Puluh',
    'Empat Puluh',
    'Lima Puluh',
    'Enam Puluh',
    'Tujuh Puluh',
    'Delapan Puluh',
    'Sembilan Puluh',
  ];

  const ribuan = ['', 'Ribu', 'Juta', 'Miliar', 'Triliun'];

  function toWords(n: number): string {
    let str = '';

    if (n < 10) {
      str = units[n];
    } else if (n < 20) {
      str = belasan[n - 10];
    } else if (n < 100) {
      str = puluhan[Math.floor(n / 10)] + (n % 10 !== 0 ? ' ' + units[n % 10] : '');
    } else if (n < 200) {
      str = 'Seratus' + (n % 100 !== 0 ? ' ' + toWords(n % 100) : '');
    } else if (n < 1000) {
      str = units[Math.floor(n / 100)] + ' Ratus' + (n % 100 !== 0 ? ' ' + toWords(n % 100) : '');
    } else {
      let i = 0;
      let words = '';
      while (n > 0) {
        const chunk = n % 1000;
        if (chunk !== 0) {
          let chunkWords = toWords(chunk) + ' ' + ribuan[i];
          if (chunk === 1 && i === 1) {
            chunkWords = 'Seribu'; // khusus 1000
          }
          words = chunkWords + (words ? ' ' + words : '');
        }
        n = Math.floor(n / 1000);
        i++;
      }
      str = words;
    }

    return str.trim();
  }

  return toWords(num);
}

export function hariNumberDescription(num: number): string {
  if (num == 0) return '-';
  return `${num} (${numberToWords(num)}) Hari`;
}

export function safeAverage<T>(arr: T[], fn: (item: T) => number): number {
  if (arr.length === 0) return 0;
  const sum = arr.reduce((acc, item) => acc + fn(item), 0);
  return sum / arr.length;
}

export function removeAtIndexMutable<T>(arr: T[], index: number): T[] {
  if (index < 0 || index >= arr.length) return arr; // biar aman
  arr.splice(index, 1);
  return arr;
}

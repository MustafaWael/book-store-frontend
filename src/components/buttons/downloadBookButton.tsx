'use client';

import { downloadBook } from '@/lib/api/books';
import { getCookie } from 'cookies-next';

export default function DownloadBookButton({
  orderId,
  bookId,
  title,
}: {
  bookId: string;
  orderId: string;
  title: string;
}) {
  const download = async () => {
    const accessToken = getCookie('access_token') as string;
    const res = await downloadBook(orderId, bookId, accessToken);

    if (res.ok) {
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${title}.pdf`; // Specify the file name here
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } else {
      console.error('Download failed:', res.statusText);
    }
  };

  return <button onClick={download}>Download</button>;
}

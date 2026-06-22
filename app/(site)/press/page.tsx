import PressKit from '@/components/press/PressKit';
import { pageMetadata } from '@/lib/metadata';

export const metadata = pageMetadata({
  path: '/press',
  title: "Press Kit — THE FIGHTIN' TENTH",
  description:
    "Press kit for THE FIGHTIN' TENTH — book one-sheet, author bios, synopsis, talking points, sample interview questions, downloadable assets, and booking contact.",
});

export default function PressPage() {
  return <PressKit />;
}

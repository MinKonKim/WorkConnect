import Typography from '@/components/Typography';
import { BellIcon, ChevronDownIcon } from '@/icons';
import Link from 'next/link';

type NoticeProps = { href: string; text: string };

const Notice = ({ href, text }: NoticeProps) => {
  return (
    <Link href={href} className="mx-4 h-[34px] shadow-2xl rounded-[4px] flex items-center gap-1 bg-[#F7F7F7] py-2 px-3">
      <BellIcon className="shrink-0" width={16} height={16} />
      <Typography
        variant="Body12px"
        color="grey500"
        className="flex-grow text-ellipsis whitespace-nowrap overflow-hidden"
      >
        {text}
      </Typography>
      <ChevronDownIcon className="w-4 h-4 stroke-grey500" />
    </Link>
  );
};

export default Notice;

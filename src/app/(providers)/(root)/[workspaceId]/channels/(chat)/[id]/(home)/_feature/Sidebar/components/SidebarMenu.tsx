import clsx from 'clsx';
import Link from 'next/link';
import { ChevronRightIcon } from '@/icons';
import Typography from '@/components/Typography';
import { MenuItemTypes } from '../utils';

const SidebarMenu = ({ menuItems }: { menuItems: MenuItemTypes[] }) => {
  return (
    <ul className="flex flex-col gap-8 mt-8 pt-8 border-t border-grey50">
      {menuItems.map(({ href, icon: Icon, label, svgType }) => (
        <li key={href}>
          <Link href={href} className="flex items-center gap-3">
            <Icon className={clsx('text-grey700Black', svgType === 'fill' ? 'fill-current' : 'stroke-current')} />
            <Typography variant="Subtitle16px" color="grey700Black" as="span" className="flex-1">
              {label}
            </Typography>
            <ChevronRightIcon className="stroke-grey300" />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenu;

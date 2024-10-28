import { HashIcon, ImageIcon, PaperclipIcon } from '@/icons';

export type MenuItemTypes = {
  href: string;
  icon: React.ElementType;
  label: string;
  svgType: 'fill' | 'stroke';
};

export const createMenuItems = (pathname: string): MenuItemTypes[] => {
  return [
    {
      href: `${pathname}/media`,
      icon: ImageIcon,
      label: '사진·동영상',
      svgType: 'stroke'
    },
    {
      href: `${pathname}/file`,
      icon: PaperclipIcon,
      label: '파일',
      svgType: 'stroke'
    },
    {
      href: `${pathname}/notice`,
      icon: HashIcon,
      label: '공지',
      svgType: 'fill'
    }
  ];
};

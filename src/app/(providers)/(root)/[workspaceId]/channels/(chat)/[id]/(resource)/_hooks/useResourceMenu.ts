'use client';

import { usePathname } from 'next/navigation';

const useResourceMenu = () => {
  const pathname = usePathname();
  const activeTab = pathname.includes('/media') ? 0 : pathname.includes('/file') ? 1 : 2;
  const originPath = pathname.substring(0, pathname.lastIndexOf('/'));

  return { activeTab, originPath };
};

export default useResourceMenu;

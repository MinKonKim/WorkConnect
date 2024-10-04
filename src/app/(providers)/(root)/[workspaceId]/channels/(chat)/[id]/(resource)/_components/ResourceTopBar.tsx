'use client';

import { TopBar } from '@/components/Layout/TopBar';
import { XIcon } from '@/icons';
import { StrictPropsWithChildren } from '@/types/common';
import { useRouter } from 'next/navigation';
import ResourceMenu from './ResourceMenu';
import useResourceMenu from '../_hooks/useResourceMenu';

const ResourceTopBar = ({ children }: StrictPropsWithChildren) => {
  const router = useRouter();
  const { activeTab, originPath } = useResourceMenu();

  const handleTabClick = (path: string) => {
    router.replace(`${originPath}${path}`);
  };

  return (
    <>
      <TopBar
        title="파일 내역"
        Icon1={<XIcon onClick={() => router.back()} className="lg:hidden" />}
        Icon4={<XIcon onClick={() => router.back()} className="hidden lg:block" />}
      />
      <ResourceMenu handleClick={handleTabClick} activeTab={activeTab} />
      {children}
    </>
  );
};

export default ResourceTopBar;

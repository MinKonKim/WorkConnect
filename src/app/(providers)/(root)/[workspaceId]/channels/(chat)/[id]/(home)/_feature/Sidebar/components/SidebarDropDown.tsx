'use client';

import clsx from 'clsx';
import Typography from '@/components/Typography';
import { ChevronDownIcon, UserIcon } from '@/icons';
import { useState } from 'react';
import { StrictPropsWithChildren } from '@/types/common';

const SidebarDropDown = ({ children }: StrictPropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button type="button" className="flex items-center gap-3 mt-4" onClick={handleToggle}>
        <UserIcon className="text-grey700Black stroke-current" />
        <Typography variant="Subtitle16px" color="grey700Black" className="flex items-center gap-2 flex-1">
          <span className="flex-1 text-left">대화멤버</span> <ChevronDownIcon className="stroke-grey700Black" />
        </Typography>
      </button>
      <div
        className={clsx(
          'flex flex-col gap-3 mt-4 transition-all duration-300 overflow-hidden px-2',
          isOpen ? '' : 'hidden'
        )}
      >
        {children}
      </div>
    </>
  );
};

export default SidebarDropDown;

import { ChatSidebarStateTypes } from '@/store/useChatSidebar';
import { StrictPropsWithChildren } from '@/types/common';
import clsx from 'clsx';

const SidebarWrapper = ({ isOpen, children, toggleSidebar }: StrictPropsWithChildren<ChatSidebarStateTypes>) => {
  return (
    <>
      <aside
        className={clsx(
          'transition-transform duration-300 will-change-transform bg-white fixed top-0 right-0 h-dvh z-50 w-[300px] border-l border-transparent px-4 lg:w-[370px] lg:top-[84px] lg:border-grey50',
          isOpen ? '-translate-x-0' : 'translate-x-[100%]'
        )}
      >
        <div className="flex flex-col">{children}</div>
      </aside>
      <div
        className={`w-full h-full bg-[#333] z-40 fixed top-0 left-0 transition-opacity duration-300 ${isOpen ? 'opacity-70' : 'opacity-0 pointer-events-none'} lg:opacity-0`}
        onClick={toggleSidebar}
      />
    </>
  );
};

export default SidebarWrapper;

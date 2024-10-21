'use client';

import clsx from 'clsx';
import { StrictPropsWithChildren } from '@/types/common';
import FileButton from './FileButton';
import { ImageIcon, PaperclipIcon, VideoIcon } from '@/icons';

type UtilsMenuProps = StrictPropsWithChildren<{
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isOpen: boolean;
  handleOpen: () => void;
}>;

const UtilsMenu = ({ handleFileUpload, children, isOpen, handleOpen }: UtilsMenuProps) => {
  return (
    <div className="relative z-0">
      {children}
      <div
        className={clsx(
          'w-full bg-white gap-2 px-4 grid grid-cols-4 pt-3 pb-[15px] lg:flex lg:pt-0',
          !isOpen && 'hidden',
          'lg:block'
        )}
      >
        <FileButton title="사진" name="imageFile" accept="image/*" handleChange={handleFileUpload}>
          <ImageIcon className="stroke-white lg:stroke-grey400 w-5 h-5" />
        </FileButton>
        <FileButton title="동영상" name="videoFile" accept="video/*" handleChange={handleFileUpload}>
          <VideoIcon className="stroke-white lg:stroke-grey400 w-5 h-5" />
        </FileButton>
        <FileButton title="파일" name="documentFile" accept=".pdf,.doc,.docx" handleChange={handleFileUpload}>
          <PaperclipIcon className="stroke-white lg:stroke-grey400 w-5 h-5" />
        </FileButton>
      </div>
      {isOpen && <div className="fixed top-0 left-0 w-full h-full z-[-1] lg:hidden" onClick={handleOpen} />}
    </div>
  );
};

export default UtilsMenu;

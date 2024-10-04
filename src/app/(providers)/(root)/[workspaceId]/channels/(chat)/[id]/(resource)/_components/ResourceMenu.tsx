'use client';

import { Tab, Tabs } from '@/components/Tabs';

type ResourceMenuProps = {
  handleClick: (path: string) => void;
  activeTab: number;
};

const ResourceMenu = ({ handleClick, activeTab }: ResourceMenuProps) => {
  return (
    <Tabs>
      <Tab as="button" onClick={() => handleClick('/media')} active={activeTab === 0}>
        사진&middot;동영상
      </Tab>
      <Tab as="button" onClick={() => handleClick('/file')} active={activeTab === 1}>
        파일
      </Tab>
      <Tab as="button" onClick={() => handleClick('/notice')} active={activeTab === 2}>
        공지
      </Tab>
    </Tabs>
  );
};

export default ResourceMenu;

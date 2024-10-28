import type { StrictPropsWithChildren } from '@/types/common';
import { BottomBar, PageAside, PageLayout, PageMain } from '@/components/Layout/PageLayout';
import { ChannelList, ChannelListTopBar } from '../../../_components/ChannelList';
import ResourceTopBar from './_components/ResourceTopBar';

const ResourcePageLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout>
      <PageAside>
        <div className="mr-[-8px]">
          <ChannelListTopBar />
          <ChannelList />
        </div>
      </PageAside>
      <PageMain>
        <ResourceTopBar>{children}</ResourceTopBar>
      </PageMain>
      <BottomBar className="hidden lg:block" />
    </PageLayout>
  );
};

export default ResourcePageLayout;

import { PageAside } from '@/components/Layout/PageLayout';
import { ChannelList, ChannelListTopBar } from '../../../../_components/ChannelList';

const AsideSection = () => {
  return (
    <PageAside>
      <div className="mr-[-8px]">
        <ChannelListTopBar />
        <ChannelList />
      </div>
    </PageAside>
  );
};

export default AsideSection;

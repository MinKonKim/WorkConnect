import { BottomBar, PageLayout, PageMain } from '@/components/Layout/PageLayout';
import { StrictPropsWithChildren } from '@/types/common';
import AsideSection from './_feature/AsideSection';

const ChannelDetailLayout = ({ children }: StrictPropsWithChildren) => {
  return (
    <PageLayout>
      <AsideSection />
      <PageMain className="h-dvh flex flex-col">{children}</PageMain>
      <BottomBar className="hidden lg:block" />
    </PageLayout>
  );
};

export default ChannelDetailLayout;

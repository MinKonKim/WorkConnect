import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { getChannelInfoOptions } from '../../_utils/getQueryOptions';
import { Messages, DetailLayout, UpdateChannelReadAt } from './_components';

const queryClient = new QueryClient();

const ChatDetailPage = async ({ params: { id } }: { params: { id: string } }) => {
  await queryClient.prefetchQuery(getChannelInfoOptions(Number(id)));

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <DetailLayout>
          <Messages />
        </DetailLayout>
      </HydrationBoundary>
      <UpdateChannelReadAt />
    </>
  );
};

export default ChatDetailPage;

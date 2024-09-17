'use client';

import useWorkspaceId from '@/hooks/useWorkspaceId';
import { useSearchParams } from 'next/navigation';
import useCreateChannel from '../_hooks/useCreateChannel';
import { useRouter } from 'next/navigation';
import { isEmpty } from '@/utils/isEmpty';
import { CHANNEL_TYPE } from '@/constants/channel';
import { fetchExistingChannelId } from '../_utils/fetchExistingChannelId';
import AddChannelLayout from '../_components/AddChannelLayout';
import { SearchInput, SearchResults, SelectedUsers } from '../_components';
import useChatSearchUsersStore from '@/store/chatSearchUserStore';
import { useWorkspaceUserId } from '@/hooks/useWorkspaceUserId';

const AddChatPage = () => {
  const workspaceId = useWorkspaceId();
  const searchParams = useSearchParams();
  const workspaceUserId = useWorkspaceUserId();
  const router = useRouter();

  const type = searchParams.get('type');
  const { getSelectedUserIds } = useChatSearchUsersStore();
  const { handleCreateChannelAndUsers } = useCreateChannel();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const userIds = getSelectedUserIds(workspaceUserId);
    if (isEmpty(userIds)) return;

    const isGroupChat = userIds.length > 2 || type === CHANNEL_TYPE.video;

    if (isGroupChat) {
      router.push(`/${workspaceId}/channels/add/group-setting?type=${type}`);
      return;
    }
    const existingChannelId = await fetchExistingChannelId({
      other_workspace_user_id: userIds[0]
    });

    if (existingChannelId) {
      router.push(`/${workspaceId}/channels/${existingChannelId}`);
      return;
    }

    handleCreateChannelAndUsers({ userIds });
  };

  return (
    <form onSubmit={handleSubmit}>
      <AddChannelLayout title="대화상대 선택">
        <SearchInput />
        <SelectedUsers />
        <SearchResults />
      </AddChannelLayout>
    </form>
  );
};

export default AddChatPage;

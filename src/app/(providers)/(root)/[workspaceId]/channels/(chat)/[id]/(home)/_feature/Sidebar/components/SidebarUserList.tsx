import SidebarUserCard from './SidebarUserCard';
import SidebarDropDown from './SidebarDropDown';
import { GetUsersInChannelResponseItem } from '@/types/channel';

type SidebarUserListProps = {
  sortedMembers: GetUsersInChannelResponseItem[];
  workspaceUserId: string;
  workspaceId: number;
};

const SidebarUserList = ({ sortedMembers = [], workspaceUserId, workspaceId }: SidebarUserListProps) => {
  return (
    <SidebarDropDown>
      {sortedMembers.map((user) => {
        if (!user) return;
        const isMe = user?.workspace_user_id === workspaceUserId;

        return (
          <SidebarUserCard
            key={user?.workspace_user_id}
            isMe={isMe}
            href={`/${workspaceId}/profile/${user?.workspace_user_id}`}
            src={user?.profile_image ?? ''}
            name={user?.name}
          />
        );
      })}
    </SidebarDropDown>
  );
};

export default SidebarUserList;

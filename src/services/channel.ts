import type {
  ChannelInsertType,
  ChannelType,
  GetChannelsProps,
  GetUsersInChannelResponse,
  GetUsersInChannelResponseItem
} from '@/types/channel';
import { WorkspaceUserType } from '@/types/workspaceUser';
import { createClient } from '@/utils/supabase/supabaseServer';

export const createChannel = async ({ name, type, workspace_id, thumbnail }: ChannelInsertType) => {
  const supabase = createClient();

  const response = await supabase
    .from('channel')
    .insert({
      name,
      type,
      workspace_id,
      thumbnail
    })
    .select('id')
    .single();

  return response;
};

export const getChannels = async ({ workspace_id, workspace_user_id }: GetChannelsProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_chat_channels', {
    wid: workspace_id,
    wuid: workspace_user_id
  });

  return response;
};

type GetUsersInChannelRequestProps = {
  channel_id: ChannelType['id'];
  workspaceUserId: WorkspaceUserType['id'];
};

export const getUsersInChannel = async ({ channel_id, workspaceUserId }: GetUsersInChannelRequestProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_users_in_channel', {
    cid: channel_id,
    wuid: workspaceUserId
  });

  if (!response.data) {
    return response;
  }

  const usersMap = response.data.reduce((acc: GetUsersInChannelResponse, user: GetUsersInChannelResponseItem) => {
    acc[user.workspace_user_id] = user;
    return acc;
  }, {});

  return { ...response, data: usersMap };
};

type GetExistingChannelIdRequestProps = {
  workspace_user_id: WorkspaceUserType['id'];
  other_workspace_user_id: WorkspaceUserType['id'];
};

export const getExistingChannelId = async ({
  workspace_user_id,
  other_workspace_user_id
}: GetExistingChannelIdRequestProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_existing_channel_id', {
    my_wuid: workspace_user_id,
    other_wuid: other_workspace_user_id
  });

  return response;
};

type GetChannelNameRequestProps = {
  id: ChannelType['id'];
  wuid: WorkspaceUserType['id'];
};

export const getChannelName = async ({ id, wuid }: GetChannelNameRequestProps) => {
  const supabase = createClient();

  const response = await supabase.rpc('get_channel_name', {
    cid: id,
    wuid: wuid
  });

  return response;
};

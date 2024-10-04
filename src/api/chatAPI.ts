import { GetChannelMessageTypes } from '@/types/channel';
import type { CreateChatMessageProps } from '@/types/chat';
import type { APIResponse } from '@/types/common';
import { AxiosInstance } from 'axios';

class ChatAPI {
  private axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  createChatMessage = async ({ channel_id, content, type }: CreateChatMessageProps): Promise<APIResponse<[]>> => {
    const { data } = await this.axios.post(`/api/chat/${channel_id}`, {
      content,
      type
    });

    return data;
  };

  getLatestNotice = async (channelId: number): Promise<GetChannelMessageTypes> => {
    const { data } = await this.axios.get(`/api/chat/${channelId}/latest-notice`);

    return data.data;
  };

  deleteChatMessage = async ({ channel_id, id }: { channel_id: number; id: number }): Promise<APIResponse<[]>> => {
    const { data } = await this.axios.delete(`/api/chat/${channel_id}?id=${id}`);

    return data;
  };
}

export default ChatAPI;

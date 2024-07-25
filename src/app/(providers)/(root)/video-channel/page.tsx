'use client';

import useChannel from '@/hooks/useChannel';
import { ChannelInsertType } from '@/types/channel';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useState } from 'react';
import VideoList from './_components/VideoList';

const MakeVideoCallRoom = () => {
  const router = useRouter();
  const { addChannel } = useChannel('video', 2);
  const [roomName, setRoomName] = useState<string>('');
  // TODO: 추후 유저정보 받아올 수 있으면 수정
  const [userName, setUserName] = useState<string>('');
  const [videoChatList, setVideoChatList] = useState();

  const handleInputRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  const handleInputUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // TODO: DB에 방 추가 하는 로직 작성 해야함.

    if (roomName && userName) {
      router.push(`/video-channel/${roomName}?username=${userName}`);
    } else {
      alert('방이름과 사용자 이름을 입력해 주세요.');
    }
  };

  const handleCreateRoom = () => {
    const newChannel: ChannelInsertType = {
      name: roomName,
      type: 'video',
      workspace_id: 2
    };
    addChannel(newChannel);
  };

  return (
    <div className="flex flex-col h-[100vh] justify-center items-center">
      <header className="flex gap-1">
        <h1>방 목록</h1>
        <button
          onClick={handleCreateRoom}
          className="border rounded-full w-5 h-5 flex justify-center items-center hover:bg-slate-200"
        >
          +
        </button>
      </header>
      <form onSubmit={handleSubmit}>
        <VideoList />

        <input
          className="border border-1"
          type="text"
          value={roomName}
          placeholder="방이름"
          onChange={handleInputRoomName}
        />
        <input
          className="border border-1"
          type="text"
          value={userName}
          placeholder="유저 이름"
          onChange={handleInputUserName}
        />
        <button className="border-4" type="submit">
          방 생성
        </button>
      </form>
    </div>
  );
};

export default MakeVideoCallRoom;

'use client';

import { useState, useRef } from 'react';
import { useMutationCreateMessage } from '@/hooks/queries/useChat';
import useFileUpload from './useFileUpload';
import useGetParamsChannelId from '@/hooks/useGetParamsChannelId';
import { StorageBucketNameKeys } from '../_types';

const useMessageForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isComposing, setIsComposing] = useState(false);

  const ref = useRef<HTMLTextAreaElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleOpen = () => setIsOpen((prev) => !prev);

  const onFileUpload = useFileUpload({ onFinish: handleOpen });
  const channelId = useGetParamsChannelId();

  const { mutate: mutateChatMessage } = useMutationCreateMessage(channelId);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = event.target;
    if (!files) return;

    onFileUpload({
      blob: files[0],
      name: name as StorageBucketNameKeys
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!ref.current?.value || ref.current.value.trim() === '') return;

    mutateChatMessage({ content: ref.current.value, type: 'text' });
    ref.current.value = '';
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    handleResizeHeight(ref.current);

    if (isComposing) return;
    if (window.innerWidth < 1024) return;
    if (!(event.key === 'Enter' && !event.shiftKey)) return;

    event.preventDefault();
    buttonRef.current?.click();
  };

  const handleResizeHeight = (textArea: HTMLTextAreaElement | null) => {
    if (!textArea) return;
    textArea.style.height = 'auto';
    textArea.style.height = textArea.scrollHeight + 'px';
  };

  return {
    isOpen,
    handleOpen,
    handleFileUpload,
    handleSubmit,
    handleKeyDown,
    setIsComposing,
    ref,
    buttonRef
  };
};

export default useMessageForm;

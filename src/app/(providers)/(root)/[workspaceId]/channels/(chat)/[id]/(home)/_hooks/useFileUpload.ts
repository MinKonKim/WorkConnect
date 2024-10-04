'use client';

import { mbToBytes } from '@/utils/file';
import { CHAT_FILE_TYPE, MAX_FILE_SIZE, STORAGE_BUCKET_NAME } from '../_constants';
import { useSnackBar } from '@/providers/SnackBarContext';
import { useParams } from 'next/navigation';
import { useCallback } from 'react';
import { useMutationCreateMessage, useMutationUploadFile } from '@/hooks/queries/useChat';
import { OnUploadFileTypes } from '../_types';

const useFileUpload = ({ onFinish }: { onFinish: () => void }) => {
  const { id } = useParams();
  const { openSnackBar } = useSnackBar();

  const { mutateAsync: mutateUploadFile } = useMutationUploadFile({
    onSuccess: onFinish
  });

  const { mutate: mutateChatMessage } = useMutationCreateMessage(Number(id));

  const onFileUpload = useCallback(async ({ blob, name }: OnUploadFileTypes) => {
    if (blob.size >= mbToBytes(MAX_FILE_SIZE)) {
      openSnackBar({ message: `${MAX_FILE_SIZE}MB가 넘는 파일은 업로드할 수 없어요` });
      onFinish();
      return;
    }

    const formData = new FormData();
    formData.append('file', blob);

    const { data } = await mutateUploadFile({
      formData,
      storagePath: STORAGE_BUCKET_NAME[name],
      maxFileSize: MAX_FILE_SIZE
    });

    if (!data) {
      openSnackBar({ message: '파일을 업로드하지 못했어요' });
      onFinish();
      return;
    }

    mutateChatMessage({ content: data, type: CHAT_FILE_TYPE[name] });
  }, []);

  return onFileUpload;
};

export default useFileUpload;

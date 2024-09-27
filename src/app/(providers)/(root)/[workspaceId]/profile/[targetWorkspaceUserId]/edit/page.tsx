'use client';

import api from '@/api';
import BottomSheetModal from '@/components/BottomSheetModal';
import Button from '@/components/Button';
import EditTextField from '@/components/EditTextField';
import TextFieldButton from '@/components/TextFieldButton';
import useWorkspaceId from '@/hooks/useWorkspaceId';
import useWorkspaceUser from '@/hooks/useWorkspaceUser';
import { useSnackBar } from '@/providers/SnackBarContext';
import useBottomsheetModalBackDropStore from '@/store/bottomsheetModalBackDropStore';
import useUserStore from '@/store/userStore';
import { useParams, useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import Header from '../_components/Header';
import IsOpenInput from './_components/Input/IsOpenInput';
import InputBottomSheet from './_components/InputBottomSheets/InputBottomSheet';
import ProfileImgButton from './_components/ProfileImgButton';

const ProfileEditPage = () => {
  const params = useParams();
  const router = useRouter();
  const userId = useUserStore((state) => state.userId);
  const workspaceId = useWorkspaceId();
  const [activityState, setActivityState] = useState<string | undefined>('');
  const [image, setImage] = useState<File | null>();
  const [imageURL, setImageURL] = useState<string | ArrayBuffer | null>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = useBottomsheetModalBackDropStore((state) => state.handleOpen);
  const workspaceUserId = params.targetWorkspaceUserId as string;
  const { openSnackBar } = useSnackBar();
  const { workspaceUser, updateWorkspaceUser } = useWorkspaceUser(workspaceUserId);
  const profileImage = workspaceUser && workspaceUser.profile_image;
  const workspaceIsOpen = workspaceUser && workspaceUser.is_open;

  const { control, handleSubmit } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: workspaceUser?.name,
      email: workspaceUser?.email,
      phone: workspaceUser?.phone
    }
  });

  useEffect(() => {
    setImageURL(profileImage);
    setIsOpen(workspaceIsOpen ? workspaceIsOpen : false);
  }, [profileImage, workspaceIsOpen]);

  const handleProfileImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];

    if (!file) {
      openSnackBar({ message: '파일이 존재하지 않습니다' });
      return;
    }
    if (file.size > 3000000) {
      openSnackBar({ message: '이미지는 3MB를 넘길 수 없어요' });
      return;
    }
    setImage(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      setImageURL(reader.result);
    };
  };

  const handleStateChange = (value: string | undefined) => {
    setActivityState(value);
    handleOpen();
  };

  const handleIsOpenClick = () => {
    setIsOpen((prev) => !prev);
  };

  const onSubmit = async ({ name, email, phone }: FieldValues) => {
    if (!(userId && workspaceId)) return;
    if (!name) {
      openSnackBar({ message: '이름이 존재하지 않아요' });
      return;
    }
    if (image) {
      const filename = crypto.randomUUID();
      await api.storageProfile.postStorageProfile(image, filename);
      const profile_image = await api.storageProfile.getStorageProfile(filename);
      const workspaceUser = {
        id: workspaceUserId,
        user_id: userId,
        workspace_id: workspaceId,
        name,
        email,
        phone,
        state: activityState,
        is_open: isOpen,
        profile_image
      };
      await updateWorkspaceUser(workspaceUser);
      router.back();
      return;
    } else {
      const workspaceUser = {
        id: workspaceUserId,
        user_id: userId,
        workspace_id: workspaceId,
        name,
        email,
        phone,
        is_open: isOpen,
        state: activityState
      };
      await updateWorkspaceUser(workspaceUser);
      router.back();
      return;
    }
  };

  return (
    <div>
      <Header title="내 프로필 편집" type="edit" />
      <main>
        <div className="flex flex-col w-full items-center px-5 pb-[36px]">
          <ProfileImgButton imageURL={imageURL} handleProfileImageChange={handleProfileImageChange} />
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full gap-[16px]">
            <div className="relative flex flex-col gap-2 w-full">
              <Controller
                name="name"
                control={control}
                render={({ field }) => <EditTextField label="이름" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <div>
                <BottomSheetModal isUp={true}>
                  <InputBottomSheet value={activityState} handleFn={handleStateChange} />
                </BottomSheetModal>
                <TextFieldButton
                  LabelColor="grey400"
                  label="활동상태"
                  value={activityState}
                  onClick={() => handleStateChange(activityState)}
                />
                <div className="lg:border-grey50 lg:border-b-[1px]" />
              </div>
              <Controller
                name="email"
                control={control}
                render={({ field }) => <EditTextField label="이메일" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <Controller
                name="phone"
                control={control}
                render={({ field }) => <EditTextField label="전화번호" {...field} />}
              />
              <div className="lg:border-grey50 lg:border-b-[1px]" />
              <IsOpenInput isOpen={isOpen} handleIsOpenClick={handleIsOpenClick} />
              <Button theme="primary" isFullWidth type="submit">
                수정하기
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileEditPage;

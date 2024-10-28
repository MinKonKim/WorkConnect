import { FileButtonProps } from '@/app/(providers)/(root)/[workspaceId]/channels/(chat)/[id]/(home)/_feature/MessageForm/FileButton';
import { forwardRef } from 'react';

type FileInputProps = {} & Pick<FileButtonProps, 'name' | 'accept' | 'handleChange'>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ name, accept, handleChange }, ref) => {
  return <input type="file" ref={ref} name={name} className="hidden" onChange={handleChange} accept={accept} />;
});

export default FileInput;

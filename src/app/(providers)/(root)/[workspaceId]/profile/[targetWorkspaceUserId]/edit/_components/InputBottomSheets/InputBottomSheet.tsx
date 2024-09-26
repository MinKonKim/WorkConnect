import Button from '@/components/Button';
import { ChangeEvent, useState } from 'react';
import StatusCheckBox from '../StatusCheckBox';

interface InputBottomSheetsProps {
  value: string | undefined;
  handleFn: (value: string | undefined) => void;
}

const InputBottomSheet = ({ value, handleFn }: InputBottomSheetsProps) => {
  const [inputValue, setInputValue] = useState<string | undefined>(value);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newInputValue = e.target.value;
    setInputValue(newInputValue);
    console.log(handleFn);
  };

  return (
    <>
      <div className="pb-[12px]">
        <div className="pt-[12px] pb-[20px] px-[18px]">
          <StatusCheckBox status={inputValue} onChange={handleInputChange} />
        </div>
        <div className="px-[16px] pb-[16px]">
          <Button theme="primary" isFullWidth onClick={() => handleFn(inputValue)}>
            확인
          </Button>
        </div>
      </div>
    </>
  );
};

export default InputBottomSheet;

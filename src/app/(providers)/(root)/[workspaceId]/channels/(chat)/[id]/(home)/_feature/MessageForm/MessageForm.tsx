'use client';

import useMessageForm from '../../_hooks/useMessageForm';
import Textarea from './Textarea';
import UtilsMenu from './UtilsMenu';

const MessageForm = () => {
  const { isOpen, handleOpen, handleFileUpload, handleSubmit, handleKeyDown, setIsComposing, ref, buttonRef } =
    useMessageForm();

  return (
    <UtilsMenu handleFileUpload={handleFileUpload} isOpen={isOpen} handleOpen={handleOpen}>
      <Textarea
        handleOpenMenu={handleOpen}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        handleSubmit={handleSubmit}
        handleKeyDown={handleKeyDown}
        ref={ref}
        buttonRef={buttonRef}
      />
    </UtilsMenu>
  );
};

export default MessageForm;

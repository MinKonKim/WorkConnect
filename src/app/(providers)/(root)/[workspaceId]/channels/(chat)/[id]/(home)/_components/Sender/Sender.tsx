import Textarea from './Textarea';
import UtilsMenu from './UtilsMenu';
import ContextMenu from './ContextMenu';

type MessageSenderProps = {
  handleOpenUtil: () => void;
};

const Sender = ({ handleOpenUtil }: MessageSenderProps) => {
  return (
    <div className="relative z-50">
      <Textarea handleOpenUtil={handleOpenUtil} />
      <UtilsMenu handleOpenUtil={handleOpenUtil} />
      <ContextMenu />
    </div>
  );
};

export default Sender;

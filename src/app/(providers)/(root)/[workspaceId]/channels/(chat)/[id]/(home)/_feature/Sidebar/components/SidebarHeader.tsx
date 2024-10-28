import Typography from '@/components/Typography';

const SidebarHeader = ({ title }: { title: string }) => {
  return (
    <Typography
      variant="Title20px"
      color="grey700Black"
      as="strong"
      className="py-[14px] whitespace-nowrap overflow-hidden overflow-ellipsis"
    >
      {title}
    </Typography>
  );
};

export default SidebarHeader;

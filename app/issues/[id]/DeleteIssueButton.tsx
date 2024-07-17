import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button color="red" >
      <TrashIcon />
      <p>Delete Issue</p>
    </Button>
  );
};

export default DeleteIssueButton;

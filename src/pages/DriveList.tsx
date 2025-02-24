
import { DriveList as DriveListComponent } from "@/components/drive/DriveList";
import { drives } from "@/mocks/workspaceData";

const DriveList = () => {
  return <DriveListComponent drives={drives} />;
};

export default DriveList;


import { DriveList as DriveListComponent } from "@/components/drive/DriveList";
import { workspaces } from "@/mocks/workspaceData";

const DriveList = () => {
  // 모든 워크스페이스의 드라이브를 하나의 배열로 합치기
  const drives = workspaces.flatMap(workspace => 
    workspace.drives.map(drive => ({
      ...drive,
      membersCount: workspace.members.length
    }))
  );

  return <DriveListComponent drives={drives} />;
};

export default DriveList;

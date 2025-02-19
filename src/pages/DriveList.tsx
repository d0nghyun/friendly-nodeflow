
import { DriveList as DriveListComponent } from "@/components/drive/DriveList";

const DriveList = () => {
  const drives = [
    {
      id: "1",
      name: "Personal Drive",
      description: "My personal documents and files",
      owner: "John Doe",
      shared: false,
      membersCount: 1
    },
    {
      id: "2",
      name: "Team Projects",
      description: "Collaborative workspace for team projects",
      owner: "Jane Smith",
      shared: true,
      membersCount: 5
    },
    {
      id: "3",
      name: "Marketing Assets",
      description: "Marketing materials and brand assets",
      owner: "Marketing Team",
      shared: true,
      membersCount: 8
    }
  ];

  return <DriveListComponent drives={drives} />;
};

export default DriveList;

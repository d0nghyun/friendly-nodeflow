
import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { 
  ChevronLeft, 
  Pencil, 
  Trash2, 
  Grid,
  Users,
  FolderOpen,
  MoreHorizontal,
  UserPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const WorkspaceDetail = () => {
  const { workspaceId } = useParams();
  const [activeTab, setActiveTab] = useState("workflows");

  const workspace = {
    id: workspaceId,
    name: "Quanda",
    owner: "John Doe",
    createdAt: "2024-02-20",
    description: "Quantit Data Engineering team",
    userRole: "admin", // admin, member, viewer
    drives: [
      { 
        id: "drive1", 
        name: "Data Pipeline", 
        description: "ETL 프로세스와 데이터 파이프라인 문서",
        owner: "John Doe",
        shared: true
      },
      { 
        id: "drive2", 
        name: "Architecture", 
        description: "시스템 아키텍처 설계 문서",
        owner: "Jane Smith",
        shared: false
      }
    ],
    members: [
      { id: "1", name: "John Doe", email: "john@quantit.com", role: "admin", joinedAt: "2024-01-01" },
      { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "member", joinedAt: "2024-01-15" },
      { id: "3", name: "Mike Johnson", email: "mike@quantit.com", role: "member", joinedAt: "2024-02-01" }
    ],
    workflows: [
      { id: "flow1", name: "Data Ingestion", description: "마켓 데이터 수집 파이프라인" },
      { id: "flow2", name: "Data Processing", description: "데이터 전처리 및 정제" },
      { id: "flow3", name: "Data Analytics", description: "데이터 분석 워크플로우" }
    ]
  };

  const modelWorkspace = {
    id: 'model',
    name: "Model",
    description: "Quant Modeling",
    workflows: [
      { id: "flow4", name: "Model Development", description: "퀀트 모델 개발 프로세스" },
      { id: "flow5", name: "Backtesting", description: "모델 백테스팅 워크플로우" },
      { id: "flow6", name: "Model Deployment", description: "모델 배포 및 모니터링" }
    ]
  };

  const dipWorkspace = {
    id: 'dip',
    name: "DIP",
    description: "Digital investing platform",
    workflows: [
      { id: "flow7", name: "Portfolio Management", description: "포트폴리오 관리 자동화" },
      { id: "flow8", name: "Risk Analysis", description: "리스크 분석 프로세스" },
      { id: "flow9", name: "Trade Execution", description: "거래 실행 워크플로우" }
    ]
  };

  const isAdmin = workspace.userRole === "admin";
  const isMember = workspace.userRole === "member";

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to="/workspaces">
          <Button variant="ghost" className="gap-2 mb-4">
            <ChevronLeft className="h-4 w-4" />
            Back to Workspaces
          </Button>
        </Link>

        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">{workspace.name}</h1>
            <p className="text-gray-500 mt-1">{workspace.description}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>Owner: {workspace.owner}</span>
              <span>Created: {workspace.createdAt}</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
            {isAdmin && (
              <Button variant="outline" className="gap-2 text-red-600 hover:text-red-600">
                <Trash2 className="h-4 w-4" />
                Delete
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="workflows" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="workflows" className="gap-2">
            <Grid className="h-4 w-4" />
            Workflow
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Users className="h-4 w-4" />
            Members
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Workspace Members</h2>
            {isAdmin && (
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                Invite Member
              </Button>
            )}
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {workspace.members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    {isAdmin ? (
                      <Select defaultValue={member.role}>
                        <SelectTrigger className="w-[120px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="member">Member</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <span className="capitalize">{member.role}</span>
                    )}
                  </TableCell>
                  <TableCell>{member.joinedAt}</TableCell>
                  <TableCell>
                    {isAdmin && (
                      <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-600">
                        Remove
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="workflows" className="mt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-lg font-semibold">Workflows</h2>
            {(isAdmin || isMember) && (
              <Button className="gap-2">
                <Grid className="h-4 w-4" />
                New Workflow
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workspace.workflows.map((workflow) => (
              <Link key={workflow.id} to={`/${workspace.id}/${workflow.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg 
                        width="20" 
                        height="20" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                        className="text-gray-500"
                      >
                        <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"/>
                        <path d="M12 16v-4"/>
                        <path d="M12 8h.01"/>
                      </svg>
                      {workflow.name}
                    </CardTitle>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WorkspaceDetail;

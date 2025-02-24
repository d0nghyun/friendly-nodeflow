
export const workspaces = [
  {
    id: "quanda",
    name: "Quanda",
    description: "Quantit Data Engineering team",
    owner: "John Doe",
    createdAt: "2024-02-20",
    userRole: "admin" as const,
    drives: [
      { 
        id: "drive1", 
        name: "Quanda", 
        description: "퀀다 데이터 파이프라인 및 문서",
        shared: true,
        userRole: "editor" as const,
        createdAt: "2024-02-20",
        membersCount: 5
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
  },
  {
    id: "model",
    name: "Model",
    description: "Quant Modeling",
    owner: "Jane Smith",
    createdAt: "2024-02-15",
    userRole: "member" as const,
    drives: [
      { 
        id: "drive2", 
        name: "Model", 
        description: "퀀트 모델링 문서 및 코드",
        shared: true,
        userRole: "editor" as const,
        createdAt: "2024-02-10",
        membersCount: 4
      }
    ],
    members: [
      { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "admin", joinedAt: "2024-01-15" },
      { id: "1", name: "John Doe", email: "john@quantit.com", role: "member", joinedAt: "2024-01-01" }
    ],
    workflows: [
      { id: "flow4", name: "Model Development", description: "퀀트 모델 개발 프로세스" },
      { id: "flow5", name: "Backtesting", description: "모델 백테스팅 워크플로우" }
    ]
  },
  {
    id: "dip",
    name: "DIP",
    description: "Digital investing platform",
    owner: "Mike Johnson",
    createdAt: "2024-02-10",
    userRole: "viewer" as const,
    drives: [
      { 
        id: "drive3", 
        name: "DIP", 
        description: "디지털 투자 플랫폼 문서",
        shared: true,
        userRole: "viewer" as const,
        createdAt: "2024-02-05",
        membersCount: 6
      }
    ],
    members: [
      { id: "3", name: "Mike Johnson", email: "mike@quantit.com", role: "admin", joinedAt: "2024-02-01" },
      { id: "1", name: "John Doe", email: "john@quantit.com", role: "viewer", joinedAt: "2024-01-01" }
    ],
    workflows: [
      { id: "flow7", name: "Portfolio Management", description: "포트폴리오 관리 자동화" },
      { id: "flow8", name: "Risk Analysis", description: "리스크 분석 프로세스" }
    ]
  },
  {
    id: "pb-poc",
    name: "PB POC",
    description: "Private Banking POC",
    owner: "John Doe",
    createdAt: "2024-03-01",
    userRole: "admin" as const,
    drives: [
      { 
        id: "drive4", 
        name: "PB POC", 
        description: "PB POC 개발 문서 및 데이터",
        shared: true,
        userRole: "editor" as const,
        createdAt: "2024-03-01",
        membersCount: 3
      }
    ],
    members: [
      { id: "1", name: "John Doe", email: "john@quantit.com", role: "admin", joinedAt: "2024-01-01" },
      { id: "2", name: "Jane Smith", email: "jane@quantit.com", role: "member", joinedAt: "2024-01-15" }
    ],
    workflows: [
      { id: "flow9", name: "PB Development", description: "PB POC 개발 프로세스" },
      { id: "flow10", name: "PB Testing", description: "PB POC 테스트 워크플로우" }
    ]
  }
];

export const getWorkspaceById = (id: string) => {
  return workspaces.find(workspace => workspace.id === id);
};

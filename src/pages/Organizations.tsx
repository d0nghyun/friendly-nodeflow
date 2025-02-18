
import { Link } from "react-router-dom";
import { Users, Plus, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Organization } from "@/types/organization";

const Organizations = () => {
  // 임시 데이터
  const organizations: Organization[] = [
    {
      id: "org1",
      name: "Qore - Quantit",
      description: "Fintech Solutions Company",
      owner: {
        id: "user1",
        name: "John Doe",
        email: "john@qore.com",
        role: "owner",
        joinedAt: "2024-01-01"
      },
      membersCount: 15,
      createdAt: "2024-01-01",
      userRole: "owner"
    },
    {
      id: "org2",
      name: "Bareksa",
      description: "Investment Platform",
      owner: {
        id: "user2",
        name: "Jane Smith",
        email: "jane@bareksa.com",
        role: "owner",
        joinedAt: "2024-01-15"
      },
      membersCount: 8,
      createdAt: "2024-01-15",
      userRole: "admin"
    }
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Organizations</h1>
          <p className="text-gray-500">Manage your organizations and teams</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Organization
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {organizations.map((org) => (
          <Link key={org.id} to={`/organization/${org.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  {org.name}
                </CardTitle>
                <CardDescription>{org.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {org.membersCount} members
                  </div>
                  <div>Created {org.createdAt}</div>
                </div>
                <div className="mt-2 text-sm">
                  Owner: {org.owner.name}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Organizations;

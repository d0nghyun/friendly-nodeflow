
import { HardDrive, Grid } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const location = useLocation();

  const tabs = [
    {
      name: "Workspaces",
      icon: Grid,
      path: "/workspaces"
    },
    {
      name: "Drive",
      icon: HardDrive,
      path: "/drive"
    }
  ];

  return (
    <div className="flex items-center gap-4">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = location.pathname === tab.path;
        
        return (
          <Link
            key={tab.name}
            to={tab.path}
            className={`flex items-center gap-2 px-3 py-1 rounded-md transition-colors ${
              isActive 
                ? "bg-gray-100 text-gray-900" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            }`}
          >
            <Icon className="h-4 w-4" />
            <span className="text-sm font-medium">{tab.name}</span>
          </Link>
        );
      })}
    </div>
  );
};

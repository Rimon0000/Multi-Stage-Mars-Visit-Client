import { Home, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { Card, Divider } from "@nextui-org/react";

const Sidebar = () => {
  return (
    <div className="bg-slate-800 col-span-2 min-h-screen sticky">
      <nav className="flex flex-col gap-2 px-4 lg:px-5 py-1 mt-5">

        <Card className="p-0 bg-transparent border-none mb-2">
          <Link href="/">
            <div className="p-2 bg-green-300 rounded-md transition-all flex gap-2 items-center hover:bg-green-400 cursor-pointer">
              <LayoutDashboard className="shrink-0" />
              <span className="truncate">Overview</span>
            </div>
          </Link>
        </Card>
        <Card className="p-0 bg-transparent border-none mb-2">
          <Link href="/applicationForm">
            <div className="p-2 bg-green-300 rounded-md transition-all flex gap-2 items-center hover:bg-green-400 cursor-pointer">
              <LayoutDashboard className="shrink-0" />
              <span className="truncate">Application Form</span>
            </div>
          </Link>
        </Card>

        <Card className="p-0 bg-transparent border-none">
          <Link href="/applicants">
            <div className="p-2 bg-green-300 rounded-md transition-all flex gap-2 items-center hover:bg-green-400 cursor-pointer">
              <Home className="shrink-0" />
              <span className="truncate">Applicants List</span>
            </div>
          </Link>
        </Card>
      </nav>
    </div>
  );
};

export default Sidebar;

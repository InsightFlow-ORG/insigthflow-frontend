import WorkspacesTable from "@/components/workspace/GetWorkspaces";

export default function page() {
  return (
    <div className="flex justify-center items-start min-h-screen p-4">
      <WorkspacesTable />
    </div>
  );
}

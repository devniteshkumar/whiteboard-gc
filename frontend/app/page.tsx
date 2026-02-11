import Canvas from "@/components/Canvas";
import Toolbar from "@/components/Toolbar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="relative h-screen bg-blue-50">
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <Toolbar />
      </div>
      <Canvas />
    </div>
  );
}

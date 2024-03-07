
import { unstable_noStore as noStore } from "next/cache";
import { getServerAuthSession } from "~/server/auth";


export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
    </main>
  );
}

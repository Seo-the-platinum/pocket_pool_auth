
import { unstable_noStore as noStore } from "next/cache";
import LoginButton from './_components/login-button'
import { getServerAuthSession } from "~/server/auth";
import CreatePoolButton from "./_components/create-pool-button";

export default async function Home() {
  noStore();
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <LoginButton session={session ? true : false} />
      {session && <CreatePoolButton />}
    </main>
  );
}

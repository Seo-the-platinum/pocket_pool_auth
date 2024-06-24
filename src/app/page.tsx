import { unstable_noStore as noStore } from "next/cache";

export default async function Home() {
  noStore();
  return (
    <main className="page items-center gap-10">
      <div className="flex flex-col text-7xl font-extrabold text-center font-sans gap-4">
        <div className='flex flex-col lg:flex-row lg:gap-8'>
          <h1 className='text-indigo-600 brightness-110'>Pocket</h1>
          <h1 className='text-cyan-500 brightness-110'>Pool</h1>
        </div>
      </div>
      <div className="rounded-md flex justify-center items-center w-full ">
        <iframe
          className='rounded-md shadow-lg shadow-slate-600 dark:shadow-sky-600'
          width="560"
          height="315"
          src="https://www.youtube.com/embed/baW1FXcUNYk?si=nl4YIORGzDJbjmeW"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen></iframe>
      </div>
    </main>
  );
}

'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
const PaginationComponent = ({ league, page, prevPage, nextPage }: { league: string | null, page: number | null, prevPage: boolean, nextPage: boolean }) => {
  const router = useRouter()
  const handlePrevPage = () => {
    router.push(`/create?league=${league}&page=${Number(page) - 1}`)
  }

  const handleNextPage = () => {
    router.push(`/create?league=${league}&page=${Number(page) + 1}`)
  }


  return (
    <div className='flex justify-center gap-4 w-full lg:gap-24'>
      <button className={`${!prevPage && 'hidden'} text-sm flex items-center px-2 rounded-md hover:bg-sky-900 gap-2`} onClick={handlePrevPage}> <IoIosArrowBack size={24} /> Prev </button>
      <div className="flex gap-8">
        {
          prevPage && <button className='rounded-full size-8 hover:bg-sky-900' onClick={() => router.push(`/create?league=${league}&page=${page && page - 1}`)}>{page && page - 1} </button>
        }
        <button className='rounded-full bg-sky-600 size-8'>{page}</button>
        {
          nextPage && <button className='rounded-full hover:bg-sky-900 size-8' onClick={() => router.push(`/create?league=${league}&page=${page && page + 1}`)}>{page && page + 1}</button>

        }
      </div>
      <button className={`${!nextPage && 'hidden'} text-sm flex items-center px-2 rounded-md hover:bg-sky-900 gap-2`} onClick={handleNextPage} disabled={!nextPage}>Next <IoIosArrowForward size={24} /> </button>
    </div >
  )
}

export default PaginationComponent
'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

const PaginationComponent = ({ league, page }: { league: string | null, page: string | null }) => {
  const router = useRouter()
  const handlePrevPage = () => {
    router.push(`/create?league=${league}&page=${Number(page) - 1}`)
  }

  const handleNextPage = () => {
    router.push(`/create?league=${league}&page=${Number(page) + 1}`)
  }
  return (
    <div className='flex justify-between'>
      <button onClick={handlePrevPage}>Prev Page</button>
      <button onClick={handleNextPage}>Next Page</button>
    </div>
  )
}

export default PaginationComponent
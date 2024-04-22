'use client'
import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '~/trpc/react'

const PageTest = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const { data: pool } = api.pool.getPoolById.useQuery({ id })
  console.log(pool)
  const { data } = useQuery(['pool', id], async () => await fetch(`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/summary?event=${pool?.event}`),
    { enabled: !!pool })
  console.log(data)
  return (
    <div>page</div>
  )
}

export default PageTest
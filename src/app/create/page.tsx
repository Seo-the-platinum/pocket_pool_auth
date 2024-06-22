import React from 'react'
import GamesList from '../_components/games-list'
import PaginationComponent from '../_components/create/pagination-component'
import CreateSelect from '../_components/create/create-select'
type EventTypes = {
  items: [
    game: {
      $ref: string
    }
  ]
  pageCount: number
}
const CreatePool = async ({ searchParams }: { searchParams: { league: string, page: string } }) => {
  const today = new Date()
  const year = today.getFullYear()
  const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1
  const day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate()
  const date = `${year}${month}${day}`

  const league = searchParams.league ?? ''
  const page = searchParams.page ?? '1'
  const sport = league === 'nfl' ? 'football' : 'basketball'
  const data = await fetch(`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events?dates=${date}-20241230&page=${page}`)
  const games = await data.json() as EventTypes
  const { pageCount } = games
  const prevPage = page === '1' ? false : true
  const nextPage = Number(page) === pageCount ? false : true
  return (
    <div className='page gap-16 justify-between items-center'>
      <CreateSelect league={league} />

      {
        data && <GamesList games={games.items} league={league} />
      }

      <PaginationComponent league={league} page={Number(page)} prevPage={prevPage} nextPage={nextPage} pageCount={pageCount} />
    </div>
  )
}

export default CreatePool
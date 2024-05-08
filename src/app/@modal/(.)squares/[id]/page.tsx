import React from 'react'
import Modal from '../../../_components/modal'
import { api } from '~/trpc/server'

const SquareModal = async ({ params }: { params: { id: string } }) => {
  const { id } = params
  const square = await api.square.getSquare.query({ id })
  return (
    <Modal>
      {
        <div className='size-56 rounded-md border-2 border-black flex flex-col gap-12 bg-white p-2'>
          <p className='text-black text-2xl'>{square?.number}</p>
          <p className='text-black self-center text-2xl'>{square?.name}</p>
        </div>
      }
    </Modal>
  )
}

export default SquareModal
'use client'
import React, { useState } from 'react'
import { api } from '~/trpc/react'
import type { RouterOutputs } from '~/trpc/shared'

type Square = RouterOutputs['square']['updateSquare']
const Square = (props: Square) => {
  const [status, setStatus] = useState(props.status)
  const update = api.square.updateSquare.useMutation({

    onSuccess: (square) => {
      setStatus(square.status)
    },
  })
  const { number } = props
  const toggle = () => {
    update.mutate({
      id: props.id,
      status: status === 'open' ? 'pending' : 'open',
    })
  }
  return (
    <div
      className={`${status === 'open' ? 'bg-emerald-400' : status === 'pending' ? 'bg-yellow-400' : 'bg-red-500'} border-[1px] size-10 border-black`}
      onClick={toggle}>
      {number}
    </div>
  )
}

export default Square
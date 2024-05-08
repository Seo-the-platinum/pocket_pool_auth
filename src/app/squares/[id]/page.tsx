import React from 'react'

const SquareView = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <div>{id}</div>
  )
}

export default SquareView
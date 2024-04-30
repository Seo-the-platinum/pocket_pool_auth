import React from 'react'

const PricePayouts = ({ pricePerSquare, payouts }: { pricePerSquare: string, payouts: string[] }) => {
  return (
    <div className='flex flex-col gap-2'>
      <div className='flex flex-col text-center text-2xl divide-y-2 divide-sky-500'>
        <h1>Price Per Square</h1>
        <p>{`$${pricePerSquare.toString()}`}</p>
      </div>
      <div className='flex flex-col text-center divide-y-2 divide-sky-500'>
        <h1 className='text-2xl'>Payouts</h1>
        <div className='flex gap-2 justify-end'>
          {
            payouts.map((payout, index) => {
              return (
                <div className='flex flex-col items-center' key={index}>
                  <p>Quarter {index + 1}</p>
                  <p>{`$${payout.toString()}`}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PricePayouts
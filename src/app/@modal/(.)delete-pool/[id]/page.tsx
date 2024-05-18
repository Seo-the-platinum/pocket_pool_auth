'use client'
import React from 'react'
import { api } from '~/trpc/react'
import { useRouter } from 'next/navigation'
import Modal from '~/app/_components/modal'

const ModalDeletePool = ({ params }: { params: { id: string } }) => {
  const router = useRouter()
  const { id } = params
  const mutation = api.pool.deletePool.useMutation({
    onSuccess: () => {
      router.back()
      router.push('/')
    }
  })
  const handleDelete = () => {
    mutation.mutate({ id })
  }

  const handleCancel = () => {
    router.back()
  }
  return (
    <Modal>
      <div className='model'>
        <p className='text-4xl'>Delete Pool?</p>
        <div className='flex gap-8'>
          <button className='btn' onClick={handleCancel}>Cancel</button>
          <button className='btn' onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDeletePool
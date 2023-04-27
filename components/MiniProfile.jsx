import React from 'react'
import { signOut, useSession } from 'next-auth/react'

const MiniProfile = () => {

  const {data: session} = useSession()


  return (
    <div className='flex items-center justify-between mt-12 ml-10'>
        <img src={session?.user?.image}
            className='rounded-full h-16 object-contain border p-2  '></img>

        <div className='flex-1 mx-4'>
            <h2 className='font-bold'>{session?.user?.username}</h2>
            <h3 className='text-sm text-gray-600'>Welcome to Instagach</h3>
        </div>

        <button
          onClick={signOut}
          className='text-blue-900 font-semibold hover:opacity-70 hover:shadow-2xl'>Sign Out</button>
    </div>
  )
}


export default MiniProfile
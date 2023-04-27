import React, { useEffect, useState } from 'react'
import { fakeUsers } from '../utils/faker';
import Story from './Story';
import { useSession } from 'next-auth/react';

const Stories = () => {

  const [data, setData] = useState([])
  const {data:session} = useSession()
  useEffect(() => {
    const loadData = fakeUsers(20)

    setData(loadData)

  },[])
 

  return (
    <div className='flex space-x-2 p-6 bg-white mt-6 border-gray-300 border rounded-sm
    overflow-x-scroll scrollbar-thin scrollbar-thumb-black'>
      {session && (
        <Story img={session.user.image} name={session.user.username}/>
      )}
      {data.map(item => (
        <Story key={item.id} img={item.avatar} name={item.fullName} />
      ))}
   
      
      {/*Story */}
      {/*Story */}
      {/*Story */}
      {/*Story */}
      {/*Story */}
      {/*Story */}

    </div>
  )
}

export default Stories
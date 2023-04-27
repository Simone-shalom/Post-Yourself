import React, { useEffect, useState } from 'react'
import { fakeUsers } from '../utils/faker'

const Suggestions = () => {

const [sugg, setSugg] = useState([])

useEffect(() => {
    const loadData2 = fakeUsers(5)

    setSugg(loadData2)
},[])

  return (
    <div className='mt-4 ml-10'>
        <div className='flex justify-between text-sm mb-5'>
            <h3 className='text-sm font-bold '>Suggestions for You</h3>
            <button className='text-gray-700 font-semibold'>See all</button>
        </div>
        {sugg.map((item) => (
            <div key={item.id} className='flex items-center justify-between mt-3'>
                <img src={item.avatar} className='w-10 border p-[2px] rounded-full object-contain'/>

                <div className='flex-1 ml-4'>
                    <h1 className='text-sm font-semibold'>{item.fullName}</h1>
                </div>
                <button className='text-blue-900 text-sm font-semibold hover:opacity-70'>Follow</button>
            </div>
        ))}
    </div>
  )
}

export default Suggestions
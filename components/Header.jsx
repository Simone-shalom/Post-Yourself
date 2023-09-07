import { HeartStraight, House, List, MagnifyingGlass, PaperPlane, PlusCircle, UsersThree } from '@phosphor-icons/react'
import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useRecoilState } from 'recoil'
import { modalState } from '../atoms/modalAtom'

const Header = () => {

    const { data: session } = useSession()

    const [ open, setOpen] = useRecoilState(modalState)
    

  return (
    <div className='shadow-md sticky top-0 z-50 bg-white '>
       <div className='flex justify-between bg-white max-w-[1440px] mx-5 pt-3 pb-2 2xl:mx-auto  '>

        {/*Left Side */}
        <div className='relative hidden lg:block cursor-pointer'>
            <Link href='/'>
            <h1 className='text-2xl italic '>PostYourself</h1>
            </Link>
        </div>
        <div className='relative block lg:hidden flex-shrink-0 cursor-pointer'>
            <Link href='/'>
            <Image 
                src='/logo-ig-instagram-icon-download-icons-12.png'
                width={50}
                height={32}
                alt=''/>
            </Link>
            
        </div>

        {/*Middle- search input field*/}
        <div className='mt-1'>
            <div className='flex space-x-3 hover:border-black border-gray-300 border-2 rounded-xl p-1 mx-2 w-40 md:w-52'>
                <div>
                    <MagnifyingGlass size={20} color="#1a1a1a" weight="bold" />
                </div>
                <input type='text' placeholder='Search...' className='focus:outline-none w-28 md:w-36'/>
            </div>
        </div>

        {/*Right Side */}
        <div className='flex justify-end  items-center space-x-4'>
            <Link href='/'>
                <House size={32} color="#1a1a1a" weight="bold" className='navBtn' />
            </Link>
            
            <List size={20} color="#1a1a1a" weight="bold" className='md:hidden cursor-pointer'/>
         
                {session ? (
                    <>
                    <div className='relative navBtn'>
                    
                        <PaperPlane className='navBtn rotate-45' size={32} color="#1a1a1a" weight='bold'/>
                        <div className='absolute -top-1 -right-1 text-xs w-5 h-5 bg-red-500 rounded-full flex items-center 
                        justify-center animate-pulse text-white'>3
                        </div>
                        </div>
                        <PlusCircle 
                            onClick={() => setOpen(true)}
                            size={32} color="#1a1a1a" weight="bold" className='navBtn'/>
                        <UsersThree size={32} color="#1a1a1a" weight="bold" className='navBtn'/>
                        <HeartStraight size={32} color="#1a1a1a" weight="bold" className='navBtn'/>
                        <img 
                            onClick={signOut}
                            src={session.user?.image}
                            alt='' 
                            className='h-8 rounded-full cursor-pointer'/>
                </>
                ): (
                    <div>
                        <button onClick={signIn}>Sign In</button>
                    </div>
                )}
               

         
        </div>
    </div>

    </div>
  )
}

export default Header
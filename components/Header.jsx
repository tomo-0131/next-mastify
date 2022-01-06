import Image from "next/image"
import { HeartIcon, HomeIcon, MenuIcon, PaperAirplaneIcon, PlusCircleIcon, SearchIcon, UserGroupIcon } from '@heroicons/react/outline'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";

function Header() {

  const { data:session } = useSession();
  console.log(session);

  const router = useRouter();

  const [isOpen, setIsOpen] = useRecoilState(modalState);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* left */}
        <div onClick={()=>router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer">
          <p className="mt-4 text-2xl">Mastify</p>
        </div>

        <div onClick={()=>router.push('/')} className="relative w-10 mt-1 mr-6 text-md lg:hidden flex-shrink-0 cursor-pointer">
          <p className='mt-5 text-{nxl}'>Mastify</p>
        </div>

        {/* middle Search-Input-Field */}
        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500"/>
          </div>
          <input className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md" type="text" placeholder="search" />
        </div>

        {/* Right */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon onClick={()=>router.push('/')} className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon  className="navBtn rotate-45"/>
                <div className="absolute -top-2 -right-2 text-sm w-5 bg-red-400 rounded-full flex items-center justify-center animate-pulse text-white">1</div>
              </div>
              <PlusCircleIcon onClick={()=> setIsOpen(true)} className="navBtn" />
              {/* <UserGroupIcon className="navBtn"/> */}
              <HeartIcon className="navBtn" />
              <img src={session.user.image} className="h-10 w-10 rounded-full cursor-pointer" onClick={signOut}
              />
            </>
          ): (
            <button onClick={signIn}>SignIn</button>
          )}
        </div>

      </div>
    </div>

  )
}

export default Header

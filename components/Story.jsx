import Image from "next/image"

function Story({ id, username }) {
  return (
    <div>
      <img className="h-14 w-14 rounded-full p-[1.5px] border-red-500 border-2 object-contain cursor-pointer hover:scale-110 transition transform duration-200 ease-out" src={`https://i.pravatar.cc/100?img=${id}`} alt="avatar" />
      <p className="text-xs w-14 truncate text-center">{username}</p>
    </div>
  )
}

export default Story

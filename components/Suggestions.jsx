import faker from "faker"
import { useEffect, useState } from "react"

function Suggestions() {
  const [suggetstions, setSuggestions] = useState([])

  useEffect(()=> {
    const suggestions = [...Array(5)].map((_,i) => (
      {
        ...faker.helpers.contextualCard(),
        id: 1,
      }))
      setSuggestions(suggestions)
  },[]);

  return (
    <div>
      <div className="mt-4 ml-10">
        <div className="flex justify-between text-sm mb-5">
          <h3 className="font-semibold text-sm text-gray-400">Suggestions for you</h3>
          <button className="text-gray-600 font-semibold">See All</button>
        </div>
      </div>

      {suggetstions.map((profile, id) => (
          <div key={profile.id} className="flex items-center ml-10 mt-3">
            <img className="w-10 h-10 rounded-full border p-[2px]" src={`https://i.pravatar.cc/100?img=${id}`}/>
            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.username}</h2>
              <h3 className="text-xs text-gray-400 truncate">{profile.company.name}</h3>
            </div>
            <button className="text-blue-400 font-semibold">Follow</button>
          </div>
        ))
      }
    </div>

  )
}

export default Suggestions

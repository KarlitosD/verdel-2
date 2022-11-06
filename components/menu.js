import useSWR from "swr";
import Jazzicon from 'react-jazzicon'


export default function Menu() {
    const {data : lists} = useSWR('/api/lists')

    return (
    <>
      <div className="w-1/5 flex flex-col bg-gray-300 border-r border-gray-500 h-screen">
        {lists?.map(list => (
            <div key={list.id} className="flex items-center pt-2 pl-2 mr-2 border-b border-gray-500 hover:bg-gray-400">
                <div className="inline ml-1">
                <Jazzicon diameter={50} seed={Number(list.name.split("").map(l => l.charCodeAt()).join(""))} />  
                </div>
                <h1 className="inline ml-2 pb-3 w-full">{list.name}</h1>
            </div>
        ))}
      </div>
    </>
  );
}

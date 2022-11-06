import useSWR from "swr";
import Jazzicon from 'react-jazzicon'


export default function Menu() {
    const {data : lists} = useSWR('/api/lists')

    return (
    <>
      <div className="w-1/5 flex flex-col">
        {lists?.map(list => (
            <div key={list.id} className="inline-flex items-center py-2 pl-2">
                <Jazzicon diameter={50} seed={Number(list.name.split("").map(l => l.charCodeAt()).join(""))} />
                <h1 className="ml-2 ">{list.name}</h1>
            </div>
        ))}
      </div>
    </>
  );
}

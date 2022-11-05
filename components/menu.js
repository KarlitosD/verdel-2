import useSWR from "swr";
import Jazzicon from 'react-jazzicon'


export default function Menu() {
    const {data : lists} = useSWR('/api/lists')

    return (
    <>
      <div>
        {lists?.map(list => (
            <div key={list.id} className="inline-flex">
                <Jazzicon diameter={50} seed={Number(list.name.split("").map(l => l.charCodeAt()).join(""))} />
                <h1>{list.name}</h1>
            </div>
        ))}
      </div>
    </>
  );
}

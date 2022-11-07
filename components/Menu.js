import useSWR from "swr";
import Jazzicon from "react-jazzicon";
// import useSections from "hooks/useSections";
import Link from "next/link";
import MenuHeader from "./MenuHeader";

export default function Menu({  }) {
  // const { data: lists } = useSWR("/api/lists");
  // if(!lists) return <div>Loading</div>
  const lists = [{}]
  return (
    <>
      <div className="w-1/5 flex flex-col bg-gray-50 border-r border-gray-100 min-h-screen">
        {/* <MenuHeader/> */}
        {lists?.map((list) => (
          <div
            key={list.id}
            className="flex items-center pt-2 pl-2 mr-2 border-b border-gray-500 cursor-pointer hover:bg-gray-200"
          >
            <Link href={`/${list.id}`}>
              <a>
                <Jazzicon
                  diameter={50}
                  seed={Number(
                    list.name
                      ?.split("")
                      .map((l) => l.charCodeAt())
                      .join("")
                  )}
                />
                <h1 className="inline ml-2 pb-3 w-full">{list.name}</h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

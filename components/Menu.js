import useSWR from "swr";
import Jazzicon from "react-jazzicon";
// import useSections from "hooks/useSections";
import Link from "next/link";
import MenuHeader from "./MenuHeader";
import useLists from "hooks/useLists";

export default function Menu() {
  const { lists = [], addList } = useLists()
  const handleAddList = () => {
    addList({ name: "New List" })
  }
  return (
    <>
      <div className="w-1/5 flex flex-col  border-r border-gray-100 min-h-screen bg-gray-50 dark:bg-stone-800 dark:border-gray-700 scrollbar-thin scrollbar-thumb-rounded-md scrollbar-thumb-gray-800 scrollbar-track-gray-700">
        <MenuHeader handleAddList={handleAddList} />
        {lists?.map((list) => (
          <div
            key={list.id}
            className="flex items-center py-2 pl-2 mr-2 border-b border-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-stone-700"
          >
            <Link href={`/${list.id}`}>
              <a className="flex lace-items-center w-full">
                <span className="max-h-[50px] max-w-[50px]">
                  <Jazzicon
                    diameter={45}
                    seed={Number(
                      list.name
                        ?.split("")
                        .map((l) => l.charCodeAt())
                        .join("")
                    )}
                  />
                </span>
                <h1 className="self-center ml-2 w-full">{list.name}</h1>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

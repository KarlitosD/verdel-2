import useSWR from "swr";
import Jazzicon from "react-jazzicon";
// import useSections from "hooks/useSections";
import Link from "next/link";
import MenuHeader from "./MenuHeader";

export default function Menu() {
  const { data: lists } = useSWR("/api/lists");
  if (!lists) return <div>Loading</div>;
  return (
    <>
      <div className="w-1/5 flex flex-col  border-r border-gray-100 min-h-screen bg-gray-50 dark:bg-gray-700 dark:border-gray-700">
        <MenuHeader />
        {lists?.map((list) => (
          <div
            key={list.id}
            className="flex items-center py-2 pl-2 mr-2 border-b border-gray-500 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Link href={`/${list.id}`}>
              <a className="flex lace-items-center w-full">
                <span className="max-h-[50px] max-w-[50px]">
                  <Jazzicon
                    diameter={50}
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

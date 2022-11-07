import Jazzicon from "react-jazzicon";

export default function Header({ listTitle }) {
    return (
    <div className="bg-orange-500 flex items-center w-full py-2 px-5">
        <Jazzicon
                  diameter={50}
                  seed={Number(
                    listTitle
                      ?.split("")
                      .map((l) => l.charCodeAt())
                      .join("")
                  )}
                />
        <h1 className="ml-4 text-black dark:text-white font-extrabold text-lg">
            {listTitle}
        </h1>
    </div>
  );
}
import Jazzicon from "react-jazzicon";

export default function Header({ name, users }) {
  console.log(users);
  return (
    <div className="bg-orange-500 flex items-center w-full py-2 px-5">
<<<<<<< HEAD
        <Jazzicon
                  diameter={45}
                  seed={Number(
                    listTitle
                      ?.split("")
                      .map((l) => l.charCodeAt())
                      .join("")
                  )}
                />
        <h1 className="ml-4 text-gray-800 font-extrabold text-lg">
            {listTitle}
        </h1>
=======
      <Jazzicon
        diameter={40}
        seed={Number(
          name
            ?.split("")
            .map((l) => l.charCodeAt())
            .join("")
        )}
      />
      <div className="ml-4">
        <h1 className="text-gray-800 font-extrabold text-lg">{name}</h1>
        <h2 className="text-black font-semibold">{users.map((user) => user.name).join(", ")}</h2>
      </div>
>>>>>>> ce0a4cfa52f70d8291513543492443de1361562d
    </div>
  );
}

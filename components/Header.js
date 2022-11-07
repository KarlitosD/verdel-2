import { PencilSquareIcon } from "@heroicons/react/24/outline";
import useLists from "hooks/useLists";
import { useState } from "react";
import Jazzicon from "react-jazzicon";

export default function Header({ name, users, id }) {
  const [listName, setListName] = useState(name || "")
  const [isEditable, setIsEditable] = useState(false)
  const { editList } = useLists()

  const toggleEditName = () => {
    setIsEditable(!isEditable)
    if (!isEditable) return
    editList(id, { name: listName })
  }

  const handleInvite = async () => {
    try {
      await navigator.share({
        title: 'Link de invitacion',
        text: 'Usa este link para invitar a alguien a la lista',
        url: process.env.NEXTAUTH_URL + "invite/" + id
      });
    } catch (err) {
      alert(err)
    }
  }

  return (
    <div className="bg-orange-500 flex justify-between items-start w-full py-2 px-5 gap-2">
      <div className="flex items-start gap-3">
        <Jazzicon
          diameter={40}
          seed={Number(
            name
              ?.split("")
              .map((l) => l.charCodeAt())
              .join("")
          )}
        />
        <div className="flex flex-col justify-end">
          <div className="flex  gap-2 ">
            <input type="text" className={`rounded-lg h-6 text-black text-xl font-medium px-1 w-40 ${isEditable ? "bg-white dark:bg-white " : "bg-transparent"}`} value={listName} readOnly={!isEditable} onChange={e => setListName(e.target.value)} />
            <button className="rounded-lg flex items-center" onClick={toggleEditName}>
              <PencilSquareIcon className={`h-6 w-6 transition ${isEditable ? "stroke-white" : "stroke-black hover:stroke-white"}`} />
            </button>
          </div>
          <h2 className="text-black font-semibold">{users.map((user) => user.name).join(", ")}</h2>
        </div>
      </div>
      <button onClick={handleInvite}>Invitar</button>
    </div>
  );
}

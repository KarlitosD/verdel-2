import Image from "next/image";
import { useSession } from "next-auth/react";
import Dropdown from "./Dropdown";

export default function MenuHeader({ handleAddList }) {
  const { data } = useSession();
  return (
    <div className="bg-orange-500 flex w-full justify-between py-2 px-5">
      <Dropdown>
        {data?.user?.image && (
          <Image
            src={data?.user?.image}
            width={40}
            height={40}
            alt="Imagen del perfil"
            className="rounded-full"
          />
        )}
      </Dropdown>
      <button onClick={handleAddList} className="text-4xl text-black">+</button>
    </div>
  );
}

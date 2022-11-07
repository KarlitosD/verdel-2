import Image from "next/image";
import { useSession } from "next-auth/react";

export default function MenuHeader() {
    const { data } = useSession();
    return (
    <div className="bg-orange-500 flex w-full justify-between py-1 px-5">
        <Image 
        src={data?.user?.image}
        width={50}
        height={50}
        alt=""
        className="rounded-full"
        />
      <button className="text-4xl text-white">+</button>
    </div>
  );
}

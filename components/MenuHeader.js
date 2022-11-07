import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function MenuHeader() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  return (
    <div className="bg-orange-500 flex w-full justify-between py-2 px-5">
      <Image
        src={data?.user?.image}
        width={50}
        height={50}
        alt=""
        className="rounded-full"
      />
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>toggle</button>
      <button className="text-4xl text-black dark:text-white">+</button>
    </div>
  );
}

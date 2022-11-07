import Image from "next/image";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import Dropdown from "./Dropdown";

export default function MenuHeader() {
  const { theme, setTheme } = useTheme();
  const { data } = useSession();
  const options = ["Modo Oscuro", "Cerrar Sesión"]
  return (
    <div className="bg-orange-500 flex w-full justify-between py-2 px-5">
      <Dropdown options={options}>
        {data?.user?.image && (
          <Image
            src={data?.user?.image}
            width={50}
            height={50}
            alt="Imagen del perfil"
            className="rounded-full"
          />
        )}
      </Dropdown>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        toggle
      </button>
      <button className="text-4xl text-black">+</button>
    </div>
  );
}

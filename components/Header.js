

export default function Header({ listTitle }) {
    return (
    <div className="bg-orange-500 flex w-full justify-between py-1 px-5 h-[58px]">
        <h1 className="text-white">
            {listTitle}
        </h1>
    </div>
  );
}
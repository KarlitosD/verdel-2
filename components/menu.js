import { useState } from "react";
import { useSession } from "next-auth/react";
import useSWR from "swr";


export default function Menu() {
    const {data : lists} = useSWR('/api/lists')

    return (
    <>
      <div>
        {lists?.map(list => (
            <div key={list.id}>
                <h1>{list.name}</h1>
            </div>
        ))}
      </div>
    </>
  );
}

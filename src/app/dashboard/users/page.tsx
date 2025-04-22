import React from "react";
import "../../../app/globals.css";
import Link from "next/link";

const Page = () => {
  return (
    <div>
      <h1>Users</h1>
      <ul className="mt-10 text-3xl text-white font-black">
        <li>
          <Link href="users/1">user 1</Link>
        </li>
        <li>
          <Link href="users/2">user 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Page;

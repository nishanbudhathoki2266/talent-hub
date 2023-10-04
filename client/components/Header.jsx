import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40 flex justify-between items-center px-3 container mx-auto">
      <h2 className="text-xl md:text-3xl font-bold tracking-widest">
        DALAY DAI
      </h2>
      <div>
        <ul className="flex space-x-10">
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent `}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent`}
          >
            <Link href="/offers">Offers</Link>
          </li>
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent "
            }`}
          >
            <Link href="/signin">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

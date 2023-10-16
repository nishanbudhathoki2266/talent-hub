import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();

  const matchPath = (route) => {
    if (route === router.asPath) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40 flex justify-between items-center px-3 container mx-auto">
      <Link
        href="/"
        className="text-xl md:text-2xl font-bold tracking-widest cursor-pointer"
      >
        <h2 className="uppercase text-black tracking-tighter">
          Talent <span className="text-secondary">Hub</span>
        </h2>
      </Link>
      <div>
        <ul className="flex space-x-10">
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              matchPath("/") ? "text-black border-b-red-500" : ""
            }`}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className={`cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent ${
              matchPath("/sign-in") ? "text-black border-b-red-500" : ""
            }"
            }`}
          >
            <Link href="/sign-in">Sign In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

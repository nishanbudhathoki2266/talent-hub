import getIsLoggedIn from "@/utils/getCookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Header() {
  // state for maintaing authenticated state
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const router = useRouter();

  const matchPath = (route) => {
    if (route === router.asPath) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    // Using document to get access to available cookies
    const isAuth = getIsLoggedIn();
    if (isAuth) setIsLoggedIn(true);
    else setIsLoggedIn(false);
  });

  return (
    <header className="bg-white border-b shadow-sm sticky top-0 z-40 flex justify-between items-center px-3 container mx-auto">
      <Link
        href="/"
        className="text-xl md:text-2xl font-bold tracking-widest cursor-pointer"
      >
        <h2 className="uppercase tracking-tighter">
          Talent <span className="text-secondary">Hub</span>
        </h2>
      </Link>
      <div>
        <ul className="flex space-x-10">
          <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
            <Link
              href="/"
              className={`${
                matchPath("/")
                  ? "text-black border-b-2 border-spacing-2 border-b-red-500"
                  : ""
              }`}
            >
              Home
            </Link>
          </li>
          {isLoggedIn || (
            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <Link
                href="/sign-in"
                className={`${
                  matchPath("/sign-in")
                    ? "text-black border-b-2 border-spacing-2 border-b-red-500"
                    : ""
                }`}
              >
                Sign In
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <Link
                href="/profile"
                className={`${
                  matchPath("/profile")
                    ? "text-black border-b-2 border-spacing-2 border-b-red-500"
                    : ""
                }`}
              >
                Profile
              </Link>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

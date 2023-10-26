import { db } from "@/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loader from "./Loader";

export default function Header() {
  const auth = getAuth();
  // state for maintaing authenticated state
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [isLoadingUserDetails, setIsLoadingUserDetails] = useState(false);
  const router = useRouter();

  const matchPath = (route) => {
    if (route === router.asPath) {
      return true;
    } else {
      return false;
    }
  };

  // Check if there is user logged in
  useEffect(() => {
    setIsLoadingUserDetails(true);
    // Also can check logged in state with cookies, here is a firebase way
    onAuthStateChanged(auth, (user) => {
      if (user) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
    // Using document to get access to available cookies (side effect)
    // const isAuth = getIsLoggedIn();
    // if (isAuth) setIsLoggedIn(true);
    // else setIsLoggedIn(false);

    setIsLoadingUserDetails(false);
  }, []);

  if (isLoadingUserDetails) return <Loader />;

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
                  ? "text-black border-b-2 border-b-red-500 py-2"
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
                    ? "text-black border-b-2 border-b-red-500 py-2"
                    : ""
                }`}
              >
                Sign In As A Talent
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="cursor-pointer py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent">
              <Link
                href="/profile"
                className={`${
                  matchPath("/profile")
                    ? "text-black border-b-2 border-b-red-500 py-2"
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

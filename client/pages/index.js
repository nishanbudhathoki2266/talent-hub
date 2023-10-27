import React, { useEffect, useState } from "react";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/firebase";
import TalentCard from "@/components/TalentCard";
import { debounce } from "debounce";

const Index = () => {
  const [talents, setTalents] = useState([]);

  // Setting limit (how many users are shown in a page)
  const [talentsLimit, setTalentsLimit] = useState(5);

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;

    if (scrollY + windowHeight >= bodyHeight - 200) {
      setTalentsLimit((limit) => limit + 5);
    }
  };

  const debouncedHandleScroll = debounce(handleScroll, 100);

  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);

    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersRef = collection(db, "users");
      const usersCollection = query(usersRef, limit(talentsLimit));
      const querySnapshot = await getDocs(usersCollection);

      const talentsData = [];

      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          talentsData.push(doc.data());
        }
      });

      setTalents(talentsData);
    };

    fetchUsers();
  }, [talentsLimit]);

  return (
    <section className="text-gray-600 min-h-screen divide-y-8 divide-white body-font overflow-hidden container py-4 mx-auto">
      {talents?.map((talent) => (
        <TalentCard key={talent.uid} talent={talent} />
      ))}
    </section>
  );
};

export default Index;

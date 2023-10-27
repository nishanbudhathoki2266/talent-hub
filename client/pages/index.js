import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import TalentCard from "@/components/TalentCard";

const Index = () => {
  const [talents, setTalents] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
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
  }, []);

  return (
    <section className="text-gray-600 divide-y-8 divide-white body-font overflow-hidden container py-4 mx-auto">
      {talents?.map((talent) => (
        <TalentCard key={talent.uid} talent={talent} />
      ))}
    </section>
  );
};

export default Index;

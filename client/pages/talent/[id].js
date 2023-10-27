import { useRouter } from "next/router";
import React from "react";

const TalentDetailsPage = () => {
  const router = useRouter();
  console.log(router.query.id);
  return <div>TalentDetailsPage</div>;
};

export default TalentDetailsPage;

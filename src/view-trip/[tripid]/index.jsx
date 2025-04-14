// Viewtrip.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "sonner";
import { motion } from "framer-motion";
import InfoSection from "./components/infoSection";
import Hotels from "./components/Hotels";
import PlacesToVisit from "./components/PlacesToVisit";

function Viewtrip() {
  const { tripid } = useParams();
  const [trip, setTrip] = useState([]);

  useEffect(() => {
    tripid && GetTripData();
  }, [tripid]);

  const GetTripData = async () => {
    const docRef = doc(db, "AI-Trips", tripid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setTrip(docSnap.data());
    } else {
      toast("No Such Document");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="p-10 md:px-20 lg:px-44 xl:px-56"
    >
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
    </motion.div>
  );
}

export default Viewtrip;

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import { SelectTravelsList, SelectBudgetOptions } from "../constants/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { AI_PROMPT } from "../constants/options";
import { chatSession } from "../service/AIModel.jsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Animation constants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120 },
  },
};

const cardHover = {
  scale: 1.02,
  transition: { type: "spring", stiffness: 300 },
};

const cardTap = {
  scale: 0.98,
};

function CreateTrip() {
  const [place, setPlace] = useState();
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }

    if (
      (formData?.noOfDays > 5 && !formData?.location) ||
      !formData?.budget ||
      !formData?.travelers
    ) {
      toast("Please fill all details.");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData?.location?.label
    )
      .replace("{totalDays}", formData?.noOfDays)
      .replace("{Travelers}", formData?.travelers)
      .replace("{budget}", formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    setLoading(false);
    SaveAiTrip(result?.response?.text());
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AI-Trips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "application/json",
          },
        }
      )
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="font-bold text-3xl"
      >
        Tell us your travel preferences 🚞🌴
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-3 text-gray-500 text-xl"
      >
        Just provide some basic information, and our trip planner will generate
        a customized itinerary based on your preferences.
      </motion.p>

      <motion.div
        className="mt-20 flex flex-col gap-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-xl my-3 font-medium">
            What is your destination of choice?
          </h2>
          <motion.div whileHover={{ scale: 1.01 }}>
            <GooglePlacesAutocomplete
              apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
              selectProps={{
                placeholder: "Search for a destination",
                onChange: (v) => {
                  setPlace(v);
                  handleInputChange("location", v);
                },
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <motion.div whileHover={{ scale: 1.01 }}>
            <Input
              placeholder={"Ex.3"}
              type="number"
              onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl my-3 font-medium">What is Your Budget?</h2>
          <div className="grid cursor-pointer grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                whileHover={cardHover}
                whileTap={cardTap}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${formData?.budget === item.title && "shadow-lg border-black"}
                `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div variants={itemVariants}>
          <h2 className="text-xl my-3 font-medium">
            What do you plan on traveling with on your next adventure?
          </h2>
          <div className="grid cursor-pointer grid-cols-3 gap-5 mt-5">
            {SelectTravelsList.map((item, index) => (
              <motion.div
                key={index}
                onClick={() => handleInputChange("travelers", item.people)}
                whileHover={cardHover}
                whileTap={cardTap}
                className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                  ${
                    formData?.travelers === item.people &&
                    "shadow-lg border-black"
                  }
                `}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="my-10 justify-end flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDailog}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <DialogContent className="sm:max-w-md rounded-xl">
            <DialogHeader className="relative">
              <DialogTitle className="text-center text-2xl font-bold">
                Welcome to MyApp
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center px-8 py-4">
              <motion.div
                className="mb-8 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <motion.img
                  src="/logo.svg"
                  alt="Logo"
                  className="mx-auto h-16 w-16 rounded-full bg-background p-2 shadow-sm"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
                <h2 className="mt-4 text-xl font-semibold">
                  Continue to MyApp
                </h2>
                <p className="text-muted-foreground mt-2 text-sm">
                  Securely authenticate with your Google account
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={login}
                  className="w-full px-6 py-5 text-base shadow-sm transition-all hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <FcGoogle className="h-6 w-6" />
                    <span>Sign in with Google</span>
                  </div>
                </Button>
              </motion.div>

              <p className="text-muted-foreground mt-6 text-center text-sm">
                By continuing, you agree to our Terms of Service and Privacy
                Policy
              </p>
            </div>
          </DialogContent>
        </motion.div>
      </Dialog>
    </motion.div>
  );
}

export default CreateTrip;

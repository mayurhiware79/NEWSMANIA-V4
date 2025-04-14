import { motion } from "framer-motion";
import {
  Newspaper,
  BarChart2,
  Globe,
  Award,
  Users,
  TrendingUp,
} from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const cardHoverVariants = {
  hover: {
    y: -5,
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
  },
};

const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-16">
      {/* Hero Section */}

      {/* Mission Statement */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-8 mb-16 border border-indigo-100"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Our Mission
        </h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-lg text-gray-700 text-center max-w-4xl mx-auto leading-relaxed"
        >
          In a world of information overload and media bias, NewsMania exists to
          empower readers with a holistic understanding of current events. We
          believe that seeing multiple perspectives is not just informative—it's
          essential for forming independent opinions and fostering critical
          thinking.
        </motion.p>
      </motion.div>

      {/* What Sets Us Apart */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10">
          What Sets Us Apart
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <BarChart2 className="h-10 w-10 text-indigo-600" />,
              title: "AI-Powered News Lens™",
              description:
                "Our proprietary algorithm detects bias, tone, and sentiment in news articles.",
            },
            {
              icon: <Globe className="h-10 w-10 text-indigo-600" />,
              title: "Multi-Perspective Dashboard",
              description:
                "View news stories categorized into different viewpoints.",
            },
            {
              icon: <TrendingUp className="h-10 w-10 text-indigo-600" />,
              title: "Perspective Timeline",
              description:
                "Track how news stories evolve across different sources.",
            },
            {
              icon: <Newspaper className="h-10 w-10 text-indigo-600" />,
              title: "Interactive Workspace",
              description: "Clip articles, take notes, and organize research.",
            },
            {
              icon: <Award className="h-10 w-10 text-indigo-600" />,
              title: "Fact vs. Opinion Highlighter",
              description:
                "Distinguishes between factual reporting and opinion.",
            },
            {
              icon: <Users className="h-10 w-10 text-indigo-600" />,
              title: "Community Insights",
              description: "Engage with a community of critical thinkers.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover="hover"
              className="flex-1"
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Our Story */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-6">
          Our Story
        </h2>
        <div className="bg-white rounded-2xl p-8 border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-700 mb-4 leading-relaxed"
          >
            NewsMania was born from a simple observation: in today's digital
            world, we're drowning in news but starving for clarity.
          </motion.p>
          {/* Add more animated paragraphs */}
        </div>
      </motion.div>

      {/* Values */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-800 mb-10">
          Our Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Transparency",
              description: "Clear disclosure of our analysis methods.",
            },
            {
              title: "Balance",
              description: "Presenting diverse viewpoints fairly.",
            },
            {
              title: "Innovation",
              description: "Continuous improvement of our AI.",
            },
            {
              title: "Empowerment",
              description: "Tools for informed opinions.",
            },
          ].map((value, index) => (
            <motion.div key={index} variants={itemVariants} className="flex-1">
              <ValueCard {...value} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Join Our Journey */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-3xl font-bold text-indigo-800 mb-6">
          Join Our Journey
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Try NewsMania Today
        </motion.button>
      </motion.div>
    </div>
  );
};

// Enhanced Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div
      variants={cardHoverVariants}
      className="bg-white rounded-2xl p-6 border border-indigo-100 hover:border-indigo-200 transition-all h-full"
    >
      <div className="flex flex-col items-center text-center">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="mb-4 p-4 bg-indigo-50 rounded-full"
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// Enhanced Value Card Component
const ValueCard = ({ title, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white rounded-2xl p-6 border-l-4 border-indigo-500 shadow-sm hover:shadow-md transition-all"
    >
      <h3 className="text-xl font-semibold text-indigo-800 mb-2">{title}</h3>
      <p className="text-gray-700 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default AboutUs;

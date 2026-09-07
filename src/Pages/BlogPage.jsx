import { useEffect } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { trackMetaEvent } from "../Components/Analytics/pixelEvents";

export default function BlogPage() {
  useEffect(() => {
    trackMetaEvent("ViewContent", {
      content_name: "Hotel Sherpa Soul Blog",
      content_category: "blog",
      content_type: "website",
    });
  }, []);

  return (
    <main>
      <section className="relative min-h-[78vh] overflow-hidden bg-slate-950">
        <motion.img
          src="/changes_photo/viewSeen.jpeg"
          alt="Hotel Sherpa Soul rooftop terrace in Kathmandu"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/20" />

        <div className="relative z-10 mx-auto flex min-h-[78vh] max-w-7xl items-center px-6 pb-16 pt-32 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="max-w-3xl text-white"
          >
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium uppercase tracking-[0.2em] backdrop-blur-md">
              <BookOpen className="h-4 w-4 text-orange-400" />
              Sherpa Soul Journal
            </div>

            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Stories from the
              <span className="block text-orange-400">heart of Kathmandu</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
              Local stories, travel inspiration, and thoughtful guides for your
              stay in Nepal.
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 z-10 h-1 w-full bg-gradient-to-r from-orange-500 via-orange-300 to-transparent" />
      </section>
    </main>
  );
}

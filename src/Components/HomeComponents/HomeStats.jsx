import React from "react";
import { Star, MapPin, Users, Award, Coffee } from "lucide-react";
import { useTranslation } from "react-i18next";

// Mock CountUp component since it's not available in this environment
const CountUp = ({ end, decimals = 0, duration = 2, suffix = "" }) => {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = progress * end;
      setCount(
        decimals ? currentCount.toFixed(decimals) : Math.floor(currentCount)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [end, decimals, duration]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
};

// Mock useInView hook
const useInView = ({ triggerOnce, threshold }) => {
  const [inView, setInView] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      { threshold }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnce, threshold]);

  return [ref, inView];
};

export default function HomeStats() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("homestats.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("homestats.subtitle")}
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* TripAdvisor Rating */}
          <StatCard
            icon={<Award className="w-10 h-10" />}
            iconColor="text-green-600"
            bgGradient="from-green-50 to-green-100"
            imageSrc="/trip.webp"
            imageAlt="TripAdvisor"
            rating={4.8}
            reviews={500}
            inView={inView}
          />

          {/* Google Reviews */}
          <StatCard
            icon={<Star className="w-10 h-10" />}
            iconColor="text-blue-600"
            bgGradient="from-blue-50 to-blue-100"
            imageSrc="/google.png"
            imageAlt="Google"
            rating={4.9}
            reviews={600}
            inView={inView}
          />

          {/* Happy Guests */}
          <StatCard
            icon={<Users className="w-10 h-10" />}
            iconColor="text-orange-600"
            bgGradient="from-orange-50 to-orange-100"
            count={5000}
            label="Happy Guests"
            subLabel="Since 2018"
            inView={inView}
          />

          {/* Years of Excellence */}
          <StatCard
            icon={<Coffee className="w-10 h-10" />}
            iconColor="text-purple-600"
            bgGradient="from-purple-50 to-purple-100"
            count={6}
            label="Years"
            subLabel="Of Excellence"
            inView={inView}
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({
  icon,
  iconColor,
  bgGradient,
  imageSrc,
  imageAlt,
  rating,
  source,
  reviews,
  count,
  label,
  subLabel,
  inView,
}) {
  const { t } = useTranslation();
  return (
    <div>
      <div
        className={`
        relative p-8 backdrop-blur-sm
      `}
      >
        {/* Icon Container */}
        <div
          className={`
          w-20 h-20 bg-gradient-to-br ${bgGradient} 
          rounded-2xl flex items-center justify-center mx-auto mb-6
        `}
        >
          {imageSrc ? (
            <img
              src={imageSrc}
              alt={imageAlt || ""}
              className=" object-cover rounded-xl"
              loading="lazy"
            />
          ) : (
            <div className={iconColor}>{icon}</div>
          )}
        </div>

        {/* Content */}
        <div className="text-center space-y-3">
          {rating ? (
            <>
              {/* Star Rating */}
              <div className="flex justify-center items-center space-x-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 transition-colors duration-300 ${
                      source === "TripAdvisor"
                        ? "fill-green-500 text-green-500"
                        : "fill-blue-500 text-blue-500"
                    }`}
                  />
                ))}
              </div>

              {/* Rating Value */}
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {inView && <CountUp end={rating} decimals={1} duration={2} />}
              </div>

              {/* Source */}
              <div className="text-lg font-semibold text-gray-700">
                {source}
              </div>

              {/* Review Count */}
              <div className="text-sm text-gray-500">
                {inView && <CountUp end={reviews} />}+ {t("homestats.review")}
              </div>
            </>
          ) : (
            <>
              {/* Count Value */}
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {inView && (
                  <CountUp
                    end={count}
                    duration={2}
                    suffix={count >= 1000 ? "+" : ""}
                  />
                )}
              </div>

              {/* Label */}
              <div className="text-lg font-semibold text-gray-700">{label}</div>

              {/* Sub Label */}
              <div className="text-sm text-gray-500">{subLabel}</div>
            </>
          )}
        </div>

        {/* Subtle decoration */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-white to-gray-200 rounded-full opacity-50"></div>
      </div>
    </div>
  );
}

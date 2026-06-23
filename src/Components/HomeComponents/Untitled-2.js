import React from "react";

const testimonials = [
  {
    id: 1,
    text: "The warmth and hospitality at Sherpa Soul Stay Inn made our trip unforgettable. From the moment we arrived, we felt like family. The traditional welcome ceremony with khada scarves was deeply moving.",
    name: "Emily Dawson",
    title: "Travel Blogger, UK",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    text: "A peaceful retreat nestled in the hills with breathtaking views of the Himalayas. Perfect for relaxation and cultural immersion. The meditation sessions at sunrise were transformative.",
    name: "Takeshi Mori",
    title: "Photographer, Japan",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    text: "I loved the cozy rooms with traditional Nepali decor and modern amenities. The food was phenomenal - authentic dal bhat and momos were the highlights. The staff were incredibly attentive and kind.",
    name: "Sarah Jennings",
    title: "Writer, Australia",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 4,
    text: "Sherpa Soul Stay Inn felt like a home away from home. A truly soulful experience where ancient traditions meet modern comfort. The evening cultural performances were mesmerizing.",
    name: "Carlos Rivera",
    title: "Backpacker, Peru",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 5,
    text: "I can't wait to return next season. The mountain view from my balcony was breathtaking! Watching the sunrise paint the peaks golden while sipping traditional butter tea was magical.",
    name: "Lina Mehta",
    title: "Travel Filmmaker, India",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 6,
    text: "From welcome tea ceremony to check-out blessing, every moment was thoughtfully curated. The attention to detail and genuine care for guests' well-being exceeded all expectations.",
    name: "Thomas Lee",
    title: "Hotel Critic, South Korea",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1588776814546-ec207d81b6f3?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 7,
    text: "They went above and beyond to accommodate my dietary needs and allergies. The organic garden-to-table experience was incredible. A+ service with genuine Sherpa hospitality!",
    name: "Juliette Morin",
    title: "Chef & Traveler, France",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1557053910-d9eadeed1c58?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 8,
    text: "Every corner of the inn tells a story of Sherpa heritage. Beautifully designed with sustainable materials and heartfelt service. The architecture perfectly blends tradition with luxury.",
    name: "George Franklin",
    title: "Architect, USA",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1573497491208-6b1acb260507?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 9,
    text: "The trek guidance and local insights provided by the inn's team were invaluable. They helped us discover hidden gems and sacred sites that typical tourists never see.",
    name: "Anna Schmidt",
    title: "Adventure Guide, Germany",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 10,
    text: "The spa treatments using traditional Himalayan herbs were rejuvenating. The hot stone massage after a long day of trekking was pure bliss. Highly recommend the wellness packages!",
    name: "Maria Gonzalez",
    title: "Wellness Coach, Spain",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 11,
    text: "As a solo female traveler, I felt completely safe and welcomed. The community atmosphere among guests and the family-like treatment from staff made my stay extraordinary.",
    name: "Priya Sharma",
    title: "Solo Traveler, Canada",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 12,
    text: "The sustainable tourism practices and support for local communities impressed me greatly. This inn truly embodies responsible travel while providing luxury comfort.",
    name: "David Chen",
    title: "Environmental Scientist, Singapore",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

const StarRating = ({ rating }) => {
  return (
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < rating ? "text-amber-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
};

const InfiniteCarousel = () => {
  return (
    <>
      <section className="bg-gradient-to-br from-stone-50 to-amber-50/30 py-24 overflow-hidden relative">
        {/* Background decoration */}
        <div
          className="absolute inset-0 opacity-40 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.03'%3E%3Cpath d='M30 30c0-11.046 8.954-20 20-20s20 8.954 20 20-8.954 20-20 20-20-8.954-20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
          }}
        ></div>

        <div className="relative">
          {/* Header Section */}
          <div className="text-center mb-16 px-6 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-light text-gray-900 tracking-tight">
              Stories from the
              <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent font-light">
                Clients
              </span>
            </h2>

            <p className="text-gray-600 text-xl leading-relaxed max-w-3xl mx-auto">
              Real experiences from travelers who discovered their soul at
              Sherpa Soul Stay Inn. Each story reflects our commitment to
              authentic Sherpa hospitality and unforgettable mountain
              adventures.
            </p>
          </div>

          {/* Fixed Width Scrolling Container */}
          <div className="relative w-full overflow-hidden pb-6">
            <div className="animate-scroll flex w-max">
              {[...testimonials, ...testimonials].map((testimonial, i) => (
                <div
                  key={i}
                  className="w-[420px] mx-4 bg-white/80 backdrop-blur-sm border border-white/50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 flex-shrink-0 group hover:-translate-y-2"
                >
                  <StarRating rating={testimonial.rating} />

                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-8 font-light">
                    "{testimonial.text}"
                  </blockquote>

                  <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                    <div className="relative">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-14 h-14 rounded-full object-cover ring-4 ring-amber-100 group-hover:ring-amber-200 transition-all duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                        <svg
                          className="w-2.5 h-2.5 text-white"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-lg">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 px-6">
            <p className="text-gray-600 text-lg mb-6">
              Ready to create your own unforgettable story?
            </p>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Book Your Stay
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </div>
        </div>

        <style>{`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(calc(-420px * ${testimonials.length} - ${
          testimonials.length * 32
        }px));
            }
          }

          .animate-scroll {
            animation: scroll 60s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </>
  );
};

export default InfiniteCarousel;

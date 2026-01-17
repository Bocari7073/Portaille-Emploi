import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { testimonials } from "../assets/assets";

const Testimonials = () => {
  return (
    <section className="mt-28 mb-28 bg-blue-50 py-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          Témoignages de nos clients
        </h2>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto">
          Découvrez les témoignages de ceux qui ont réussi grâce à notre plateforme.
        </p>
      </div>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          bulletClass:
            "swiper-pagination-bullet !bg-gray-300 !opacity-100 !w-2.5 !h-2.5 !mx-1.5",
          bulletActiveClass: "!bg-blue-600 !w-3 !h-3",
          renderBullet: (index, className) => {
            return `<span class="${className}" role="button" aria-label="Go to testimonial ${
              index + 1
            }"></span>`;
          },
        }}
        breakpoints={{
          640: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
        className="!pb-12"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-xl h-full flex flex-col border border-gray-200 shadow hover:shadow-lg transition-all duration-300">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                {testimonial.title}
              </h3>
              <blockquote className="text-gray-600 mb-6 flex-grow text-sm md:text-base">
                {testimonial.description}
              </blockquote>
              <div className="flex items-center mt-auto gap-4">
                <img
                  src={testimonial.image}
                  alt={`${testimonial.name}, ${testimonial.position}`}
                  className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150?text=User";
                    e.target.alt = "Default user placeholder";
                  }}
                />
                <div>
                  <h4 className="font-semibold text-gray-900 text-base md:text-lg">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-500 text-xs md:text-sm">
                    {testimonial.position}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;

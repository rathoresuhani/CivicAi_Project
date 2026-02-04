import { Link } from "react-router-dom";
import drainage from "../assets/drainage.jpg";
import garbage2 from "../assets/garbage2.jpg";
import leakage from "../assets/leakage.jpg";
import light from "../assets/light.jpg";

const Home = () => {
  return (
    <div className="w-full bg-gray-50 min-h-screen">
      
      <section className="max-w-6xl mx-auto px-4 py-14">
        <h1 className="text-3xl md:text-4xl font-bold text-black leading-snug">
          CivicAI – Smart Civic Complaint Management Portal
        </h1>

        <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
          Raise municipal complaints easily and track their resolution using your
          Complaint ID or Email in a fast and transparent way.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 items-center">
          <Link
            to="/user/raise"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-900 transition transform hover:scale-105 text-center"
          >
            Raise Complaint
          </Link>

          <Link
            to="/user/track"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-900 transition transform hover:scale-105 text-center"
          >
            Track Complaint
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-black">Core Features</h2>

        <p className="text-sm text-gray-600 mt-2">
          A formal, organized and transparent system for complaint handling.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg">Raise Complaint</h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Submit complaints quickly using basic details. Additional fields can be auto-detected later for easier processing.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg">Track Complaint</h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Track complaint status and updates anytime using your Complaint ID or registered Email.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition">
            <h3 className="font-semibold text-black text-lg">Admin Dashboard</h3>
            <p className="text-sm text-gray-600 mt-3 leading-relaxed">
              Admin can filter complaints by status or priority and update complaint status efficiently.
            </p>

            <Link
              to="/admin/login"
              className="inline-block mt-4 text-sm font-semibold text-black underline hover:text-gray-700 transition"
            >
              Go to Admin Panel →
            </Link>
          </div>

        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <h2 className="text-2xl font-bold text-black">
          Common Municipal Issues
        </h2>

        <p className="text-sm text-gray-600 mt-2">
          Select a category to quickly understand common problems reported by citizens.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            { title: "Garbage", img: garbage2 },
            { title: "Water Supply", img: leakage },
            { title: "Street Lights", img: light },
            { title: "Drainage", img: drainage }
          ].map((item) => (
            <div
              key={item.title}
              className="relative h-40 md:h-44 rounded-xl overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 shadow-sm hover:shadow-lg"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover"
              />

              <div className="absolute inset-0 bg-black bg-opacity-40 hover:bg-opacity-30 transition"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-base md:text-lg font-bold tracking-wide">
                  {item.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-6 border-t bg-white">
      </footer>

    </div>
  );
};

export default Home;
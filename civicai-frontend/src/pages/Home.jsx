import { Link } from "react-router-dom";

const Home = ()  => {
  return (
    <div className="w-full">
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-semibold text-black leading-tight">
          CivicAi - Smart Civic Complaint Management Portal
        </h1>
        <p className="mt-4 text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
          Raise municipal complaints easily and track their resolution using your
          Complaint ID or Email.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link
            to="/user/raise"
            className="px-6 py-3 rounded-lg bg-black text-white font-semibold text-sm hover:bg-gray-900 transition text-center"
          >
            Raise Complaint
          </Link>
          <Link to="/user/track"
            className="px-6 py-3 rounded-lg border border-gray-300 text-black font-semibold text-sm hover:bg-gray-100 transition text-center">
          Track Complaint
          </Link>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-xl font-semibold text-black">Features</h2>
        <p className="text-sm text-gray-600 mt-1">
          A formal and transparent system for complaint handling.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black">Raise Complaint</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Submit complaint quickly using your basic details. Optional fields
              can be auto-detected later.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black">Track Complaint</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Track complaint status and updates using your Complaint ID or Email
              anytime.
            </p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <h3 className="font-semibold text-black">Admin Dashboard</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">
              Admin can filter active complaints by status/priority and update
              complaint status & priority.
            </p>
            <Link
              to="/admin/login"
              className="inline-block mt-4 text-sm font-semibold text-black underline hover:text-gray-700"
            >
              Go to Admin Panel
            </Link>
          </div>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-xl font-semibold text-black">
          Common Municipal Issues
        </h2>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {["Garbage", "Water Supply", "Street Lights", "Drainage"].map(
            (item) => (
              <div
                key={item}
                className="h-28 md:h-32 rounded-xl border border-gray-200 bg-gray-50 flex items-center justify-center text-sm font-semibold text-gray-700"
              >
                {item}
              </div>
            )
          )}
        </div>
      </section>
    </div>
  )
};

export default Home;
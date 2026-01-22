import {useState} from 'react';

const ComplaintForm = ({onSubmit,loading=false}) => {
  const [FormData, setFormData] = useState({
    name:'',
    email:'',
    phone:'',
    category:'',
    location:'',
    description:''
  });

  const [errors, Seterrors] = useState({});

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name]:value}));
    Seterrors((prev) => ({...prev, [name]:''}));
  };

  const validate = () => {
    const newErrors = {};
    if(!FormData.name) newErrors.name = 'Name is required';
    if(!FormData.email) newErrors.email = 'Email is required';
    if(!FormData.phone) newErrors.phone = 'Phone number is required';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (FormData.email && !emailRegex.test(FormData.email)) {
      newErrors.email = "Enter a valid email";
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (FormData.phone && !phoneRegex.test(FormData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    Seterrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validate()) return;
    if(onSubmit) onSubmit(FormData);
  };
  return (
    <div className="w-full bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-black">Raise a Complaint</h2>
      <p className="text-sm text-gray-600 mt-1">Only Basic details are required, others will be auto-detected</p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={FormData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.name && (
              <p className="text-xs text-red-600 mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={FormData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
            {errors.email && (
              <p className="text-xs text-red-600 mt-1">{errors.email}</p>
            )}
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700">
            Phone Number<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {errors.phone && (
            <p className="text-xs text-red-600 mt-1">{errors.phone}</p>
          )}
        </div>
         <div className="pt-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900">
            Optional Details (Auto-detected later)
          </h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Complaint Category
                <span className="text-xs text-gray-500"> (optional)</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">Select category</option>
                <option value="garbage">Garbage / Waste</option>
                <option value="street_light">Street Light</option>
                <option value="water_supply">Water Supply</option>
                <option value="road_damage">Road Damage</option>
                <option value="drainage">Drainage / Sewer</option>
                <option value="other">Other</option>
              </select>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
                Location
                <span className="text-xs text-gray-500"> (optional)</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Area, city, landmark..."
                className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
          </div>
          </div>
          <div className="mt-5">
            <label className="text-sm font-medium text-gray-700">
              Description
              <span className="text-xs text-gray-500"> (optional)</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue (optional)"
              rows={4}
              className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          </div>
          <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-black text-white hover:bg-gray-900"
          }`}
        >
          {loading ? 'Submitting...':'Submit Complaint'}
        </button>
      </form>
    </div>
      )
    };

export default ComplaintForm;
      
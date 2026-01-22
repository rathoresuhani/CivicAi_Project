import { useState } from "react";
import ComplaintForm from "../components/complaint/ComplaintForm";
import ComplaintList from "../components/complaint/ComplaintList";

const ComponentPreview = () => {
  const [loading, setLoading] = useState(false);

  const dummyComplaints = [
    {
      complaint_id: "CIVIC-12345",
      name: "Suhani Rathore",
      email: "suhani@gmail.com",
      phone: "9876543210",
      status: "pending",
      priority: "high",
      category: "water_supply",
      location: "Sector 62, Noida",
      description: "Water supply is interrupted from last 3 days.",
      created_at: new Date().toISOString(),
    },
    {
      complaint_id: "CIVIC-67890",
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "9998887776",
      status: "in_progress",
      priority: "medium",
      category: "street_light",
      location: "Near main market",
      description: "Street lights are not working at night.",
      created_at: new Date().toISOString(),
    },
  ];

  const handleSubmit = (data) => {
    console.log("FORM DATA:", data);
    alert("Form submitted! Check console.");
    setLoading(true);

    // fake loading preview
    setTimeout(() => setLoading(false), 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      <ComplaintForm onSubmit={handleSubmit} loading={loading} />

      <ComplaintList
        title="Preview Complaint List"
        complaints={dummyComplaints}
        loading={false}
        emptyText="No complaints to show."
        onCardClick={(c) => alert(`Clicked: ${c.complaint_id}`)}
      />
    </div>
  );
};

export default ComponentPreview;

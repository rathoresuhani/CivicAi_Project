import ComplaintCard from "./ComplaintCard";
import Loader from "../common/Loader";

const ComplaintList = ({
  complaints = [],
  loading = false,
  title = "Complaints",
  emptyText = "No complaints found.",
  onCardClick,
}) => {
  if(loading){
    return <Loader text="Loading complaints..." />;
  }
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-black">{title}</h2>
        <p className="text-sm text-gray-500">
          Total: <span className="font-semibold">{complaints.length}</span>
        </p>
      </div>
      {complaints.length === 0 ? (
        <div className="w-full border border-gray-200 bg-white rounded-xl p-8 text-center text-gray-600">
          <p className="text-sm">{emptyText}</p>
        </div>
      ) : (
        <div className="space-y-5">
          {complaints.map((complaint, index) => (
            <ComplaintCard
              key={complaint.complaint_id || complaint._id || index}
              complaint={complaint}
              onClick={onCardClick}
            />
          ))}
        </div>
      )}
    </div>
  )
};

export default ComplaintList;

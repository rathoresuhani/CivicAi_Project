import {useState} from 'react';
import ComplaintList from '../components/complaint/ComplaintList';
import Loader from '../components/common/Loader';

const MyComplaints = () => {
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [complaints, setComplaints] = useState([]);
  const [error, setError] = useState("");

  const handleFetch = async (e) => {
    e.preventDefault();

    if(!email.trim()){
      setError("Please enter a Email");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      setError("Please enter a valid Email");
      return;
    }
    setError("");
    setComplaints([]);
    setLoading(true);
    setTimeout(() => {
    setLoading(false);
    if (email.toLowerCase().includes("wrong")) {
      setComplaints([]);
      return;
      }
      setComplaints([
        {
          complaint_id: "CIVIC-10101",
          name: "Suhani Rathore",
          email: email,
          phone: "9876543210",
          status: "pending",
          priority: "high",
          created_at: new Date().toISOString(),
        },
      ]);
    })
  }
}
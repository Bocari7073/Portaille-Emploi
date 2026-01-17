import React from "react";
import moment from "moment";
import kConverter from "k-convert";
import { assets } from "../assets/assets";
import { MapPin, Clock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      key={job._id}
      onClick={() => {
        navigate(`/apply-job/${job._id}`);
        window.scrollTo(0, 0);
      }}
      className="flex gap-5 p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg hover:border-blue-300 transition-all duration-300 cursor-pointer bg-white"
    >
      {/* Logo */}
      <img
        className="w-16 h-16 md:w-20 md:h-20 object-contain rounded-lg"
        src={job.companyId?.image || assets.company_icon}
        alt={`${job.companyId?.name || "Company"} Logo`}
      />

      {/* Job Info */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-2xl text-gray-800 font-bold mb-2">
          {job.title}
        </h1>

        <div className="flex flex-wrap items-center gap-5 text-gray-600 mt-3 text-sm md:text-base">
          <div className="flex items-center gap-2">
            <img src={assets.suitcase_icon} alt="Company" className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-medium">{job.companyId?.name || "Unknown Company"}</span>
          </div>
          <div className="flex items-center gap-2">
            <User size={20} className="text-blue-600" />
            <span className="font-medium">{job.level}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={20} className="text-blue-600" />
            <span className="font-medium">{job.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock size={20} className="text-blue-600" />
            <span className="font-medium">{moment(job.date).fromNow()}</span>
          </div>
          <div className="flex items-center gap-2">
            <img src={assets.money_icon} alt="Salary" className="w-5 h-5 md:w-6 md:h-6" />
            <span className="font-medium">
              CTC: {job.salary ? kConverter.convertTo(job.salary) : "Not disclosed"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;

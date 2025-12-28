import { format } from 'date-fns';
import { Building2, MapPin, DollarSign, Calendar, ExternalLink, Edit, Trash2, FileText } from 'lucide-react';
import { getStatusColor } from '../../utils/constants';

export default function ApplicationCard({ application, onEdit, onDelete }) {
  const {
    company_name,
    position,
    status,
    location,
    salary_range,
    job_url,
    notes,
    applied_date,
    deadline,
  } = application;

  const formattedDate = format(new Date(applied_date), 'MMM dd, yyyy');
  const formattedDeadline = deadline ? format(new Date(deadline), 'MMM dd, yyyy') : null;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{company_name}</h3>
              <p className="text-gray-600 mt-1">{position}</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(status)}`}>
          {status}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {/* Applied Date */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span>Applied: {formattedDate}</span>
        </div>

        {/* Deadline */}
        {formattedDeadline && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4 text-red-400" />
            <span>Deadline: {formattedDeadline}</span>
          </div>
        )}

        {/* Location */}
        {location && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span>{location}</span>
          </div>
        )}

        {/* Salary Range */}
        {salary_range && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <DollarSign className="w-4 h-4 text-gray-400" />
            <span>{salary_range}</span>
          </div>
        )}
      </div>

      {/* Notes */}
      {notes && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
            <p className="text-sm text-gray-700 line-clamp-2">{notes}</p>
          </div>
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-4 border-t">
        {/* Job URL */}
        {job_url ? (
          <a
            href={job_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            <ExternalLink className="w-4 h-4" />
            View Job Posting
          </a>
        ) : (
          <div></div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
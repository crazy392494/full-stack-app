import React, { useRef } from 'react';
import { Issue, IssueStatus, LocationType } from '../types';

interface IssueCardProps {
    issue: Issue;
    userRole?: 'user' | 'employee';
    onStatusChange?: (issueId: string, status: IssueStatus, repairedImageUrl?: string) => void;
}

const IssueCard: React.FC<IssueCardProps> = ({ issue, userRole = 'user', onStatusChange }) => {
    const { id, title, description, location, locationType, imageUrl, repairedImageUrl, status, createdAt } = issue;
    const repairImageInputRef = useRef<HTMLInputElement>(null);

    const getStatusColor = (status: IssueStatus) => {
        switch (status) {
            case IssueStatus.PENDING: return 'bg-yellow-100 text-yellow-800';
            case IssueStatus.IN_PROGRESS: return 'bg-blue-100 text-blue-800';
            case IssueStatus.RESOLVED: return 'bg-green-100 text-green-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    const getResolutionTime = (locationType: LocationType, status: IssueStatus) => {
        if (status === IssueStatus.RESOLVED) return 'Resolved';
        return locationType === LocationType.URBAN ? 'Est. 2 days' : 'Est. 2-4 hours';
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (!onStatusChange) return;

        const newStatus = e.target.value as IssueStatus;
        if (newStatus === IssueStatus.RESOLVED) {
            repairImageInputRef.current?.click();
        } else {
            onStatusChange(id, newStatus);
        }
    };

    const handleRepairImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onStatusChange) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const dataUrl = reader.result as string;
                onStatusChange(id, IssueStatus.RESOLVED, dataUrl);
            };
            reader.readAsDataURL(file);
        } else {
            // If user cancels file picker, revert the dropdown
            const selectElement = document.getElementById(`status-${id}`) as HTMLSelectElement;
            if (selectElement) {
                selectElement.value = status;
            }
        }
        // Clear the file input value so onChange fires again for the same file
        if (e.target) {
            e.target.value = '';
        }
    };


    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 flex flex-col">
            {status === IssueStatus.RESOLVED && repairedImageUrl ? (
                <div className="grid grid-cols-2">
                    <div className="relative">
                        {imageUrl ? <img src={imageUrl} alt={title + " (Before)"} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-slate-200 flex items-center justify-center"><span className="text-slate-500">No Before Image</span></div>}
                        <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-xs font-bold px-2 py-1">BEFORE</div>
                    </div>
                    <div className="relative">
                        <img src={repairedImageUrl} alt={title + " (After)"} className="w-full h-48 object-cover" />
                         <div className="absolute bottom-0 left-0 bg-green-600 bg-opacity-80 text-white text-xs font-bold px-2 py-1">AFTER</div>
                    </div>
                </div>
            ) : (
                 imageUrl ? (
                    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
                ) : (
                    <div className="w-full h-48 bg-slate-200 flex items-center justify-center text-slate-500">
                        No Image Provided
                    </div>
                )
            )}
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-2">
                    <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${getStatusColor(status)}`}>
                        {status}
                    </span>
                    <span className="text-xs text-slate-500">{new Date(createdAt).toLocaleDateString()}</span>
                </div>
                <h3 className="text-lg font-bold mb-1">{title}</h3>
                <p className="text-sm text-slate-600 mb-3 flex-grow">{description}</p>
                <div className="text-xs text-slate-500 space-y-1 mt-auto">
                    <p><strong>Location:</strong> {location} ({locationType})</p>
                    <p><strong>Category:</strong> {issue.category}</p>
                    <p><strong>Resolution Time:</strong> {getResolutionTime(locationType, status)}</p>
                </div>

                {userRole === 'employee' && onStatusChange && (
                    <div className="mt-4">
                        <label htmlFor={`status-${id}`} className="block text-sm font-medium text-gray-700">Update Status</label>
                        <select
                            id={`status-${id}`}
                            value={status}
                            onChange={handleSelectChange}
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        >
                            {Object.values(IssueStatus).map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                         <input 
                            type="file" 
                            ref={repairImageInputRef} 
                            onChange={handleRepairImageUpload}
                            className="hidden" 
                            accept="image/*" 
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default IssueCard;
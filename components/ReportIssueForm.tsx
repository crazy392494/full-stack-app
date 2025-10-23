

import React, { useState, useRef } from 'react';
import { Issue, LocationType } from '../types';
import { categorizeIssueWithImage } from '../services/geminiService';
import { ISSUE_CATEGORIES } from '../constants';

interface ReportIssueFormProps {
    onSubmit: (issue: Omit<Issue, 'id' | 'reportedById' | 'createdAt' | 'status'>) => void;
}

const ReportIssueForm: React.FC<ReportIssueFormProps> = ({ onSubmit }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [locationType, setLocationType] = useState<LocationType>(LocationType.URBAN);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageBase64, setImageBase64] = useState<string>('');
    // FIX: Initialize with the first key from the ISSUE_CATEGORIES object.
    const [category, setCategory] = useState(Object.keys(ISSUE_CATEGORIES)[0]);
    const [isCategorizing, setIsCategorizing] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = (reader.result as string).split(',')[1];
                setImagePreview(reader.result as string);
                setImageBase64(base64String);
                suggestCategory(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const suggestCategory = async (base64Data: string) => {
        setIsCategorizing(true);
        try {
            const suggestedCategory = await categorizeIssueWithImage(base64Data);
            setCategory(suggestedCategory);
        } catch (error) {
            console.error('Failed to suggest category:', error);
            // Fallback to a default category on error
            setCategory('General Maintenance');
        } finally {
            setIsCategorizing(false);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !description || !location || !imagePreview) {
            alert('Please fill out all fields and upload an image.');
            return;
        }
        onSubmit({
            title,
            description,
            location,
            locationType,
            imageUrl: imagePreview,
            category
        });
        // Reset form
        setTitle('');
        setDescription('');
        setLocation('');
        setLocationType(LocationType.URBAN);
        setImagePreview(null);
        setImageBase64('');
        // FIX: Reset with the first key from the ISSUE_CATEGORIES object.
        setCategory(Object.keys(ISSUE_CATEGORIES)[0]);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Report a New Issue</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Issue Title</label>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} required rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"></textarea>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Location</label>
                    <input type="text" value={location} onChange={e => setLocation(e.target.value)} required placeholder="e.g., Corner of Main St & Park Ave" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Location Type</label>
                    <select value={locationType} onChange={e => setLocationType(e.target.value as LocationType)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                        <option value={LocationType.URBAN}>Urban</option>
                        <option value={LocationType.RURAL}>Rural</option>
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Photo of the Issue</label>
                    <div className="mt-1 flex items-center space-x-4">
                        <input type="file" accept="image/*" onChange={handleImageChange} ref={fileInputRef} className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100" required />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="h-16 w-16 rounded-md object-cover" />}
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Category (AI Suggested)</label>
                    {isCategorizing ? (
                        <div className="mt-1 flex items-center">
                             <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-sky-600"></div>
                             <span className="ml-2 text-slate-500">Analyzing image...</span>
                        </div>
                    ) : (
                        <select value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-sky-500 focus:ring-sky-500">
                           {/* FIX: Use Object.keys() to iterate over the categories for the select options. */}
                           {Object.keys(ISSUE_CATEGORIES).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                    )}
                </div>
                <button type="submit" className="w-full bg-sky-600 text-white py-3 px-4 rounded-md hover:bg-sky-700 transition duration-200 font-semibold">Submit Report</button>
            </form>
        </div>
    );
};

export default ReportIssueForm;
"use client";

import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";
import {
  Building2,
  Globe,
  Mail,
  Phone,
  MapPin,
  Pencil,
  Camera,
  Save,
  X,
} from "lucide-react";
import { CompanyProfile, initialData } from "@/types/JobApplication";
import FieldRow from "@/components/Employer/Profile/FieldRow";
import Image from "next/image";

const EmployerProfilePage = () => {
  const [profile, setProfile] = useState<CompanyProfile>(initialData);
  const [draft, setDraft] = useState<CompanyProfile>(initialData);
  const [editing, setEditing] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDraft((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setLogoPreview(objectUrl);
  };

  const handleSave = () => {
    // API call here
    setProfile({ ...draft });
    setEditing(false);
    setLogoPreview(null);
    console.log("Saving profile:", draft);
  };

  const handleCancel = () => {
    setDraft({ ...profile });
    setEditing(false);
    setLogoPreview(null);
  };

  const logoSrc = logoPreview ?? profile.logo?.url ?? null;
  const initials = profile.company_name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        headerTitle="Company Profile"
        subHeaderTitle="Manage your company information"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col items-center text-center gap-4">
            <div className="relative group">
              <div className="w-28 h-28 rounded-2xl overflow-hidden bg-gray-100 border-2 border-gray-200 flex items-center justify-center">
                {logoSrc ? (
                  <Image
                    src={logoSrc}
                    alt="Company logo"
                    className="w-full h-full object-cover"
                    width={50}
                    height={50}
                    unoptimized
                  />
                ) : (
                  <span className="text-3xl font-bold text-gray-400">
                    {initials}
                  </span>
                )}
              </div>
              {editing && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 rounded-2xl bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                >
                  <Camera className="w-6 h-6 text-white" />
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogoChange}
              />
            </div>

            {/* Company name & location */}
            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {profile.company_name}
              </h2>
              <p className="text-sm text-gray-400 flex items-center justify-center gap-1 mt-1">
                <MapPin className="w-3.5 h-3.5" />
                {profile.location || "No location set"}
              </p>
            </div>

            {editing && (
              <p className="text-xs text-gray-400">
                Hover over the logo to change it
              </p>
            )}
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Company Details
                </h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  {editing
                    ? "Make changes and click Save when done."
                    : "Click Edit to update your company information."}
                </p>
              </div>

              {!editing ? (
                <Button
                  onClick={() => setEditing(true)}
                  variant="outline"
                  size="sm"
                  className="gap-1.5 text-sm"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleCancel}
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-sm"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    size="sm"
                    className="gap-1.5 text-sm bg-violet-600 hover:bg-violet-700 text-white"
                  >
                    <Save className="w-3.5 h-3.5" />
                    Save Changes
                  </Button>
                </div>
              )}
            </div>

            {/* Fields */}
            <div className="px-6 pb-2">
              <FieldRow
                icon={<Building2 className="w-4 h-4" />}
                label="Company Name"
                name="company_name"
                value={editing ? draft.company_name : profile.company_name}
                editing={editing}
                onChange={handleChange}
              />
              <FieldRow
                icon={<Pencil className="w-4 h-4" />}
                label="About"
                name="company_description"
                value={
                  editing
                    ? draft.company_description
                    : profile.company_description
                }
                editing={editing}
                onChange={handleChange}
                multiline
              />
              <FieldRow
                icon={<Globe className="w-4 h-4" />}
                label="Website"
                name="website"
                value={editing ? draft.website : profile.website}
                editing={editing}
                onChange={handleChange}
                type="url"
              />
              <FieldRow
                icon={<Mail className="w-4 h-4" />}
                label="Contact Email"
                name="contact_email"
                value={editing ? draft.contact_email : profile.contact_email}
                editing={editing}
                onChange={handleChange}
                type="email"
              />
              <FieldRow
                icon={<Phone className="w-4 h-4" />}
                label="Contact Phone"
                name="contact_phone"
                value={editing ? draft.contact_phone : profile.contact_phone}
                editing={editing}
                onChange={handleChange}
                type="tel"
              />
              <FieldRow
                icon={<MapPin className="w-4 h-4" />}
                label="Location"
                name="location"
                value={editing ? draft.location : profile.location}
                editing={editing}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerProfilePage;

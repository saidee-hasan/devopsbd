"use client";
/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState, useCallback } from "react";
import NextImage from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { Image as ImageIcon, Save, CheckCircle2, UploadCloud, Trash2 } from "lucide-react";
import { API_URL } from "@/lib/api";

export interface SiteMediaData {
  aboutImages: string[];
  benefitsImages: string[];
  whyChooseUsImage: string;
}

const defaultMedia: SiteMediaData = {
  aboutImages: ["/images/unsplash/about_1.jpg", "/images/unsplash/about_2.jpg", "/images/unsplash/about_3.jpg", "/images/unsplash/about_4.jpg"],
  benefitsImages: ["/images/unsplash/benefits_1.jpg", "/images/unsplash/benefits_2.jpg"],
  whyChooseUsImage: "/images/unsplash/why_choose_us.jpg",
};

export default function AdminMediaPage() {
  const [data, setData] = useState<SiteMediaData>(defaultMedia);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingAbout, setUploadingAbout] = useState(false);
  const [uploadingBenefits, setUploadingBenefits] = useState(false);
  const [uploadingWhy, setUploadingWhy] = useState(false);

  const API = API_URL;
  const getToken = () => localStorage.getItem("admin_token");

  const loadMedia = useCallback(async () => {
    try {
      const res = await fetch(`${API}/api/media`);
      const resData = await res.json();
      if (resData && Object.keys(resData).length > 0) {
        setData({
          aboutImages: resData.aboutImages?.length ? resData.aboutImages : defaultMedia.aboutImages,
          benefitsImages: resData.benefitsImages?.length ? resData.benefitsImages : defaultMedia.benefitsImages,
          whyChooseUsImage: resData.whyChooseUsImage || defaultMedia.whyChooseUsImage,
        });
      } else {
        setData(defaultMedia);
      }
    } catch (e) {
      console.error(e);
      setData(defaultMedia);
    } finally {
      setLoading(false);
    }
  }, [API]);

  useEffect(() => {
    loadMedia();
  }, [loadMedia]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = getToken();
      await fetch(`${API}/api/media`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(data)
      });
      toast.success("Site Media settings updated successfully!");
    } catch (err) {
      toast.error("Failed to save media settings.");
    }
    setSaving(false);
  };

  const uploadFile = async (file: File, folder: string) => {
    const token = getToken();
    if (!token) return null;
    const fd = new FormData();
    fd.append("image", file);
    try {
      const res = await fetch(`${API}/api/upload/cloudinary?folder=${folder}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.url;
    } catch {
      return null;
    }
  };

  const handleUploadAbout = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAbout(true);
    const url = await uploadFile(file, "about");
    if (url) {
      const newImages = [...data.aboutImages];
      newImages[index] = url;
      setData({ ...data, aboutImages: newImages });
      toast.success("About image uploaded!");
    } else {
      toast.error("Upload failed");
    }
    setUploadingAbout(false);
    e.target.value = "";
  };

  const handleUploadBenefit = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingBenefits(true);
    const url = await uploadFile(file, "benefits");
    if (url) {
      const newImages = [...data.benefitsImages];
      newImages[index] = url;
      setData({ ...data, benefitsImages: newImages });
      toast.success("Benefit image uploaded!");
    } else {
      toast.error("Upload failed");
    }
    setUploadingBenefits(false);
    e.target.value = "";
  };

  const handleUploadWhy = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingWhy(true);
    const url = await uploadFile(file, "why");
    if (url) {
      setData({ ...data, whyChooseUsImage: url });
      toast.success("Why Choose Us image uploaded!");
    } else {
      toast.error("Upload failed");
    }
    setUploadingWhy(false);
    e.target.value = "";
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <ImageIcon className="h-6 w-6 text-emerald-400" />
            Frontend Media & Image Gallery Manager
          </h1>
          <p className="mt-1 text-base text-zinc-400">
            Upload and manage the primary images displayed on the frontend About, Benefits, and Why Choose Us sections.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Section: About Images (4 Images) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            About Section Images (Grid of 4)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.aboutImages.map((img, idx) => (
              <div key={`about-${idx}`} className="space-y-2">
                <label className="block text-sm font-mono font-bold text-zinc-400">Image {idx + 1}</label>
                <div className="relative h-32 w-full rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center group">
                  {img ? (
                    <>
                      <NextImage src={img} alt={`About ${idx + 1}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                         <label className="cursor-pointer px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg">
                           <UploadCloud className="h-3 w-3" /> Change Image
                           <input type="file" className="hidden" accept="image/*" disabled={uploadingAbout} onChange={(e) => handleUploadAbout(e, idx)} />
                         </label>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer text-sm text-zinc-500 hover:text-emerald-400 flex flex-col items-center">
                      <UploadCloud className="h-6 w-6 mb-1" />
                      {uploadingAbout ? "Uploading..." : "Upload"}
                      <input type="file" className="hidden" accept="image/*" disabled={uploadingAbout} onChange={(e) => handleUploadAbout(e, idx)} />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Benefits Images (2 Images) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Key Benefits Images (2 Images)
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.benefitsImages.map((img, idx) => (
              <div key={`benefit-${idx}`} className="space-y-2">
                <label className="block text-sm font-mono font-bold text-zinc-400">Benefit Image {idx + 1}</label>
                <div className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center group">
                  {img ? (
                    <>
                      <NextImage src={img} alt={`Benefit ${idx + 1}`} fill className="object-cover" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                         <label className="cursor-pointer px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg">
                           <UploadCloud className="h-3 w-3" /> Change Image
                           <input type="file" className="hidden" accept="image/*" disabled={uploadingBenefits} onChange={(e) => handleUploadBenefit(e, idx)} />
                         </label>
                      </div>
                    </>
                  ) : (
                    <label className="cursor-pointer text-sm text-zinc-500 hover:text-emerald-400 flex flex-col items-center">
                      <UploadCloud className="h-6 w-6 mb-1" />
                      {uploadingBenefits ? "Uploading..." : "Upload"}
                      <input type="file" className="hidden" accept="image/*" disabled={uploadingBenefits} onChange={(e) => handleUploadBenefit(e, idx)} />
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Why Choose Us Image (1 Image) */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/90 p-6 sm:p-8 space-y-5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md">
          <h2 className="text-base font-bold text-white border-b border-zinc-800 pb-3 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            Why Choose Us Image
          </h2>
          <div className="space-y-2 max-w-sm">
            <label className="block text-sm font-mono font-bold text-zinc-400">Hero/Main Image</label>
            <div className="relative h-48 w-full rounded-xl overflow-hidden border border-zinc-700 bg-zinc-950 flex items-center justify-center group">
              {data.whyChooseUsImage ? (
                <>
                  <NextImage src={data.whyChooseUsImage} alt="Why Choose Us" fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
                     <label className="cursor-pointer px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1 shadow-lg">
                       <UploadCloud className="h-3 w-3" /> Change Image
                       <input type="file" className="hidden" accept="image/*" disabled={uploadingWhy} onChange={handleUploadWhy} />
                     </label>
                  </div>
                </>
              ) : (
                <label className="cursor-pointer text-sm text-zinc-500 hover:text-emerald-400 flex flex-col items-center">
                  <UploadCloud className="h-6 w-6 mb-1" />
                  {uploadingWhy ? "Uploading..." : "Upload"}
                  <input type="file" className="hidden" accept="image/*" disabled={uploadingWhy} onChange={handleUploadWhy} />
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base transition-all shadow-lg flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "Saving Settings..." : "Save Media Settings"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}

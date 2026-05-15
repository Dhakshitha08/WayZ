"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function ReportPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const position = await new Promise<GeolocationPosition>(
      (resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      }
    );

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude,longitude);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        alert("Please login first");
        return;
      }
      let imageUrl = "";

if (image) {
  const fileName = `${Date.now()}-${image.name}`;

  const { error: uploadError } = await supabase.storage
    .from("report-images")
    .upload(fileName, image);

  if (uploadError) {
    alert(uploadError.message);
    return;
  }

  const { data } = supabase.storage
    .from("report-images")
    .getPublicUrl(fileName);

  imageUrl = data.publicUrl;
}

      const { error } = await supabase.from("reports").insert([
        {
          title,
          description,
          category,
          image_url:imageUrl,
          status: "Active",
          latitude,
          longitude,
          user_id: user.id,
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }

      alert("Report submitted successfully!");

      router.push("/dashboard");

    } catch (error) {
      console.error(error);

      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110d] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
        
        <h1 className="text-4xl font-bold mb-2">
          Report an Issue
        </h1>

        <p className="text-gray-400 mb-8">
          Help improve your community by reporting problems.
        </p>

        <div className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Issue Title
            </label>

            <input
              type="text"
              placeholder="Example: Broken street light"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Description
            </label>

            <textarea
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
            >
              <option value="">Select category</option>
              <option value="Plumbing">Plumbing</option>
<option value="Electrical">Electrical</option>
<option value="Cleaning">Cleaning</option>
<option value="AC Repair">AC Repair</option>
<option value="Carpentry">Carpentry</option>
              <option value="Flooding">Flooding</option>
            </select>
          </div>
          <div>
  <label className="block mb-2 text-sm text-gray-300">
    Upload Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    }}
    className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4"
  />
</div>
          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-700 hover:opacity-90 transition rounded-2xl py-4 font-semibold text-lg"
          >
            {loading ? "Submitting..." : "Submit Report"}
          </button>

        </div>
      </div>
    </div>
  );
}
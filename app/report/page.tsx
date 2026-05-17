"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
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
  const [categories, setCategories] =useState<any[]>([]);
  const [errorMessage, setErrorMessage] =useState("");
  useEffect(() => {
  getCategories();
}, []);

const getCategories = async () => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  if (data) {
    setCategories(data);
  }

  if (error) {
    console.error(error);
  }
};
const [customCategory, setCustomCategory] =
  useState("");
  const handleSubmit = async () => {
  try {
    // validation
    if (!title.trim()) {
  setErrorMessage(
    "Issue title is required"
  );
  return;
}

if (!description.trim()) {
  setErrorMessage(
    "Description is required"
  );
  return;
}

if (!category) {
  setErrorMessage(
    "Please select a category"
  );
  return;
}

if (
  category === "Other" &&
  !customCategory.trim()
) {
  setErrorMessage(
    "Please enter custom category"
  );
  return;
}

    // custom category validation
    if (
      category === "Other" &&
      !customCategory
    ) {
      alert(
        "Please enter custom category"
      );

      return;
    }

    setLoading(true);

    // location
    const position =
      await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject
          );
        }
      );

    const latitude =
      position.coords.latitude;

    const longitude =
      position.coords.longitude;

    // user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      return;
    }

    // dynamic category
    let finalCategory = category;

    if (category === "Other") {
      finalCategory = customCategory;

      // insert new category
      const { data: existingCategory } =
  await supabase
    .from("categories")
    .select("*")
    .ilike("name", customCategory)
    .single();

if (!existingCategory) {
  await supabase
    .from("categories")
    .insert({
      name: customCategory,
    });
}
    }

    // image upload
    let imageUrl = "";

    if (image) {
      const fileName = `${Date.now()}-${image.name}`;

      const { error: uploadError } =
        await supabase.storage
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

    // save report
    const { data, error } = await supabase
  .from("reports")
  .insert([
    {
      title,
      description,
      category: finalCategory,
      image_url: imageUrl,
      status: "Active",
      latitude,
      longitude,
      user_id: user.id,
    },
  ])
  .select()
  .single();

    if (error) {
      alert(error.message);
      return;
    }
    localStorage.setItem(
  "latest_report",
  JSON.stringify(data)
);
    alert(
      "Report submitted successfully!"
    );

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
              Issue Title*
            </label>

            <input
              type="text"
              placeholder="Example: Broken street light"
              value={title}
              onChange={(e) =>{ setTitle(e.target.value);setErrorMessage("");}}

              className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Description*
            </label>

            <textarea
              placeholder="Describe the issue..."
              value={description}
              onChange={(e) => {setDescription(e.target.value);setErrorMessage("");}}
              rows={5}
              className="w-full bg-[#0d1d18] border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block mb-2 text-sm text-gray-300">
              Category*
            </label>

            <select
  value={category}
  onChange={(e) =>{
    setCategory(e.target.value);setErrorMessage("");}
  }
  className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-4"
>
  <option value="">
    Select Category
  </option>

  {categories.map((item) => (
    <option
      key={item.id}
      value={item.name}
    >
      {item.name}
    </option>
  ))}

  <option value="Other">
    Other
  </option>
</select>
<div className="bg-green-500/5 border border-green-500/10 rounded-2xl p-4 mt-4">
  <p className="text-green-400 text-sm font-medium">
    AI Tip
  </p>

  <p className="text-gray-400 text-sm mt-2 leading-7">
    Add clear descriptions and images for
    better AI analysis and faster repair
    recommendations.
  </p>
</div>
{category === "Other" && (
  <input
    type="text"
    placeholder="Enter new category"
    value={customCategory}
    onChange={(e) =>
      setCustomCategory(e.target.value)
    }
    className="w-full mt-4 bg-black/20 border border-white/10 rounded-2xl px-4 py-4"
  />
)}
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
          {errorMessage && (
  <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-2xl">
    {errorMessage}
  </div>
)}
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
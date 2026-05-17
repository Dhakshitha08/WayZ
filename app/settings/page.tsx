"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  User,
  Lock,
  Trash2,
  LogOut,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/auth/login");
      return;
    }

    setEmail(user.email || "");

    const { data, error } =
      await supabase
        .from("profiles")
        .select("username")
        .eq("id", user.id)
        .single();

    if (data) {
      setUsername(data.username);
    }

    if (error) {
      console.error(error);
    }
  };

  const updateUsername = async () => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username: username,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    // save username locally
    localStorage.setItem(
      "wayz_username",
      username
    );

    // notify dashboard instantly
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "wayz_username",
        newValue: username,
      })
    );

    alert("Username updated successfully");
  } catch (err) {
    console.error(err);
  }
};

  const changePassword = async () => {
    if (!newPassword) {
      alert("Enter new password");
      return;
    }

    const { error } =
      await supabase.auth.updateUser({
        password: newPassword,
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Password updated successfully");

    setNewPassword("");
  };

  const clearHistory = async () => {
    const confirmDelete = confirm(
      "Delete all issue history?"
    );

    if (!confirmDelete) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("reports")
      .delete()
      .eq("user_id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("History cleared successfully");
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen bg-[#06110d] text-white p-8">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold">
            Settings
          </h1>

          <p className="text-gray-400 mt-3">
            Manage your account preferences
            and security settings.
          </p>
        </div>

        <div className="space-y-8">

          {/* PROFILE */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <div className="flex items-center gap-3 mb-6">
              <User className="text-green-400" />

              <h2 className="text-2xl font-semibold">
                Edit Profile
              </h2>
            </div>

            <div className="space-y-4">

              <div>
                <label className="text-sm text-gray-400">
                  Email
                </label>

                <input
                  value={email}
                  disabled
                  className="w-full mt-2 bg-black/20 border border-white/10 rounded-2xl px-4 py-4 text-gray-500"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">
                  Username
                </label>

                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  className="w-full mt-2 bg-black/20 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-green-500"
                />
              </div>

              <button
                onClick={updateUsername}
                className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-700 px-6 py-3 rounded-2xl"
              >
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </div>

          {/* PASSWORD */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <div className="flex items-center gap-3 mb-6">
              <Lock className="text-yellow-400" />

              <h2 className="text-2xl font-semibold">
                Change Password
              </h2>
            </div>

            <div className="space-y-4">

              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(
                    e.target.value
                  )
                }
                className="w-full bg-black/20 border border-white/10 rounded-2xl px-4 py-4 outline-none focus:border-yellow-500"
              />

              <button
                onClick={changePassword}
                className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded-2xl font-medium text-black"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* HISTORY */}
          <div className="rounded-3xl bg-white/5 border border-red-500/20 p-6">

            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="text-red-400" />

              <h2 className="text-2xl font-semibold">
                Clear AI History
              </h2>
            </div>

            <p className="text-gray-400 mb-5">
              Delete all previous reports,
              AI analyses, and issue history.
            </p>

            <button
              onClick={clearHistory}
              className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl font-medium"
            >
              Delete History
            </button>
          </div>

          {/* LOGOUT */}
          <div className="rounded-3xl bg-white/5 border border-white/10 p-6">

            <div className="flex items-center gap-3 mb-6">
              <LogOut className="text-gray-300" />

              <h2 className="text-2xl font-semibold">
                Logout
              </h2>
            </div>

            <button
              onClick={logout}
              className="bg-white/10 hover:bg-white/20 transition px-6 py-3 rounded-2xl"
            >
              Logout from Wayz
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
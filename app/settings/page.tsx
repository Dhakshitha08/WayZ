"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

import {
  User,
  Lock,
  Moon,
  Sun,
  Trash2,
  LogOut,
  Save,
} from "lucide-react";

export default function SettingsPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] =
    useState("");

  const [darkMode, setDarkMode] =
    useState(true);

  useEffect(() => {
    getUser();

    const savedTheme =
      localStorage.getItem("theme");

    if (savedTheme === "light") {
      setDarkMode(false);
    } else {
      setDarkMode(true);
    }
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

    const { data } = await supabase
      .from("profiles")
      .select("username")
      .eq("id", user.id)
      .single();

    if (data) {
      setUsername(data.username);
    }
  };

  const updateUsername = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        username,
      })
      .eq("id", user.id);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Username updated successfully");

    window.location.reload();
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

    alert("Issue history cleared");

    window.location.reload();
  };

  const logout = async () => {
    await supabase.auth.signOut();

    router.push("/auth/login");
  };

  const toggleTheme = () => {
    const currentTheme =
      localStorage.getItem("theme");

    if (currentTheme === "light") {
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    } else {
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-all duration-300 ${
        darkMode
          ? "bg-[#06110d] text-white"
          : "bg-[#f4f7f5] text-black"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-3">
          Settings
        </h1>

        <p
          className={`mb-10 ${
            darkMode
              ? "text-gray-400"
              : "text-gray-600"
          }`}
        >
          Manage your Wayz account and
          preferences.
        </p>

        <div className="space-y-8">
          {/* PROFILE */}
          <div
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="text-green-400" />

              <h2 className="text-2xl font-semibold">
                Edit Profile
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  Email
                </label>

                <input
                  value={email}
                  disabled
                  className={`w-full mt-2 rounded-2xl px-4 py-4 border ${
                    darkMode
                      ? "bg-black/20 border-white/10 text-gray-400"
                      : "bg-gray-100 border-black/10 text-gray-600"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`text-sm ${
                    darkMode
                      ? "text-gray-400"
                      : "text-gray-600"
                  }`}
                >
                  Username
                </label>

                <input
                  value={username}
                  onChange={(e) =>
                    setUsername(
                      e.target.value
                    )
                  }
                  className={`w-full mt-2 rounded-2xl px-4 py-4 border outline-none ${
                    darkMode
                      ? "bg-black/20 border-white/10 text-white"
                      : "bg-white border-black/10 text-black"
                  }`}
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
          <div
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
            }`}
          >
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
                className={`w-full rounded-2xl px-4 py-4 border outline-none ${
                  darkMode
                    ? "bg-black/20 border-white/10 text-white"
                    : "bg-white border-black/10 text-black"
                }`}
              />

              <button
                onClick={changePassword}
                className="bg-yellow-500 hover:bg-yellow-600 transition px-6 py-3 rounded-2xl font-medium text-black"
              >
                Update Password
              </button>
            </div>
          </div>

          {/* THEME */}
          <div
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              {darkMode ? (
                <Moon className="text-blue-400" />
              ) : (
                <Sun className="text-orange-400" />
              )}

              <h2 className="text-2xl font-semibold">
                Theme
              </h2>
            </div>

            <button
              onClick={toggleTheme}
              className={`px-6 py-3 rounded-2xl transition ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-black/10 hover:bg-black/20"
              }`}
            >
              Switch to{" "}
              {darkMode
                ? "Light"
                : "Dark"}{" "}
              Mode
            </button>
          </div>

          {/* HISTORY */}
          <div
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "bg-white/5 border-red-500/20"
                : "bg-white border-red-200"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <Trash2 className="text-red-400" />

              <h2 className="text-2xl font-semibold">
                Clear AI History
              </h2>
            </div>

            <p
              className={`mb-5 ${
                darkMode
                  ? "text-gray-400"
                  : "text-gray-600"
              }`}
            >
              Delete all reported issues,
              AI analyses, and saved reports.
            </p>

            <button
              onClick={clearHistory}
              className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-2xl font-medium text-white"
            >
              Delete History
            </button>
          </div>

          {/* LOGOUT */}
          <div
            className={`rounded-3xl border p-6 ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-black/10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <LogOut
                className={
                  darkMode
                    ? "text-gray-300"
                    : "text-gray-700"
                }
              />

              <h2 className="text-2xl font-semibold">
                Logout
              </h2>
            </div>

            <button
              onClick={logout}
              className={`px-6 py-3 rounded-2xl transition ${
                darkMode
                  ? "bg-white/10 hover:bg-white/20"
                  : "bg-black/10 hover:bg-black/20"
              }`}
            >
              Logout from Wayz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
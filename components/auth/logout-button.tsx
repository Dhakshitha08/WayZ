"use client";

import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import { Button } from "@/components/ui/button";

export default function LogoutButton() {

  const router = useRouter();

  const handleLogout = async () => {

    await supabase.auth.signOut();

    router.replace("/auth/login");
  };

  return (
    <Button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white rounded-xl"
    >
      Logout
    </Button>
  );
}
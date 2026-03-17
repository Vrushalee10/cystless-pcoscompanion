import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface UserProfile {
  firstName: string;
  fullName: string;
  email: string;
  initial: string;
}

export const useUserProfile = (): UserProfile => {
  const [profile, setProfile] = useState<UserProfile>({
    firstName: "there",
    fullName: "",
    email: "",
    initial: "?",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const fullName = user.user_metadata?.full_name || user.email?.split("@")[0] || "";
      const firstName = fullName.split(" ")[0] || "there";
      const email = user.email || "";
      const initial = firstName.charAt(0).toUpperCase() || "?";

      setProfile({ firstName, fullName, email, initial });
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        const fullName = session.user.user_metadata?.full_name || session.user.email?.split("@")[0] || "";
        const firstName = fullName.split(" ")[0] || "there";
        const email = session.user.email || "";
        const initial = firstName.charAt(0).toUpperCase() || "?";
        setProfile({ firstName, fullName, email, initial });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return profile;
};

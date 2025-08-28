import React from "react";
import { useAuth } from "../../components/ui/AuthenticationGuard";
export default function ProfilePage(){
  const { user } = useAuth();
  return <div className="max-w-3xl mx-auto p-6"><h1 className="text-2xl font-bold">Profile</h1><pre className="mt-4 bg-muted p-4 rounded">{JSON.stringify(user,null,2)}</pre></div>;
}

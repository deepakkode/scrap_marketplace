import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/ui/AuthenticationGuard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
export default function LoginScreen(){
  const { login } = useAuth();
  const nav = useNavigate();
  const [email,setEmail] = useState(''); const [password,setPassword]=useState('');
  const onSubmit = (e)=>{ e.preventDefault(); login({ email }); nav('/explore-page'); };
  return (<div className="min-h-screen bg-background">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Sign in</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
      <p className="mt-4 text-sm">No account? <Link to="/register-screen" className="underline">Create one</Link></p>
    </div>
  </div>);
}

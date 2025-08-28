import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../components/ui/AuthenticationGuard";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
export default function RegisterScreen(){
  const { register } = useAuth();
  const nav = useNavigate();
  const [name,setName]=useState(''); const [email,setEmail]=useState(''); const [password,setPassword]=useState('');
  const onSubmit = (e)=>{ e.preventDefault(); register({ name, email }); nav('/explore-page'); };
  return (<div className="min-h-screen bg-background">
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create your account</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <Input placeholder="Full name" value={name} onChange={e=>setName(e.target.value)}/>
        <Input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
        <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
        <Button type="submit" className="w-full">Create account</Button>
      </form>
      <p className="mt-4 text-sm">Already have an account? <Link to="/login-screen" className="underline">Sign in</Link></p>
    </div>
  </div>);
}

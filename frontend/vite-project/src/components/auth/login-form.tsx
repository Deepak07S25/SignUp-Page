import * as React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

export function CardWithForm() {
  const [formData, setFormData] = useState({
    emailId: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    emailId: "",
    password: ""
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { emailId: "", password: "" };

    // Email validation
    if (!formData.emailId) {
      newErrors.emailId = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Email is invalid";
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        alert('Login successful!');
        // Optional: Redirect or update UI
      } else {
        const errorText = await response.text();
        alert(`Login failed: ${errorText}`);
      }
    } catch (error) {
      alert('Error during login: ' + error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    // Clear error when user starts typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Login to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="emailId">Email</Label>
              <Input 
                id="emailId" 
                type="email"
                placeholder="Email" 
                value={formData.emailId}
                onChange={handleChange}
              />
              {errors.emailId && (
                <span className="text-sm text-red-500">{errors.emailId}</span>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                placeholder="Password" 
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button  onClick={handleSubmit}>Login</Button>
      </CardFooter>
    </Card>
  )
}

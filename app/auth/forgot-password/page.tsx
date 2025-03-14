"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Brain, CheckCircle } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate sending reset email
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Reset Your Password</h2>
          <p className="mt-2 text-sm text-gray-600">We'll send you instructions to reset your password</p>
        </div>

        <Card>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Forgot Password</CardTitle>
                <CardDescription>
                  Enter your email address and we'll send you a link to reset your password
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700" disabled={isLoading}>
                  {isLoading ? "Sending..." : "Send Reset Link"}
                </Button>

                <div className="text-center text-sm">
                  Remember your password?{" "}
                  <Link href="/auth/login" className="text-purple-600 hover:text-purple-800 font-medium">
                    Back to login
                  </Link>
                </div>
              </CardFooter>
            </form>
          ) : (
            <div className="p-6 text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-12 w-12 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6">
                We've sent a password reset link to <span className="font-medium">{email}</span>. Please check your
                inbox and follow the instructions to reset your password.
              </p>
              <div className="space-y-4">
                <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
                  Try another email
                </Button>
                <Link href="/auth/login" className="block">
                  <Button variant="link" className="w-full text-purple-600">
                    Back to login
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-4 text-center text-xs text-gray-500">
          If you don't receive an email within a few minutes, check your spam folder or{" "}
          <button className="text-purple-600 hover:text-purple-800">contact support</button>
        </div>
      </div>
    </div>
  )
}


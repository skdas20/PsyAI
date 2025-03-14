"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Brain, EyeOff, Eye } from "lucide-react"

export default function RegisterPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const validatePassword = (pass) => {
    if (pass.length < 8) {
      return "Password must be at least 8 characters long"
    }
    return ""
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value
    setPassword(newPassword)
    setPasswordError(validatePassword(newPassword))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (validatePassword(password)) {
      return
    }

    setIsLoading(true)

    // Simulate registration
    setTimeout(() => {
      setIsLoading(false)
      // In a real implementation, this would redirect to the dashboard or verification page
      window.location.href = "/"
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Brain className="h-12 w-12 text-purple-600" />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Join PsyAI</h2>
          <p className="mt-2 text-sm text-gray-600">Create an account to start your mental wellness journey</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>Enter your information to sign up</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {passwordError && <p className="text-sm text-red-500 mt-1">{passwordError}</p>}
                <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {confirmPassword && password !== confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox id="terms" checked={agreeTerms} onCheckedChange={setAgreeTerms} required />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="terms" className="text-sm">
                    I agree to the{" "}
                    <Link href="/terms" className="text-purple-600 hover:text-purple-800">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
                      Privacy Policy
                    </Link>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700"
                disabled={isLoading || !agreeTerms || password !== confirmPassword || !!passwordError}
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}


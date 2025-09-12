import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { email, password } = form;
    if (!email || !password) {
      toast.error("All fields are required");
      return false;
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await axios.post("/api/login", form);
      await new Promise((res) => setTimeout(res, 1000)); // mock delay
      console.log(form)
      toast.success("Login successful!");
      navigate("/"); // Redirect to dashboard/main page
    } catch (err) {
      console.error(err);
      toast.error("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  document.title = 'Login | To Do App';
  return (
    <div className="flex items-center justify-center h-dvh bg-gray-100">
      {/* responsive width */}
      <Card className="max-w-sm w-dvw mx-4 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <p className="text-sm text-gray-500">Enter your credentials to continue</p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 mt-4">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
            <p className="text-sm text-gray-500 text-center">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline transition-all ease-in-out">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;

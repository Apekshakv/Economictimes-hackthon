import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogIn, UserPlus } from "lucide-react";

const AuthPage = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (isLogin) {
      if (!login(email, password)) setError("Invalid credentials");
    } else {
      if (!signup(name, email, password)) setError("Email already exists");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md p-8 rounded-xl border border-border gradient-card">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-gradient mb-2">ContentOps AI</h1>
          <p className="text-muted-foreground text-sm">Enterprise Content Intelligence Platform</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <Input
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-secondary border-border"
            />
          )}
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-secondary border-border"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-secondary border-border"
          />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <Button type="submit" className="w-full gradient-primary font-display text-primary-foreground">
            {isLogin ? <><LogIn className="w-4 h-4 mr-2" /> Sign In</> : <><UserPlus className="w-4 h-4 mr-2" /> Create Account</>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} className="text-primary hover:underline">
            {isLogin ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;

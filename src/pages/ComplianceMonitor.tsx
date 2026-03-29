import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ShieldCheck, Loader2, AlertTriangle, CheckCircle } from "lucide-react";
import { reviewCompliance } from "@/lib/groq";
import AppLayout from "@/components/AppLayout";
import ReactMarkdown from "react-markdown";

const ComplianceMonitor = () => {
  const [content, setContent] = useState("");
  const [brandName, setBrandName] = useState("");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleReview = async () => {
    if (!content.trim() || !brandName.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await reviewCompliance(content, brandName);
      setReview(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const flaggedItems = [
    { content: "Social Campaign #42", issue: "Unapproved terminology", severity: "high" },
    { content: "Product Email v3", issue: "Missing disclaimer", severity: "medium" },
    { content: "Blog: AI Trends", issue: "Tone deviation", severity: "low" },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Compliance Monitor</h1>
          <p className="text-muted-foreground mt-1">AI-powered brand governance and regulatory compliance</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Review Panel */}
          <Card className="gradient-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                Content Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input placeholder="Brand name..." value={brandName} onChange={(e) => setBrandName(e.target.value)} className="bg-secondary border-border" />
              <Textarea placeholder="Paste content to review..." value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="bg-secondary border-border" />
              <Button onClick={handleReview} disabled={loading || !content.trim() || !brandName.trim()} className="gradient-primary text-primary-foreground font-display">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <ShieldCheck className="w-4 h-4 mr-2" />}
                Run Compliance Check
              </Button>
              {error && <p className="text-destructive text-xs">{error}</p>}
              {review && (
                <div className="prose prose-invert prose-sm max-w-none p-4 rounded-lg bg-secondary border border-primary/20">
                  <ReactMarkdown>{review}</ReactMarkdown>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Active Flags */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-warning" />
                Active Flags
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {flaggedItems.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-secondary border border-border">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${
                      item.severity === "high" ? "bg-destructive" : item.severity === "medium" ? "bg-warning" : "bg-info"
                    }`} />
                    <span className="text-sm font-medium text-foreground">{item.content}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{item.issue}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ComplianceMonitor;

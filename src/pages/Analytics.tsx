import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BarChart3, Sparkles, Loader2, TrendingUp, Eye, ThumbsUp, Share2 } from "lucide-react";
import { analyzeEngagement } from "@/lib/groq";
import AppLayout from "@/components/AppLayout";
import ReactMarkdown from "react-markdown";

const metrics = [
  { label: "Total Views", value: "284K", change: "+18%", icon: Eye },
  { label: "Engagement", value: "12.4K", change: "+24%", icon: ThumbsUp },
  { label: "Shares", value: "3.2K", change: "+9%", icon: Share2 },
  { label: "Conversion", value: "2.8%", change: "+0.4%", icon: TrendingUp },
];

const Analytics = () => {
  const [description, setDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError("");
    try {
      const result = await analyzeEngagement(description);
      setAnalysis(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1">Content intelligence & engagement insights</p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m) => (
            <Card key={m.label} className="gradient-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <m.icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-display text-muted-foreground uppercase tracking-wider">{m.label}</span>
                </div>
                <p className="text-2xl font-display font-bold text-foreground">{m.value}</p>
                <p className="text-xs text-success mt-1">{m.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* AI Analysis */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              AI Content Analysis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe your content or paste it here for engagement analysis..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="bg-secondary border-border"
            />
            <Button onClick={handleAnalyze} disabled={loading || !description.trim()} className="gradient-primary text-primary-foreground font-display">
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <BarChart3 className="w-4 h-4 mr-2" />}
              Analyze Engagement
            </Button>
            {error && <p className="text-destructive text-xs">{error}</p>}
            {analysis && (
              <div className="prose prose-invert prose-sm max-w-none p-4 rounded-lg bg-secondary border border-primary/20">
                <ReactMarkdown>{analysis}</ReactMarkdown>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Analytics;

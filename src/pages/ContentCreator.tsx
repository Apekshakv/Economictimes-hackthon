import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PenTool, Sparkles, Globe, Loader2 } from "lucide-react";
import { generateContent, localizeContent } from "@/lib/groq";
import AppLayout from "@/components/AppLayout";
import ReactMarkdown from "react-markdown";

const ContentCreator = () => {
  const [topic, setTopic] = useState("");
  const [contentType, setContentType] = useState("blog");
  const [audience, setAudience] = useState("general");
  const [tone, setTone] = useState("professional");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [localizing, setLocalizing] = useState(false);
  const [targetLang, setTargetLang] = useState("spanish");
  const [localizedContent, setLocalizedContent] = useState("");
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!topic.trim()) return;
    setLoading(true);
    setError("");
    setGeneratedContent("");
    setLocalizedContent("");
    try {
      const result = await generateContent(contentType, topic, audience, tone);
      setGeneratedContent(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocalize = async () => {
    if (!generatedContent) return;
    setLocalizing(true);
    try {
      const result = await localizeContent(generatedContent, targetLang);
      setLocalizedContent(result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLocalizing(false);
    }
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Content Creator</h1>
          <p className="text-muted-foreground mt-1">AI-powered multi-agent content generation pipeline</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <PenTool className="w-5 h-5 text-primary" />
                Content Brief
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Topic</label>
                <Input placeholder="Enter your content topic..." value={topic} onChange={(e) => setTopic(e.target.value)} className="mt-1 bg-secondary border-border" />
              </div>
              <div>
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Content Type</label>
                <Select value={contentType} onValueChange={setContentType}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog Post</SelectItem>
                    <SelectItem value="social">Social Media</SelectItem>
                    <SelectItem value="email">Email Campaign</SelectItem>
                    <SelectItem value="press">Press Release</SelectItem>
                    <SelectItem value="whitepaper">White Paper</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Audience</label>
                <Select value={audience} onValueChange={setAudience}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="executive">Executive</SelectItem>
                    <SelectItem value="consumer">Consumer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs font-display text-muted-foreground uppercase tracking-wider">Tone</label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger className="mt-1 bg-secondary border-border"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="casual">Casual</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                    <SelectItem value="friendly">Friendly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerate} disabled={loading || !topic.trim()} className="w-full gradient-primary text-primary-foreground font-display">
                {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                Generate Content
              </Button>
              {error && <p className="text-destructive text-xs">{error}</p>}
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card className="gradient-card border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                Generated Content
              </CardTitle>
            </CardHeader>
            <CardContent>
              {generatedContent ? (
                <div className="space-y-4">
                  <div className="prose prose-invert prose-sm max-w-none p-4 rounded-lg bg-secondary">
                    <ReactMarkdown>{generatedContent}</ReactMarkdown>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Select value={targetLang} onValueChange={setTargetLang}>
                      <SelectTrigger className="w-40 bg-secondary border-border"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="french">French</SelectItem>
                        <SelectItem value="german">German</SelectItem>
                        <SelectItem value="japanese">Japanese</SelectItem>
                        <SelectItem value="mandarin">Mandarin</SelectItem>
                        <SelectItem value="arabic">Arabic</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleLocalize} disabled={localizing} variant="outline" className="border-primary text-primary font-display">
                      {localizing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Globe className="w-4 h-4 mr-2" />}
                      Localize
                    </Button>
                  </div>
                  {localizedContent && (
                    <div className="prose prose-invert prose-sm max-w-none p-4 rounded-lg bg-secondary border border-info/20">
                      <p className="text-xs font-display text-info uppercase tracking-wider mb-2">Localized Version</p>
                      <ReactMarkdown>{localizedContent}</ReactMarkdown>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <PenTool className="w-12 h-12 mb-3 opacity-30" />
                  <p className="text-sm">Configure your brief and generate content</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default ContentCreator;

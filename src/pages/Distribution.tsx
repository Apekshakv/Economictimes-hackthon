import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, CheckCircle, Clock, AlertTriangle, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import AppLayout from "@/components/AppLayout";

const channels = [
  { name: "LinkedIn", icon: Linkedin, status: "connected", posts: 24, engagement: "4.2%" },
  { name: "Twitter/X", icon: Twitter, status: "connected", posts: 56, engagement: "2.8%" },
  { name: "Email", icon: Mail, status: "connected", posts: 12, engagement: "22.1%" },
  { name: "Website", icon: Globe, status: "connected", posts: 34, engagement: "5.7%" },
];

const queue = [
  { title: "Q4 Product Launch Blog", channels: ["LinkedIn", "Website"], status: "ready", scheduledFor: "Tomorrow 9:00 AM" },
  { title: "Customer Success Story", channels: ["Email", "LinkedIn"], status: "pending_approval", scheduledFor: "Wed 2:00 PM" },
  { title: "Industry Report Summary", channels: ["Twitter/X", "LinkedIn"], status: "ready", scheduledFor: "Thu 10:00 AM" },
  { title: "Holiday Campaign", channels: ["Email", "Twitter/X", "LinkedIn"], status: "draft", scheduledFor: "Next Monday" },
];

const Distribution = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Distribution Hub</h1>
          <p className="text-muted-foreground mt-1">Multi-channel content publishing & scheduling</p>
        </div>

        {/* Channels */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {channels.map((ch) => (
            <Card key={ch.name} className="gradient-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <ch.icon className="w-5 h-5 text-primary" />
                  <span className="font-display font-medium text-foreground">{ch.name}</span>
                  <span className="ml-auto w-2 h-2 rounded-full bg-success" />
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{ch.posts} posts</span>
                  <span>{ch.engagement} avg. engagement</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Queue */}
        <Card className="gradient-card border-border">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Send className="w-5 h-5 text-primary" />
              Publishing Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {queue.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-lg bg-secondary border border-border">
                  {item.status === "ready" ? (
                    <CheckCircle className="w-5 h-5 text-success" />
                  ) : item.status === "pending_approval" ? (
                    <AlertTriangle className="w-5 h-5 text-warning" />
                  ) : (
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.channels.join(" · ")} · {item.scheduledFor}</p>
                  </div>
                  <Button
                    size="sm"
                    variant={item.status === "ready" ? "default" : "outline"}
                    className={item.status === "ready" ? "gradient-primary text-primary-foreground font-display text-xs" : "font-display text-xs"}
                    disabled={item.status === "draft"}
                  >
                    {item.status === "ready" ? "Publish" : item.status === "pending_approval" ? "Review" : "Edit"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Distribution;

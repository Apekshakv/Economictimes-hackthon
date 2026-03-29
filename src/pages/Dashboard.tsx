import { FileText, ShieldCheck, Globe, Send, TrendingUp, Clock, AlertTriangle, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppLayout from "@/components/AppLayout";

const stats = [
  { label: "Content Created", value: "147", change: "+12%", icon: FileText, color: "text-primary" },
  { label: "Compliance Rate", value: "94%", change: "+3%", icon: ShieldCheck, color: "text-success" },
  { label: "Languages", value: "12", change: "+2", icon: Globe, color: "text-info" },
  { label: "Distributed", value: "89", change: "+8%", icon: Send, color: "text-warning" },
];

const pipeline = [
  { stage: "Drafting", count: 8, status: "active", color: "bg-primary" },
  { stage: "Compliance Review", count: 5, status: "pending", color: "bg-warning" },
  { stage: "Localization", count: 3, status: "active", color: "bg-info" },
  { stage: "Approval", count: 2, status: "waiting", color: "bg-accent" },
  { stage: "Distribution", count: 4, status: "active", color: "bg-success" },
];

const recentActivity = [
  { action: "Blog post drafted", item: "Q4 Product Roadmap", time: "2m ago", icon: FileText, status: "success" },
  { action: "Compliance flagged", item: "Social Media Campaign", time: "15m ago", icon: AlertTriangle, status: "warning" },
  { action: "Localized to Spanish", item: "Customer Newsletter", time: "1h ago", icon: Globe, status: "success" },
  { action: "Published to LinkedIn", item: "Thought Leadership Post", time: "2h ago", icon: CheckCircle, status: "success" },
  { action: "Review requested", item: "Press Release Draft", time: "3h ago", icon: Clock, status: "pending" },
];

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Enterprise content operations overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="gradient-card border-border">
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground font-display uppercase tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-display font-bold text-foreground mt-1">{stat.value}</p>
                    <p className={`text-xs mt-1 ${stat.color}`}>{stat.change} this month</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color} opacity-60`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pipeline */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Content Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pipeline.map((stage) => (
                <div key={stage.stage} className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <span className="text-sm flex-1 text-foreground">{stage.stage}</span>
                  <span className="font-display text-sm font-bold text-muted-foreground">{stage.count}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">{stage.status}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="gradient-card border-border">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <item.icon className={`w-4 h-4 mt-0.5 ${
                    item.status === "success" ? "text-success" : item.status === "warning" ? "text-warning" : "text-muted-foreground"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{item.action}</p>
                    <p className="text-xs text-muted-foreground truncate">{item.item}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CreditCard, Lock, Server } from "lucide-react"

export function AdminDashboard() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Fixed Sidebar */}
      <aside className="w-full md:w-64 space-y-4 flex-shrink-0">
        <h2 className="text-xl font-bold mb-6">System Dashboard</h2>
        <nav className="flex flex-col space-y-2">
          <a href="#" className="bg-muted px-4 py-2 rounded-md font-medium text-sm transition-colors">
            Overview
          </a>
          <a href="#" className="hover:bg-muted/50 px-4 py-2 rounded-md font-medium text-sm text-muted-foreground transition-colors">
            Active Locks
          </a>
          <a href="#" className="hover:bg-muted/50 px-4 py-2 rounded-md font-medium text-sm text-muted-foreground transition-colors">
            Payments
          </a>
          <a href="#" className="hover:bg-muted/50 px-4 py-2 rounded-md font-medium text-sm text-muted-foreground transition-colors">
            Service Health
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Seat Locks</CardTitle>
              <Lock className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">142</div>
              <p className="text-xs text-muted-foreground">Redis TTLS &lt; 5m</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Failure Rate</CardTitle>
              <CreditCard className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last hour</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cache Hit Ratio</CardTitle>
              <Server className="h-4 w-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">98.2%</div>
              <p className="text-xs text-muted-foreground">Inventory Service</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">System Health</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">All Systems Go</div>
              <p className="text-xs text-muted-foreground">6/6 microservices active</p>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Metrics Chart Placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="min-h-[300px] flex items-center justify-center border-dashed">
            <span className="text-muted-foreground font-mono text-sm">Lock Acquisition Latency Chart</span>
          </Card>
          <Card className="min-h-[300px] flex items-center justify-center border-dashed">
            <span className="text-muted-foreground font-mono text-sm">Kafka Topic Lag</span>
          </Card>
        </div>
      </main>
    </div>
  )
}

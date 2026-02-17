import { useState } from "react";
import { Truck, Shield, CheckCircle, AlertCircle, MapPin, Users, Clock, FileText, Calendar, AlertTriangle, TrendingUp, Fuel, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ThemeToggle } from "@/ThemeToggle";

const TransportDashboard = () => {
  const vehicles = [
    { 
      id: "AS01AB1234", 
      type: "Tourist Bus", 
      route: "Guwahati-Shillong", 
      status: "Active", 
      passengers: 45, 
      permit: "Valid",
      driver: "Ram Kumar",
      lastUpdate: "2 min ago",
      fuelLevel: 85,
      permitExpiry: "2025-12-15"
    },
    { 
      id: "ML05CD5678", 
      type: "Taxi", 
      route: "Shillong City", 
      status: "Active", 
      passengers: 3, 
      permit: "Valid",
      driver: "John Synrem",
      lastUpdate: "5 min ago",
      fuelLevel: 67,
      permitExpiry: "2025-11-20"
    },
    { 
      id: "MN07EF9012", 
      type: "SUV", 
      route: "Imphal-Moreh", 
      status: "Maintenance", 
      passengers: 0, 
      permit: "Expired",
      driver: "Singh Moirangthem",
      lastUpdate: "1 hour ago",
      fuelLevel: 45,
      permitExpiry: "2025-08-10"
    },
    { 
      id: "NL02GH3456", 
      type: "Van", 
      route: "Kohima-Dimapur", 
      status: "Active", 
      passengers: 8, 
      permit: "Valid",
      driver: "Mary Angami",
      lastUpdate: "1 min ago",
      fuelLevel: 92,
      permitExpiry: "2026-01-05"
    },
    { 
      id: "TR08PQ7890", 
      type: "Tourist Bus", 
      route: "Agartala-Udaipur", 
      status: "En Route", 
      passengers: 32, 
      permit: "Valid",
      driver: "Raj Debbarma",
      lastUpdate: "3 min ago",
      fuelLevel: 78,
      permitExpiry: "2025-10-30"
    },
    { 
      id: "AR12RS3456", 
      type: "4WD Vehicle", 
      route: "Tawang-Bomdila", 
      status: "Active", 
      passengers: 6, 
      permit: "Valid",
      driver: "Tenzin Norbu",
      lastUpdate: "7 min ago",
      fuelLevel: 88,
      permitExpiry: "2025-12-08"
    }
  ];

  const permitStats = {
    valid: vehicles.filter(v => v.permit === "Valid").length,
    expired: vehicles.filter(v => v.permit === "Expired").length,
    expiringSoon: vehicles.filter(v => {
      const expiryDate = new Date(v.permitExpiry);
      const today = new Date();
      const daysDiff = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
      return daysDiff <= 30 && daysDiff > 0;
    }).length
  };

  return (
    <div className="min-h-screen bg-background pattern-tribal">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Truck className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-xl font-bold">Transport Control Center</h1>
              <p className="text-sm text-muted-foreground">Vehicle & Permit Management System</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <a href="/login">Logout</a>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Statistics Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="card-cultural border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Vehicles</span>
                <Truck className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.length}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">{vehicles.filter(v => v.status === 'Active' || v.status === 'En Route').length} active</span>
              </p>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Valid Permits</span>
                <CheckCircle className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{permitStats.valid}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-accent">{permitStats.expiringSoon} expiring soon</span>
              </p>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Total Passengers</span>
                <Users className="h-4 w-4 text-secondary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vehicles.reduce((sum, v) => sum + v.passengers, 0)}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-secondary">Currently traveling</span>
              </p>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center justify-between">
                <span className="text-sm font-medium">Compliance Rate</span>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-primary">+2% this month</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          {/* Vehicle Fleet */}
          <Card className="card-cultural border-0 lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-primary" />
                <span>Vehicle Fleet Management</span>
              </CardTitle>
              <CardDescription>Real-time monitoring of all registered vehicles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              {vehicles.map((vehicle, index) => (
                <div key={index} className="p-4 border border-border/50 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className="font-mono text-xs">{vehicle.id}</Badge>
                    <div className="flex space-x-2">
                      <Badge className={
                        vehicle.status === 'Active' ? 'bg-primary/20 text-primary' : 
                        vehicle.status === 'En Route' ? 'bg-secondary/20 text-secondary' :
                        'bg-accent/20 text-accent'
                      }>
                        {vehicle.status}
                      </Badge>
                      <Badge className={vehicle.permit === 'Valid' ? 'bg-primary/20 text-primary' : 'bg-destructive/20 text-destructive'}>
                        {vehicle.permit}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-sm">{vehicle.type}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{vehicle.route}</p>
                      <p className="text-xs"><strong>Driver:</strong> {vehicle.driver}</p>
                      <p className="text-xs text-muted-foreground">Updated: {vehicle.lastUpdate}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Passengers:</span>
                        <span className="font-medium">{vehicle.passengers}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span>Fuel Level:</span>
                          <span className="font-medium">{vehicle.fuelLevel}%</span>
                        </div>
                        <Progress value={vehicle.fuelLevel} className="h-1" />
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Permit Expires:</span>
                        <span className={
                          new Date(vehicle.permitExpiry) < new Date(Date.now() + 30*24*60*60*1000) 
                            ? "text-accent font-medium" 
                            : "font-medium"
                        }>
                          {new Date(vehicle.permitExpiry).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-3 pt-3 border-t border-border/30">
                    <Button variant="outline" size="sm">
                      <MapPin className="h-3 w-3 mr-1" />
                      Track
                    </Button>
                    <Button variant="outline" size="sm">
                      <FileText className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Permit Management */}
          <div className="space-y-6">
            <Card className="card-cultural border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  <span>Permit Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Valid Permits</p>
                    <p className="text-2xl font-bold text-primary">{permitStats.valid}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Expiring Soon</p>
                    <p className="text-2xl font-bold text-accent">{permitStats.expiringSoon}</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-accent" />
                </div>
                
                <div className="flex justify-between items-center p-3 bg-destructive/10 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">Expired</p>
                    <p className="text-2xl font-bold text-destructive">{permitStats.expired}</p>
                  </div>
                  <AlertCircle className="h-8 w-8 text-destructive" />
                </div>

                <Button variant="outline" className="w-full">
                  <Calendar className="h-4 w-4 mr-2" />
                  Renewal Schedule
                </Button>
              </CardContent>
            </Card>

            <Card className="card-cultural border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5 text-primary" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Truck className="h-4 w-4 mr-2" />
                  Register New Vehicle
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Emergency Protocol
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Route Management
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Transport Department Support: <a href="mailto:dishantvaswani7@gmail.com" className="text-primary hover:underline">dishantvaswani7@gmail.com</a> | 
            <a href="https://www.linkedin.com/in/dishant-vaswani/" className="text-primary hover:underline ml-2">LinkedIn</a> | 
            <a href="https://github.com/Dishant-V" className="text-primary hover:underline ml-2">GitHub</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TransportDashboard;
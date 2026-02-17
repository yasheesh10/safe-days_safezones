import { useState } from "react";
import { Shield, AlertTriangle, Phone, MapPin, Clock, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const EmergencySOS = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sosActive, setSosActive] = useState(false);
  const [emergencyType, setEmergencyType] = useState<string>("");

  const handleSOS = (type: string) => {
    setEmergencyType(type);
    setSosActive(true);
    
    toast({
      title: "SOS Alert Activated",
      description: `${type} emergency reported. Authorities have been notified.`,
      variant: "destructive"
    });

    // Auto-reset after 5 seconds for demo
    setTimeout(() => {
      setSosActive(false);
      setEmergencyType("");
    }, 5000);
  };

  const emergencyTypes = [
    {
      type: "Medical Emergency",
      icon: Phone,
      color: "bg-red-500",
      description: "Medical assistance required immediately"
    },
    {
      type: "Security Threat",
      icon: Shield,
      color: "bg-orange-500", 
      description: "Personal safety or security concern"
    },
    {
      type: "Natural Disaster",
      icon: AlertTriangle,
      color: "bg-yellow-500",
      description: "Earthquake, flood, or weather emergency"
    },
    {
      type: "Lost/Stranded",
      icon: MapPin,
      color: "bg-blue-500",
      description: "Unable to find way or transportation"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-cultural bg-clip-text text-transparent">
              Emergency SOS System
            </span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* SOS Status Banner */}
      {sosActive && (
        <div className="bg-destructive text-destructive-foreground p-4 animate-pulse">
          <div className="container mx-auto flex items-center justify-center space-x-4">
            <AlertTriangle className="h-6 w-6" />
            <span className="font-bold">SOS ACTIVE: {emergencyType} - Authorities Notified</span>
            <AlertTriangle className="h-6 w-6" />
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-destructive/5 to-orange-500/5">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-20 w-20 text-destructive mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-destructive">
            Emergency SOS System
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Immediate emergency response for tourists in North East India. 
            Your safety is our priority - help is just one click away.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="bg-card rounded-lg p-4">
              <Clock className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">Response Time</div>
              <div className="text-xs text-muted-foreground">Under 5 minutes</div>
            </div>
            <div className="bg-card rounded-lg p-4">
              <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">GPS Tracking</div>
              <div className="text-xs text-muted-foreground">Real-time location</div>
            </div>
            <div className="bg-card rounded-lg p-4">
              <Users className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">Multi-Agency</div>
              <div className="text-xs text-muted-foreground">Police, Medical, Rescue</div>
            </div>
            <div className="bg-card rounded-lg p-4">
              <Zap className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-semibold">24/7 Active</div>
              <div className="text-xs text-muted-foreground">Always available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Select Emergency Type</h2>
            <p className="text-xl text-muted-foreground">
              Choose the type of emergency to ensure the right help is dispatched
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {emergencyTypes.map((emergency, index) => (
              <Card 
                key={index} 
                className={`card-cultural hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-destructive ${
                  sosActive && emergencyType === emergency.type ? 'border-destructive bg-destructive/5' : ''
                }`}
                onClick={() => handleSOS(emergency.type)}
              >
                <CardHeader className="text-center">
                  <div className={`${emergency.color} p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                    <emergency.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-lg">{emergency.type}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{emergency.description}</CardDescription>
                  <Button 
                    variant="destructive" 
                    size="sm"
                    className="w-full"
                    disabled={sosActive}
                  >
                    {sosActive && emergencyType === emergency.type ? 'SOS ACTIVE' : 'Activate SOS'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How Emergency Response Works</h2>
            <p className="text-xl text-muted-foreground">
              Advanced technology ensures rapid response in critical situations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Alert Triggered</h3>
              <p className="text-muted-foreground">
                Emergency button pressed with GPS location automatically captured
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Authorities Notified</h3>
              <p className="text-muted-foreground">
                Police, medical teams, and local authorities receive instant notification
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 p-6 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Help Dispatched</h3>
              <p className="text-muted-foreground">
                Nearest response team dispatched with real-time location tracking
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Emergency Contacts</h2>
            <p className="text-xl text-muted-foreground">
              Important numbers for different types of emergencies
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="card-cultural p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Phone className="h-12 w-12 text-destructive mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Emergency Services</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-2xl font-bold text-destructive">112</p>
                    <p>All Emergency Services</p>
                  </div>
                </div>

                <div className="text-center">
                  <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Tourist Helpline</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-2xl font-bold text-primary">1363</p>
                    <p>Tourist Assistance</p>
                  </div>
                </div>

                <div className="text-center">
                  <MapPin className="h-12 w-12 text-accent mx-auto mb-4" />
                  <h3 className="font-bold text-xl mb-2">Local Police</h3>
                  <div className="space-y-2 text-muted-foreground">
                    <p className="text-2xl font-bold text-accent">100</p>
                    <p>Police Emergency</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Stay Safe During Your Journey</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Download our safety app for additional features including offline emergency contacts, 
            safety tips, and cultural information for North East India.
          </p>
          <div className="space-x-4">
            <Button className="btn-cultural" onClick={() => navigate("/login")}>
              Access Safety Dashboard
            </Button>
            <Button variant="outline" onClick={() => navigate("/")}>
              Return to Homepage
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 North East Tourist Safety System. All rights reserved.</p>
          <p className="mt-2">Emergency services available 24/7 across all seven sister states</p>
        </div>
      </footer>
    </div>
  );
};

export default EmergencySOS;
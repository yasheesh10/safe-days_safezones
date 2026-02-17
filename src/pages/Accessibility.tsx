import { Shield, ArrowLeft, Eye, Ear, Hand, Brain, Settings, Mail, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/ThemeToggle";

const Accessibility = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pattern-mountain">
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back to Home</span>
            </Button>
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold bg-gradient-cultural bg-clip-text text-transparent">
                Tourist Safety
              </span>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-muted-foreground text-lg">
            Ensuring everyone can safely explore Northeast India
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: September 12, 2025
          </p>
        </div>

        <div className="space-y-6">
          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle>Our Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                The Tourist Safety System is committed to ensuring digital accessibility for people 
                with disabilities. We continually improve the user experience for everyone and apply 
                relevant accessibility standards to ensure our emergency and cultural exploration 
                features are usable by all visitors to Northeast India.
              </p>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Eye className="h-5 w-5 text-primary" />
                <span>Visual Accessibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">High Contrast & Dark Mode</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Dark mode toggle for reduced eye strain during extended use</li>
                  <li>High contrast color schemes meeting WCAG AA standards</li>
                  <li>Clear visual distinction between emergency and regular functions</li>
                  <li>Cultural content with descriptive alt text for all images</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Text & Font Support</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Scalable text that works with browser zoom up to 200%</li>
                  <li>Clear, readable fonts optimized for emergency situations</li>
                  <li>Support for screen readers and text-to-speech tools</li>
                  <li>Multi-language support including local Northeast scripts</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ear className="h-5 w-5 text-secondary" />
                <span>Audio Accessibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Audio Alerts & Captions</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Visual alternatives for all audio emergency alerts</li>
                  <li>Vibration patterns for mobile emergency notifications</li>
                  <li>Subtitle support for cultural video content</li>
                  <li>Audio descriptions for traditional music and cultural performances</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Voice Features</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Voice-activated emergency SOS for hands-free operation</li>
                  <li>Audio navigation for cultural site directions</li>
                  <li>Voice feedback for form completion and system status</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Hand className="h-5 w-5 text-accent" />
                <span>Motor Accessibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Navigation & Controls</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Large touch targets (minimum 44px) for emergency buttons</li>
                  <li>Keyboard navigation support for all features</li>
                  <li>Gesture alternatives for swipe-based actions</li>
                  <li>One-handed operation mode for emergency situations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Emergency Accessibility</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Multiple ways to trigger SOS (tap, hold, shake, voice)</li>
                  <li>Simplified emergency interface with minimal required interactions</li>
                  <li>Automatic location sharing without manual input required</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="h-5 w-5 text-primary" />
                <span>Cognitive Accessibility</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Clear Communication</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Simple, clear language in emergency instructions</li>
                  <li>Step-by-step guidance for complex cultural site visits</li>
                  <li>Visual icons and symbols alongside text descriptions</li>
                  <li>Consistent navigation patterns throughout the system</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Memory & Focus Support</h4>
                <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                  <li>Auto-save functionality for travel plans and preferences</li>
                  <li>Clear visual indicators for current location and status</li>
                  <li>Timeout warnings with option to extend sessions</li>
                  <li>Breadcrumb navigation for cultural exploration</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5 text-secondary" />
                <span>Customization Features</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li><strong>Font Size:</strong> Adjustable text size from 100% to 200%</li>
                <li><strong>Motion:</strong> Reduced motion option for animations and transitions</li>
                <li><strong>Sound:</strong> Customizable audio alerts and notification volumes</li>
                <li><strong>Color:</strong> High contrast mode and color-blind friendly palettes</li>
                <li><strong>Language:</strong> Interface available in English, Hindi, and local Northeast languages</li>
                <li><strong>Emergency:</strong> Customizable emergency contact preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle>Compliance Standards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our system aims to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 
                Level AA standards and follows:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
                <li>Section 508 of the US Rehabilitation Act</li>
                <li>European Accessibility Act (EAA) requirements</li>
                <li>India's Guidelines for Indian Government Websites (GIGW)</li>
                <li>Rights of Persons with Disabilities Act, 2016 (India)</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="card-cultural border-0">
            <CardHeader>
              <CardTitle>Feedback & Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                We welcome feedback on accessibility improvements. If you encounter barriers 
                or have suggestions, please contact us:
              </p>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:dishantvaswani7@gmail.com" className="text-primary hover:underline">
                    dishantvaswani7@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">Accessibility Team, Tourist Safety System</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                We aim to respond to accessibility feedback within 48 hours and implement 
                reasonable accommodations within 30 days.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Accessibility;
import {
  Shield,
  ArrowLeft,
  Users,
  Lock,
  Database,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/ThemeToggle";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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
              <span>Back</span>
            </Button>

            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">
                Tourist Safety System
              </span>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </header>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-10 max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
          <p className="text-muted-foreground">
            How we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: September 2025
          </p>
        </div>

        <div className="space-y-6">

          {/* Information We Collect */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Information We Collect
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <ul className="list-disc pl-6 space-y-1">
                <li>Full name and email address</li>
                <li>Blockchain Safety ID</li>
                <li>Location data (only for safety & SOS)</li>
                <li>Device and browser information</li>
                <li>App usage and interaction logs</li>
              </ul>
            </CardContent>
          </Card>

          {/* How We Use Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                How We Use Your Information
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide emergency SOS services</li>
                <li>Enable safety monitoring and alerts</li>
                <li>Create and manage user accounts</li>
                <li>Improve platform performance</li>
                <li>Send important system notifications</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Data Storage & Security
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                We use encryption, secure servers, and access control mechanisms
                to protect your data.
              </p>
              <p>
                Blockchain IDs are used as unique identifiers to enhance identity
                security.
              </p>
            </CardContent>
          </Card>

          {/* Data Sharing */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Data Sharing
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
              <p>
                We do not sell your personal data.
              </p>
              <p>
                Data may be shared only with authorized emergency services when
                SOS is triggered or when legally required.
              </p>
            </CardContent>
          </Card>

          {/* User Rights */}
          <Card>
            <CardHeader>
              <CardTitle>User Rights</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal data</li>
                <li>Request corrections</li>
                <li>Request data deletion</li>
                <li>Withdraw consent</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact */}
          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                For any privacy-related questions or concerns:
              </p>

              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href="mailto:safety@touristsystem.com"
                  className="text-primary hover:underline"
                >
                  safety@touristsystem.com
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <span>Support Helpline: 112</span>
              </div>

            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

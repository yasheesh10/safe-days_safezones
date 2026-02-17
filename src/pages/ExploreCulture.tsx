import { useState } from "react";
import { Shield, Music, Camera, Palette, MapPin, ExternalLink, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import CulturalModal, { CULTURAL_DATA } from "@/CulturalModal";
import traditionalDance from "@/assets/traditional-dance.jpg";
import northeastNature from "@/assets/northeast-nature.jpg";
import traditionalCrafts from "@/assets/traditional-crafts.jpg";

const ExploreCulture = () => {
  const navigate = useNavigate();
  const [selectedCulturalItem, setSelectedCulturalItem] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openCulturalModal = (itemId: string) => {
    const item = CULTURAL_DATA.find(item => item.id === itemId);
    if (item) {
      setSelectedCulturalItem(item);
      setModalOpen(true);
    }
  };

  const culturalHighlights = [
    {
      id: "bihu-geet",
      title: "Bihu Folk Songs",
      state: "Assam",
      category: "Music & Dance",
      image: traditionalDance,
      description: "Traditional folk songs celebrating spring and harvest seasons",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Bihu"
    },
    {
      id: "manipuri-dance",
      title: "Manipuri Classical Dance",
      state: "Manipur", 
      category: "Classical Arts",
      image: traditionalDance,
      description: "Graceful classical dance form with spiritual significance",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Manipuri_dance"
    },
    {
      id: "bamboo-crafts",
      title: "Bamboo Handicrafts",
      state: "Mizoram",
      category: "Traditional Crafts",
      image: traditionalCrafts,
      description: "Intricate bamboo weaving and craft making techniques",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Bamboo_craft"
    },
    {
      id: "kaziranga",
      title: "Kaziranga National Park",
      state: "Assam",
      category: "Natural Heritage",
      image: northeastNature,
      description: "UNESCO World Heritage site and home to one-horned rhinoceros",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      learnMoreUrl: "https://en.wikipedia.org/wiki/Kaziranga_National_Park"
    }
  ];

  const stateInfo = [
    {
      name: "Assam",
      highlights: ["Tea Gardens", "Kaziranga", "Bihu Festival", "Silk Weaving"],
      mapUrl: "https://maps.google.com/?q=Assam,India"
    },
    {
      name: "Arunachal Pradesh", 
      highlights: ["Monasteries", "Tawang", "Tribal Culture", "Mountain Peaks"],
      mapUrl: "https://maps.google.com/?q=Arunachal Pradesh,India"
    },
    {
      name: "Manipur",
      highlights: ["Manipuri Dance", "Loktak Lake", "Ima Keithel", "Polo Sport"],
      mapUrl: "https://maps.google.com/?q=Manipur,India"
    },
    {
      name: "Meghalaya",
      highlights: ["Living Root Bridges", "Shillong", "Caves", "Waterfalls"],
      mapUrl: "https://maps.google.com/?q=Meghalaya,India"
    },
    {
      name: "Mizoram",
      highlights: ["Bamboo Crafts", "Chapchar Kut", "Hills", "Traditional Dance"],
      mapUrl: "https://maps.google.com/?q=Mizoram,India"
    },
    {
      name: "Nagaland",
      highlights: ["Hornbill Festival", "Tribal Villages", "Handicrafts", "War Cemeteries"],
      mapUrl: "https://maps.google.com/?q=Nagaland,India"  
    },
    {
      name: "Tripura",
      highlights: ["Ujjayanta Palace", "Neermahal", "Tribal Culture", "Handicrafts"],
      mapUrl: "https://maps.google.com/?q=Tripura,India"
    }
  ];

  return (
    <div className="min-h-screen bg-background pattern-tribal">
      {/* Header Navigation */}
      <header className="bg-card/80 backdrop-blur-sm border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-cultural bg-clip-text text-transparent">
              Cultural Heritage Explorer
            </span>
          </div>
          <Button variant="outline" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <Palette className="h-20 w-20 text-primary mx-auto mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-cultural bg-clip-text text-transparent">
              Explore Culture
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover the rich cultural tapestry of North East India - from ancient traditions 
            to vibrant festivals, each state offers unique experiences waiting to be explored.
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="secondary" className="px-4 py-2">Music & Dance</Badge>
            <Badge variant="secondary" className="px-4 py-2">Traditional Crafts</Badge>
            <Badge variant="secondary" className="px-4 py-2">Natural Heritage</Badge>
            <Badge variant="secondary" className="px-4 py-2">Festivals</Badge>
          </div>
        </div>
      </section>

      {/* Cultural Highlights */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cultural Highlights</h2>
            <p className="text-xl text-muted-foreground">
              Experience the diverse cultural heritage through interactive content
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {culturalHighlights.map((item, index) => (
              <Card key={index} className="card-cultural border-0 hover:shadow-cultural transition-all duration-300">
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-48 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                    onClick={() => openCulturalModal(item.id)}
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="text-xs">
                      {item.state}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg mb-1">{item.title}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">
                        {item.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <p className="text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => window.open(item.videoUrl, '_blank')}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Video
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="flex-1 text-xs"
                      onClick={() => window.open(item.learnMoreUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Seven Sister States */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Seven Sister States</h2>
            <p className="text-xl text-muted-foreground">
              Each state offers unique cultural experiences and natural wonders
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {stateInfo.map((state, index) => (
              <Card key={index} className="card-cultural hover:shadow-elegant transition-all duration-300">
                <CardHeader className="text-center pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {state.name}
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => window.open(state.mapUrl, '_blank')}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {state.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full mt-4"
                    onClick={() => window.open(state.mapUrl, '_blank')}
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Map
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Features */}
      <section className="py-20 bg-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Interactive Cultural Experience</h2>
            <p className="text-xl text-muted-foreground">
              Immerse yourself in North Eastern culture through technology
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="card-cultural text-center p-6">
              <Music className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Folk Music Library</h3>
              <p className="text-muted-foreground mb-4">
                Listen to traditional songs and learn about their cultural significance
              </p>
              <Button variant="outline" onClick={() => openCulturalModal('bihu-geet')}>
                Explore Music
              </Button>
            </Card>

            <Card className="card-cultural text-center p-6">
              <Camera className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Virtual Tours</h3>
              <p className="text-muted-foreground mb-4">
                Take virtual tours of historical sites and natural wonders
              </p>
              <Button variant="outline" onClick={() => openCulturalModal('kaziranga')}>
                Start Tour
              </Button>
            </Card>

            <Card className="card-cultural text-center p-6">
              <Palette className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-3">Craft Workshop</h3>
              <p className="text-muted-foreground mb-4">
                Learn traditional handicraft techniques through interactive guides
              </p>
              <Button variant="outline" onClick={() => openCulturalModal('bamboo-crafts')}>
                Learn Crafts
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Plan Your Cultural Journey</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Ready to experience the rich cultural heritage of North East India? 
            Let our safety system guide you through an unforgettable journey.
          </p>
          <div className="space-x-4">
            <Button className="btn-cultural" onClick={() => navigate("/login")}>
              Start Your Journey
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
          <p className="mt-2">Preserving culture while ensuring your safety across the seven sister states</p>
        </div>
      </footer>

      {/* Cultural Modal */}
      <CulturalModal 
        item={selectedCulturalItem}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default ExploreCulture;
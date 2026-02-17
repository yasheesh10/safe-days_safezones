import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, ExternalLink, Play, Volume2, Camera, Calendar } from 'lucide-react';
import traditionalDance from '@/assets/traditional-dance.jpg';
import northeastNature from '@/assets/northeast-nature.jpg';
import traditionalCrafts from '@/assets/traditional-crafts.jpg';

interface CulturalItem {
  id: string;
  type: 'song' | 'dance' | 'attraction' | 'flora' | 'fauna' | 'craft';
  title: string;
  region: string;
  description: string;
  details: string;
  image?: string;
  coordinates?: { lat: number; lng: number };
  bestSeason?: string;
  significance?: string;
  externalLinks?: { name: string; url: string }[];
}

interface CulturalModalProps {
  item: CulturalItem | null;
  isOpen: boolean;
  onClose: () => void;
}

const CulturalModal: React.FC<CulturalModalProps> = ({ item, isOpen, onClose }) => {
  if (!item) return null;

  const getTypeIcon = () => {
    switch (item.type) {
      case 'song': return <Volume2 className="h-5 w-5" />;
      case 'dance': return <Play className="h-5 w-5" />;
      case 'attraction': return <MapPin className="h-5 w-5" />;
      case 'flora':
      case 'fauna': return <Camera className="h-5 w-5" />;
      case 'craft': return <Calendar className="h-5 w-5" />;
      default: return <MapPin className="h-5 w-5" />;
    }
  };

  const getTypeColor = () => {
    switch (item.type) {
      case 'song': return 'bg-accent/20 text-accent';
      case 'dance': return 'bg-primary/20 text-primary';
      case 'attraction': return 'bg-secondary/20 text-secondary-foreground';
      case 'flora': return 'bg-green-500/20 text-green-700';
      case 'fauna': return 'bg-orange-500/20 text-orange-700';
      case 'craft': return 'bg-purple-500/20 text-purple-700';
      default: return 'bg-primary/20 text-primary';
    }
  };

  const openInMaps = () => {
    if (item.coordinates) {
      const url = `https://www.google.com/maps/search/?api=1&query=${item.coordinates.lat},${item.coordinates.lng}`;
      window.open(url, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl card-cultural border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getTypeIcon()}
            <span>{item.title}</span>
          </DialogTitle>
          <DialogDescription className="flex items-center space-x-2">
            <Badge className={getTypeColor()}>
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
            <span>•</span>
            <span>{item.region}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Main Image */}
          {item.image && (
            <div className="w-full h-48 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Description */}
          <div>
            <h3 className="font-semibold mb-2">About</h3>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <p className="text-sm">{item.details}</p>
          </div>

          {/* Cultural Significance */}
          {item.significance && (
            <div>
              <h3 className="font-semibold mb-2">Cultural Significance</h3>
              <p className="text-sm text-muted-foreground">{item.significance}</p>
            </div>
          )}

          {/* Best Season */}
          {item.bestSeason && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Best Season:</span>
              </div>
              <Badge variant="outline">{item.bestSeason}</Badge>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3">
            {item.coordinates && (
              <Button onClick={openInMaps} className="flex-1">
                <MapPin className="h-4 w-4 mr-2" />
                View on Maps
              </Button>
            )}
            
            {item.type === 'song' && (
              <Button variant="outline" className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Play Sample
              </Button>
            )}

            {item.type === 'dance' && (
              <Button variant="outline" className="flex-1">
                <Camera className="h-4 w-4 mr-2" />
                Watch Video
              </Button>
            )}

            {item.externalLinks?.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => window.open(link.url, '_blank')}
                className="flex-1"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                {link.name}
              </Button>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Sample cultural data
export const CULTURAL_DATA: CulturalItem[] = [
  {
    id: 'bihu-geet',
    type: 'song',
    title: 'Bihu Geet',
    region: 'Assam',
    description: 'Traditional spring festival song celebrating the Assamese New Year',
    details: 'Bihu Geet are traditional folk songs sung during the Bihu festival, particularly Rongali Bihu (spring festival). These songs celebrate love, youth, and the beauty of nature. The lyrics often describe the changing seasons, agricultural activities, and romantic themes.',
    image: traditionalDance,
    significance: 'These songs are integral to Assamese cultural identity and are performed during community gatherings to strengthen social bonds.',
    bestSeason: 'Spring (April)',
    externalLinks: [
      { name: 'Listen on Spotify', url: 'https://open.spotify.com/search/bihu%20geet' },
      { name: 'Cultural Article', url: 'https://en.wikipedia.org/wiki/Bihu' }
    ]
  },
  {
    id: 'manipuri-dance',
    type: 'dance',
    title: 'Manipuri Dance',
    region: 'Manipur',
    description: 'Classical dance form known for graceful movements and spiritual themes',
    details: 'Manipuri dance is one of the eight classical dance forms of India. Characterized by graceful, fluid movements and devotional themes, particularly depicting the love between Radha and Krishna. The dance combines both tandava (vigorous) and lasya (graceful) elements.',
    image: traditionalDance,
    significance: 'Recognized as one of India\'s classical dance forms, it represents centuries of cultural refinement and spiritual expression.',
    bestSeason: 'All year',
    externalLinks: [
      { name: 'Performance Videos', url: 'https://www.youtube.com/results?search_query=manipuri+dance' },
      { name: 'Learn More', url: 'https://en.wikipedia.org/wiki/Manipuri_dance' }
    ]
  },
  {
    id: 'kaziranga',
    type: 'attraction',
    title: 'Kaziranga National Park',
    region: 'Assam',
    description: 'UNESCO World Heritage Site famous for one-horned rhinoceros',
    details: 'Kaziranga National Park hosts two-thirds of the world\'s great one-horned rhinoceroses. The park is located in the Golaghat and Nagaon districts of Assam and covers an area of 378 square kilometers.',
    image: northeastNature,
    coordinates: { lat: 26.5775, lng: 93.1717 },
    significance: 'A UNESCO World Heritage Site since 1985, crucial for rhinoceros conservation.',
    bestSeason: 'November to April',
    externalLinks: [
      { name: 'Official Website', url: 'https://www.kaziranga-national-park.com/' },
      { name: 'Booking', url: 'https://forest.assam.gov.in/portlets/kaziranga-national-park' }
    ]
  },
  {
    id: 'red-panda',
    type: 'fauna',
    title: 'Red Panda',
    region: 'Arunachal Pradesh',
    description: 'Endangered species native to the Eastern Himalayas',
    details: 'The red panda is a mammal native to the Eastern Himalayas and Southern China. It\'s the state animal of Sikkim and found in the forests of Arunachal Pradesh. These arboreal mammals are known for their distinctive russet fur and ringed tail.',
    image: northeastNature,
    significance: 'An endangered species and important indicator of forest ecosystem health.',
    bestSeason: 'October to March',
    externalLinks: [
      { name: 'Conservation Info', url: 'https://www.redpandanetwork.org/' },
      { name: 'Wildlife Article', url: 'https://en.wikipedia.org/wiki/Red_panda' }
    ]
  },
  {
    id: 'bamboo-crafts',
    type: 'craft',
    title: 'Traditional Bamboo Crafts',
    region: 'Meghalaya',
    description: 'Intricate handicrafts made from locally sourced bamboo',
    details: 'The Khasi and Jaintia tribes of Meghalaya are renowned for their bamboo and cane craftsmanship. Products include baskets, furniture, musical instruments, and decorative items. The craft represents sustainable use of forest resources.',
    image: traditionalCrafts,
    significance: 'Represents sustainable living practices and provides livelihood to tribal communities.',
    bestSeason: 'All year',
    externalLinks: [
      { name: 'Buy Online', url: 'https://www.incredibleindia.org/content/incredible-india-v2/en/destinations/guwahati/bamboo-and-cane-crafts.html' },
      { name: 'Craft History', url: 'https://en.wikipedia.org/wiki/Bamboo_and_cane_crafts_of_Assam' }
    ]
  }
];

export default CulturalModal;
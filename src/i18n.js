import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        selectRole: "Select Your Role",
emailOrBlockchain: "Email or Blockchain ID",
enterEmailOrBlockchain: "Enter Email or Blockchain ID",
password: "Password",
enterPassword: "Enter your password",
changeRole: "Change role",
noAccount: "Don’t have an account?",
registerNow: "Register now",
backToHome: "Back to Home",
dashboard: "Dashboard",
        touristDashboardDesc: "SOS, attractions, cultural content",
policeDashboardDesc: "Incident monitoring, emergency response",
chatWelcome:
  "👋 Welcome! I’m your AI assistant for the Tourist Safety & Incident Response System.\n\nWhat would you like help with?",
touristSafetyDashboard: "Tourist Safety Dashboard",
back: "Back",

sendSOS: "SEND SOS",
immediatePoliceAssistance: "Immediate police assistance",

realtimeSafety: "Real-time Safety Monitor",
aiGeofencing: "AI-powered geofencing and location safety analysis",
locationStatus: "Location Status",
liveTracking: "Live Tracking",
currentAreaSafety: "Current Area Safety",
unknownArea: "Unknown area - exercise caution",

startLiveTracking: "Start Live Tracking",

reportIncident: "Report Incident",
selectType: "Select Type",
describeIncident: "Describe what happened...",
submitReport: "Submit Report",

nearbySafetyServices: "Nearby Safety Services",
policeStation: "Police Station",
hospital: "Hospital",
touristHelpDesk: "Tourist Help Desk",

safetyAlerts: "Safety Alerts",
noActiveAlerts: "No active alerts",

weatherNearby: "Weather Nearby",
accountStatus: "Account Status",
verifiedTourist: "Verified Tourist",

nearbyRestaurants: "Nearby Restaurants",
basedOnYourLocation: "Based on your current location",

safetyAdvisory: "Safety Advisory",
stayAlert:
  "Exercise caution in this area. Stay alert and avoid isolated areas.",
theft: "Theft",
harassment: "Harassment",
accident: "Accident",
suspiciousActivity: "Suspicious Activity",
commandCenter: "Command Center",
activeIncidents_one: "Active Incident",
activeIncidents_other: "Active Incidents",

enterJurisdiction: "Enter Your Jurisdiction",
enterCityOrStation: "Enter your city or police station",
loadAlerts: "Load Alerts",

liveEmergencyAlerts: "Live Emergency Alerts",
noIncidents: "No incidents yet",

emergencyAlert: "Emergency Alert",
noDescription: "No description provided",
unknownUser: "Unknown User",
unknown: "Unknown",

call: "Call",
navigate: "Navigate",

shareLocation: "Share Location",
safeRoutes: "Safe Routes",

chatWhatIsSite: "🤖 What is this website?",
chatEmergency: "🚨 Emergency & SOS",
chatSafeZones: "🛡️ Safety & Safe Zones",
chatDashboards: "📊 Dashboards & Roles",
chatAskElse: "❓ Ask something else",
chatPlaceholder: "Ask about safety, culture...",
chatSend: "Send",
chatTitle: "AI Assistant",
safeZone: "Safe Zone",
cautionZone: "Caution Zone",
highRiskZone: "High Risk Zone",

lat: "Lat",
lng: "Lng",

highRiskMove: "High risk area detected. Consider moving to a safer location.",


        appName: "Tourist Safety System",
        features: "Features",
        dashboards: "Dashboards",
        login: "Login",
        logout: "Logout",
        hiUser: "Hi",
staySafeAroundYou: "Stay Safe Around You",

locationPopupDesc:
  "SAFE DAYS uses your live location to show nearby police stations, hospitals, tourist help desks, and real-time safety alerts.",

enableLocation: "Enable Location",

maybeLater: "Maybe Later",

        heroBadge: "AI + Blockchain Powered Safety System",
        heroTitle1: "Tourist Safety &",
        heroTitle2: "Incident Response",
        heroSubtitle:
          "Ensuring every traveler’s safety through innovation inspired by our people, traditions, and timeless heritage.",

        emergencySOS: "Emergency SOS",
        exploreFeatures: "Explore Features",
        checkSafeZone: "Check Safe Zone",

        sosAlerts: "SOS Alerts",
        blockchainId: "Blockchain ID",
        aiAssistant: "AI Assistant",

        coreFeatures: "Core Safety Features",
        coreFeaturesDesc:
          "Harnessing advanced technology to make travel safer across every destination.",
locationCity: "Mumbai, Maharashtra",

        sosFeatureTitle: "SOS Emergency Alerts",
        sosFeatureDesc:
          "Instant emergency response system with GPS location tracking and automated notifications to authorities.",
touristRoleDesc: "Your trip, your safety hub",
policeRoleDesc: "Monitor incidents & alerts",

        blockchainFeatureTitle: "Blockchain Safety ID",
        blockchainFeatureDesc:
          "Secure, immutable digital identity system for tourists with encrypted personal data protection.",
active: "Active",
off: "Off",
        heatmapFeatureTitle: "Travel Safety Heatmaps",
        heatmapFeatureDesc:
          "Real-time incident mapping and safety zone visualization powered by AI analytics.",

        multiroleFeatureTitle: "Multi-Role Dashboards",
        multiroleFeatureDesc:
          "Specialized interfaces for tourists, police, transport authorities, and system administrators.",

        roleDashboards: "Role-Based Access Dashboards",
        roleDashboardsDesc: "Specialized interfaces for different user types",
        accessDashboard: "Access Dashboard",
authenticating: "Authenticating…",
        tourist: "Tourist",
        police: "Police",
realtimeSafetyMonitor: "Real-time Safety Monitor",
aiGeofencingDesc: "AI-powered geofencing and location safety analysis",

blockchainSafetyId: "Blockchain Safety ID",
enterLast4Digits: "Enter Last 4 Digits",
revealId: "Reveal ID",

cautionArea: "Unknown area - exercise caution",

humidity: "Humidity",
wind: "Wind",
        quickLinks: "Quick Links",
        home: "Home",
        safetyGuidelines: "Safety Guidelines",
        emergencyContacts: "Emergency Contacts",
        contactUs: "Contact Us",
        privacyPolicy: "Privacy Policy",
        terms: "Terms of Service",

        smartSafety: "Smart Safety System",
stopLiveTracking: "Stop Live Tracking",
gpsActive: "GPS Active",
demoMode: "Demo Mode",
safeZone: "Safe Zone",
cautionZone: "Caution Zone",
highRiskZone: "High Risk Zone",
initializingLocation: "Initializing location services...",
youAreHere: "You are here",
accuracy: "Accuracy",

        copyright:
          "© 2025 Safe-DAYS — Smart Tourist Safety System. All rights reserved.",

        madeWithLove:
          "Built with ❤️ and innovation to protect every traveler, everywhere.",

        india: "India",
emergencyNumber: "Emergency:",
touristHelpline: "Tourist Helpline:",

      },
    },

    hi: {
      translation: {
        selectRole: "अपनी भूमिका चुनें",
emailOrBlockchain: "ईमेल या ब्लॉकचेन आईडी",
enterEmailOrBlockchain: "ईमेल या ब्लॉकचेन आईडी दर्ज करें",
password: "पासवर्ड",
enterPassword: "अपना पासवर्ड दर्ज करें",
changeRole: "भूमिका बदलें",
noAccount: "क्या आपका खाता नहीं है?",
registerNow: "अभी पंजीकरण करें",
backToHome: "होम पर वापस जाएँ",
dashboard: "डैशबोर्ड",
        india: "भारत",
emergencyNumber: "आपातकालीन:",
touristHelpline: "पर्यटक हेल्पलाइन:",
locationCity: "मुंबई, महाराष्ट्र",
chatWelcome:
  "👋 स्वागत है! मैं आपका AI सहायक हूँ।\n\nआप किस बारे में जानना चाहते हैं?",
authenticating: "सत्यापित किया जा रहा है…",
touristSafetyDashboard: "पर्यटक सुरक्षा डैशबोर्ड",
back: "वापस",
realtimeSafetyMonitor: "रियल-टाइम सुरक्षा मॉनिटर",
aiGeofencingDesc: "AI आधारित जियोफेंसिंग और लोकेशन सुरक्षा विश्लेषण",

blockchainSafetyId: "ब्लॉकचेन सुरक्षा आईडी",
enterLast4Digits: "अंतिम 4 अंक दर्ज करें",
revealId: "आईडी दिखाएं",

cautionArea: "अज्ञात क्षेत्र - सावधानी बरतें",
staySafeAroundYou: "अपने आसपास सुरक्षित रहें",

locationPopupDesc:
  "SAFE DAYS आपकी लाइव लोकेशन का उपयोग करके पास के पुलिस स्टेशन, अस्पताल, पर्यटक सहायता केंद्र और रियल-टाइम सुरक्षा अलर्ट दिखाता है।",

enableLocation: "लोकेशन सक्षम करें",

maybeLater: "शायद बाद में",

humidity: "नमी",
wind: "हवा",
emergencySOS: "आपातकालीन SOS",
sendSOS: "SOS भेजें",
immediatePoliceAssistance: "तुरंत पुलिस सहायता",

realtimeSafety: "रियल-टाइम सुरक्षा मॉनिटर",
aiGeofencing: "AI आधारित जियोफेंसिंग और लोकेशन सुरक्षा विश्लेषण",
locationStatus: "लोकेशन स्थिति",
liveTracking: "लाइव ट्रैकिंग",
currentAreaSafety: "वर्तमान क्षेत्र की सुरक्षा",
unknownArea: "अज्ञात क्षेत्र - सावधानी बरतें",

startLiveTracking: "लाइव ट्रैकिंग शुरू करें",

reportIncident: "घटना की रिपोर्ट करें",
selectType: "प्रकार चुनें",
describeIncident: "क्या हुआ उसका विवरण लिखें...",
submitReport: "रिपोर्ट सबमिट करें",

nearbySafetyServices: "आस-पास की सुरक्षा सेवाएं",
policeStation: "पुलिस स्टेशन",
hospital: "अस्पताल",
touristHelpDesk: "पर्यटक सहायता केंद्र",

safetyAlerts: "सुरक्षा अलर्ट",
noActiveAlerts: "कोई सक्रिय अलर्ट नहीं",
theft: "चोरी",
harassment: "उत्पीड़न",
accident: "दुर्घटना",
suspiciousActivity: "संदिग्ध गतिविधि",
weatherNearby: "आस-पास का मौसम",
accountStatus: "खाता स्थिति",
verifiedTourist: "सत्यापित पर्यटक",

nearbyRestaurants: "आस-पास के रेस्टोरेंट",
basedOnYourLocation: "आपकी वर्तमान लोकेशन के आधार पर",
stopLiveTracking: "लाइव ट्रैकिंग बंद करें",
gpsActive: "GPS सक्रिय",
demoMode: "डेमो मोड",
safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावधानी क्षेत्र",
highRiskZone: "उच्च जोखिम क्षेत्र",
initializingLocation: "लोकेशन सेवाएं शुरू हो रही हैं...",
youAreHere: "आप यहाँ हैं",
accuracy: "सटीकता",
safetyAdvisory: "सुरक्षा सलाह",
stayAlert:
  "इस क्षेत्र में सावधानी बरतें। सतर्क रहें और सुनसान स्थानों से बचें।",

shareLocation: "लोकेशन साझा करें",
safeRoutes: "सुरक्षित मार्ग",
active: "सक्रिय",
off: "बंद",
chatWhatIsSite: "🤖 यह वेबसाइट क्या है?",
chatEmergency: "🚨 इमरजेंसी और SOS",
chatSafeZones: "🛡️ सुरक्षित क्षेत्र",
chatDashboards: "📊 डैशबोर्ड और भूमिकाएँ",
chatAskElse: "❓ कुछ और पूछें",
chatPlaceholder: "सुरक्षा या संस्कृति के बारे में पूछें...",
chatSend: "भेजें",
chatTitle: "AI सहायक",

touristDashboardDesc: "SOS, आकर्षण, सांस्कृतिक सामग्री",
policeDashboardDesc: "घटना निगरानी, आपातकालीन प्रतिक्रिया",

touristRoleDesc: "आपकी यात्रा, आपकी सुरक्षा",
policeRoleDesc: "घटनाओं और अलर्ट की निगरानी",
        appName: "पर्यटक सुरक्षा प्रणाली",
        features: "विशेषताएँ",
        dashboards: "डैशबोर्ड",
        login: "लॉगिन",
        logout: "लॉगआउट",
        hiUser: "नमस्ते",
safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावध क्षेत्र",
highRiskZone: "धोकादायक क्षेत्र",

lat: "अक्षांश",
lng: "रेखांश",

highRiskMove: "धोकादायक क्षेत्र. सुरक्षित ठिकाणी जा.",

        heroBadge: "AI + ब्लॉकचेन संचालित सुरक्षा प्रणाली",
        heroTitle1: "पर्यटक सुरक्षा और",
        heroTitle2: "घटना प्रतिक्रिया",
        heroSubtitle:
          "हमारे लोगों, परंपराओं और विरासत से प्रेरित नवाचार के माध्यम से हर यात्री की सुरक्षा सुनिश्चित करना।",

        emergencySOS: "आपातकालीन SOS",
        exploreFeatures: "विशेषताएँ देखें",
        checkSafeZone: "सुरक्षित क्षेत्र देखें",

        sosAlerts: "SOS अलर्ट",
        blockchainId: "ब्लॉकचेन आईडी",
        aiAssistant: "AI सहायक",

        coreFeatures: "मुख्य सुरक्षा विशेषताएँ",
        coreFeaturesDesc: "उन्नत तकनीक से यात्रा को सुरक्षित बनाना।",

        sosFeatureTitle: "SOS आपातकालीन अलर्ट",
        sosFeatureDesc: "GPS के साथ त्वरित आपातकालीन प्रतिक्रिया प्रणाली।",

        blockchainFeatureTitle: "ब्लॉकचेन सुरक्षा आईडी",
        blockchainFeatureDesc: "सुरक्षित डिजिटल पहचान प्रणाली।",

        heatmapFeatureTitle: "यात्रा सुरक्षा हीटमैप",
        heatmapFeatureDesc: "AI आधारित रियल-टाइम घटना मैपिंग।",

        multiroleFeatureTitle: "मल्टी-रोल डैशबोर्ड",
        multiroleFeatureDesc: "विभिन्न उपयोगकर्ताओं के लिए विशेष इंटरफेस।",

        roleDashboards: "भूमिका आधारित डैशबोर्ड",
        roleDashboardsDesc: "विभिन्न उपयोगकर्ताओं के लिए इंटरफेस",
        accessDashboard: "डैशबोर्ड खोलें",

        tourist: "पर्यटक",
        police: "पुलिस",
commandCenter: "कमांड सेंटर",
activeIncidents_one: "सक्रिय घटना",
activeIncidents_other: "सक्रिय घटनाएँ",

enterJurisdiction: "अपना क्षेत्र दर्ज करें",
enterCityOrStation: "अपना शहर या पुलिस स्टेशन दर्ज करें",
loadAlerts: "अलर्ट लोड करें",

liveEmergencyAlerts: "लाइव आपातकालीन अलर्ट",
noIncidents: "अभी तक कोई घटना नहीं",

emergencyAlert: "आपातकालीन अलर्ट",
noDescription: "कोई विवरण नहीं दिया गया",
unknownUser: "अज्ञात उपयोगकर्ता",
unknown: "अज्ञात",

call: "कॉल",
navigate: "नेविगेट करें",
        quickLinks: "त्वरित लिंक",
        home: "होम",
        safetyGuidelines: "सुरक्षा दिशानिर्देश",
        emergencyContacts: "आपातकालीन संपर्क",
        contactUs: "संपर्क करें",
        privacyPolicy: "गोपनीयता नीति",
        terms: "नियम और शर्तें",

        smartSafety: "स्मार्ट सुरक्षा प्रणाली",

        copyright:
          "© 2025 Safe-DAYS — स्मार्ट पर्यटक सुरक्षा प्रणाली। सर्वाधिकार सुरक्षित।",

        madeWithLove:
          "❤️ और नवाचार के साथ हर यात्री की सुरक्षा के लिए बनाया गया।",
      },
    },

    mr: {
      translation: {
        india: "भारत",
emergencyNumber: "आपत्कालीन:",
touristHelpline: "पर्यटक हेल्पलाईन:",
locationCity: "मुंबई, महाराष्ट्र",
chatWelcome:
  "👋 स्वागत आहे! मी तुमचा AI सहाय्यक आहे.\n\nतुम्हाला कशाबद्दल मदत हवी आहे?",
selectRole: "आपली भूमिका निवडा",
emailOrBlockchain: "ईमेल किंवा ब्लॉकचेन आयडी",
enterEmailOrBlockchain: "ईमेल किंवा ब्लॉकचेन आयडी टाका",
password: "पासवर्ड",
enterPassword: "तुमचा पासवर्ड टाका",
changeRole: "भूमिका बदला",
noAccount: "तुमचे खाते नाही का?",
registerNow: "आता नोंदणी करा",
backToHome: "मुख्यपृष्ठावर परत जा",
dashboard: "डॅशबोर्ड",
chatWhatIsSite: "🤖 ही वेबसाइट काय आहे?",
chatEmergency: "🚨 आपत्कालीन आणि SOS",
chatSafeZones: "🛡️ सुरक्षित क्षेत्र",
chatDashboards: "📊 डॅशबोर्ड आणि भूमिका",
chatAskElse: "❓ काहीतरी वेगळे विचारा",
chatPlaceholder: "सुरक्षा किंवा संस्कृतीबद्दल विचारा...",
chatSend: "पाठवा",
chatTitle: "AI सहाय्यक",
authenticating: "प्रमाणित केले जात आहे…",
touristDashboardDesc: "SOS, आकर्षणे, सांस्कृतिक माहिती",
policeDashboardDesc: "घटना निरीक्षण, आपत्कालीन प्रतिसाद",
touristRoleDesc: "तुमचा प्रवास, तुमची सुरक्षा",
policeRoleDesc: "घटना आणि अलर्ट निरीक्षण",
        appName: "पर्यटक सुरक्षा प्रणाली",
        features: "वैशिष्ट्ये",
        dashboards: "डॅशबोर्ड",
        login: "लॉगिन",
        logout: "लॉगआउट",
        hiUser: "नमस्कार",
staySafeAroundYou: "तुमच्या आसपास सुरक्षित रहा",

locationPopupDesc:
  "SAFE DAYS तुमची लाइव्ह लोकेशन वापरून जवळचे पोलीस स्टेशन, रुग्णालये, पर्यटक मदत केंद्र आणि रिअल-टाइम सुरक्षा अलर्ट दाखवते.",

enableLocation: "लोकेशन सुरू करा",

maybeLater: "नंतर",

        heroBadge: "AI + ब्लॉकचेन आधारित सुरक्षा प्रणाली",
        heroTitle1: "पर्यटक सुरक्षा आणि",
        heroTitle2: "घटना प्रतिसाद",
        heroSubtitle:
          "आपल्या लोक, परंपरा आणि वारशातून प्रेरित होऊन प्रत्येक प्रवाशाची सुरक्षितता सुनिश्चित करणे.",
safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावध क्षेत्र",
highRiskZone: "धोकादायक क्षेत्र",

lat: "अक्षांश",
lng: "रेखांश",

highRiskMove: "धोकादायक क्षेत्र. सुरक्षित ठिकाणी जा.",

        emergencySOS: "आपत्कालीन SOS",
        exploreFeatures: "वैशिष्ट्ये पहा",
        checkSafeZone: "सुरक्षित क्षेत्र तपासा",

        sosAlerts: "SOS अलर्ट",
        blockchainId: "ब्लॉकचेन आयडी",
        aiAssistant: "AI सहाय्यक",
touristSafetyDashboard: "पर्यटक सुरक्षा डॅशबोर्ड",
back: "मागे",

emergencySOS: "आपत्कालीन SOS",
sendSOS: "SOS पाठवा",
immediatePoliceAssistance: "तात्काळ पोलीस मदत",
realtimeSafetyMonitor: "रिअल-टाइम सुरक्षा मॉनिटर",
aiGeofencingDesc: "AI आधारित जिओफेन्सिंग आणि लोकेशन सुरक्षा विश्लेषण",

blockchainSafetyId: "ब्लॉकचेन सुरक्षा आयडी",
enterLast4Digits: "शेवटचे 4 अंक टाका",
revealId: "आयडी दाखवा",

cautionArea: "अज्ञात क्षेत्र - सावधगिरी बाळगा",

humidity: "आर्द्रता",
wind: "वारा",
realtimeSafety: "रिअल-टाइम सुरक्षा मॉनिटर",
aiGeofencing: "AI आधारित जिओफेन्सिंग आणि लोकेशन सुरक्षा विश्लेषण",
locationStatus: "लोकेशन स्थिती",
liveTracking: "लाइव्ह ट्रॅकिंग",
currentAreaSafety: "सध्याच्या क्षेत्राची सुरक्षा",
unknownArea: "अज्ञात क्षेत्र - सावधगिरी बाळगा",

startLiveTracking: "लाइव्ह ट्रॅकिंग सुरू करा",

reportIncident: "घटनेची नोंद करा",
selectType: "प्रकार निवडा",
describeIncident: "काय घडले ते लिहा...",
submitReport: "रिपोर्ट सबमिट करा",

nearbySafetyServices: "जवळील सुरक्षा सेवा",
policeStation: "पोलीस स्टेशन",
hospital: "रुग्णालय",
touristHelpDesk: "पर्यटक मदत केंद्र",

safetyAlerts: "सुरक्षा अलर्ट",
noActiveAlerts: "कोणतेही सक्रिय अलर्ट नाहीत",

weatherNearby: "जवळील हवामान",
accountStatus: "खाते स्थिती",
verifiedTourist: "सत्यापित पर्यटक",

nearbyRestaurants: "जवळील रेस्टॉरंट्स",
basedOnYourLocation: "तुमच्या सध्याच्या लोकेशनवर आधारित",
stopLiveTracking: "लाइव्ह ट्रॅकिंग थांबवा",
gpsActive: "GPS सक्रिय",
demoMode: "डेमो मोड",
safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावध क्षेत्र",
highRiskZone: "उच्च जोखीम क्षेत्र",
initializingLocation: "लोकेशन सेवा सुरू होत आहे...",
youAreHere: "तुम्ही येथे आहात",
accuracy: "अचूकता",
safetyAdvisory: "सुरक्षा सूचना",
stayAlert:
  "या भागात सावधगिरी बाळगा. सतर्क रहा आणि एकांत भाग टाळा.",
theft: "चोरी",
harassment: "छळ",
accident: "अपघात",
suspiciousActivity: "संशयास्पद हालचाल",
shareLocation: "लोकेशन शेअर करा",
safeRoutes: "सुरक्षित मार्ग",
active: "सक्रिय",
off: "बंद",
        coreFeatures: "मुख्य सुरक्षा वैशिष्ट्ये",
        coreFeaturesDesc: "प्रगत तंत्रज्ञान वापरून प्रवास अधिक सुरक्षित करणे.",

        sosFeatureTitle: "SOS आपत्कालीन अलर्ट",
        sosFeatureDesc: "GPS लोकेशनसह त्वरित आपत्कालीन प्रतिसाद प्रणाली.",

        blockchainFeatureTitle: "ब्लॉकचेन सुरक्षा आयडी",
        blockchainFeatureDesc: "सुरक्षित डिजिटल ओळख प्रणाली.",

        heatmapFeatureTitle: "प्रवास सुरक्षा हीटमॅप",
        heatmapFeatureDesc: "AI आधारित रिअल-टाइम घटना नकाशा.",

        multiroleFeatureTitle: "मल्टी-रोल डॅशबोर्ड",
        multiroleFeatureDesc: "विविध वापरकर्त्यांसाठी विशेष इंटरफेस.",

        roleDashboards: "भूमिका आधारित डॅशबोर्ड",
        roleDashboardsDesc: "विविध वापरकर्त्यांसाठी इंटरफेस",
        accessDashboard: "डॅशबोर्ड उघडा",
commandCenter: "कमांड सेंटर",
activeIncidents_one: "सक्रिय घटना",
activeIncidents_other: "सक्रिय घटना",

enterJurisdiction: "आपला विभाग प्रविष्ट करा",
enterCityOrStation: "आपले शहर किंवा पोलीस स्टेशन प्रविष्ट करा",
loadAlerts: "अलर्ट लोड करा",

liveEmergencyAlerts: "थेट आपत्कालीन अलर्ट",
noIncidents: "अद्याप कोणतीही घटना नाही",

emergencyAlert: "आपत्कालीन अलर्ट",
noDescription: "वर्णन उपलब्ध नाही",
unknownUser: "अज्ञात वापरकर्ता",
unknown: "अज्ञात",

call: "कॉल",
navigate: "नेव्हिगेट करा",
        tourist: "पर्यटक",
        police: "पोलीस",

        quickLinks: "द्रुत दुवे",
        home: "मुख्यपृष्ठ",
        safetyGuidelines: "सुरक्षा मार्गदर्शक",
        emergencyContacts: "आपत्कालीन संपर्क",
        contactUs: "संपर्क करा",
        privacyPolicy: "गोपनीयता धोरण",
        terms: "अटी व शर्ती",

        smartSafety: "स्मार्ट सुरक्षा प्रणाली",

        copyright:
          "© 2025 Safe-DAYS — स्मार्ट पर्यटक सुरक्षा प्रणाली. सर्व हक्क राखीव.",

        madeWithLove:
          "❤️ आणि नवोपक्रमासह प्रत्येक प्रवाशाच्या सुरक्षेसाठी तयार केले.",
      },
    },
  },

  lng: localStorage.getItem("lang") || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

i18n.on("languageChanged", (lng) => {
  localStorage.setItem("lang", lng);
});

export default i18n;

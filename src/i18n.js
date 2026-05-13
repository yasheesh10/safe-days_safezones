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
exploreSafeDestinations: "Explore Safe Destinations",
discoverCities:
  "Discover cities with real-time safety insights, alerts, and travel intelligence.",

mumbai: "Mumbai",
goa: "Goa",
delhi: "Delhi",
northeast: "Northeast",

highSafety: "High Safety",
moderateSafety: "Moderate Safety",
watchZones: "Watch Zones",
safeScenic: "Safe & Scenic",

indiaProtected: "India, Protected.",

aiSafeZones: "AI Safe Zones",
aiSafeZonesDesc:
  "Real-time intelligence helps tourists avoid unsafe areas instantly.",

culturalDiscovery: "Cultural Discovery",
culturalDiscoveryDesc:
  "Explore monuments, traditions, dance, food, and authentic experiences safely.",

dashboardText: "Dashboard",
createAccount: "Create Account",

registerSafetyEcosystem:
  "Register to access the safety ecosystem",

fullName: "Full Name",

enterFullName: "Enter your full name",

emailAddress: "Email Address",

enterEmailAddress:
  "Enter your email address",

confirmPassword: "Confirm Password",

confirmPasswordPlaceholder:
  "Confirm password",

registerBlockchain:
  "Register with Blockchain (MetaMask)",

creatingAccount: "Creating Account...",

register: "Register",

alreadyAccount:
  "Already have an account?",

loginHere: "Login here",

backToHomepage:
  "Back to Homepage",

yourBlockchainId:
  "Your Blockchain ID",

blockchainLinked:
  "This blockchain wallet address is securely linked to your SAFE DAYS identity and stored on Polygon blockchain.",

copied: "Copied!",

copyId: "Copy ID",

goToLogin: "Go To Login",
sosAlertsLabel: "SOS Alerts",
safeZonesLabel: "Safe Zones",
aiAssistantLabel: "AI Assistant",

realTimeAlertsDesc:
  "Real-time alerts, AI-powered safety intelligence, and secure travel experiences across every destination.",
nearbyRestaurants: "Nearby Restaurants",
basedOnYourLocation: "Based on your current location",
safeDaysAiTravel: "SAFE DAYS • AI TRAVEL SAFETY",
privacy: "Privacy",
policy: "Policy",

privacySubtitle:
  "Learn how SAFE DAYS collects, protects, and securely manages your information while delivering safer travel experiences.",

lastUpdated: "Last updated: September 2025",

infoCollect: "Information We Collect",

fullNameEmail: "Full name and email address",
trustedContacts: "Trusted emergency contact details",
liveLocationData:
  "Live location data for SOS & safety services",
deviceBrowser: "Device and browser information",
platformLogs: "Platform usage and interaction logs",

howUseInfo: "How We Use Your Information",

provideSOS: "Provide emergency SOS services",
enableMonitoring:
  "Enable live safety monitoring and alerts",
manageAccounts: "Manage user accounts securely",
improvePlatform:
  "Improve platform performance and reliability",
travelNotifications:
  "Send important travel safety notifications",

dataSecurity: "Data Storage & Security",

secureInfrastructure:
  "SAFE DAYS uses secure cloud infrastructure, encryption, and controlled access systems to protect user information.",

sensitiveLocation:
  "Sensitive location data is used only during active safety monitoring and emergency response scenarios.",

dataSharing: "Data Sharing",

noSellData:
  "SAFE DAYS does not sell or distribute personal user data.",

shareEmergency:
  "Information may only be shared with emergency responders, trusted contacts, or legal authorities when required during active emergency situations.",

userRights: "User Rights",

accessInfo: "Access your personal information",
dataCorrection: "Request data corrections",
deleteInfo:
  "Request deletion of stored information",
withdrawConsent:
  "Withdraw consent for optional services",

privacySupport:
  "For privacy-related questions or support:",

emergencyHelpline: "Emergency Helpline:",

privacyCopyright:
  "© 2026 SAFE DAYS. All rights reserved.",
emergencySosTitle: "Emergency SOS",

northeastLabel: "Northeast",

moderateSafety: "Moderate Safety",

watchZones: "Watch Zones",

safeScenic: "Safe & Scenic",

indiaProtected: "India, Protected.",

emergencyProtectionDesc:
  "One-tap emergency protection connected to trusted contacts and authorities.",
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
legalDocumentation: "Legal Documentation",

termsOf: "Terms of",
service: "Service",
email: "Email",

enterEmail: "Enter email",

password: "Password",

enterPassword: "Enter password",

loggingIn: "Logging in...",

loginNormally: "Login Normally",

connectingWallet: "Connecting Wallet...",

loginWithMetaMask: "Login with MetaMask",
termsSubtitle:
  "These terms govern the use of SAFE DAYS and outline responsibilities, safety policies, and platform usage conditions.",

termsUpdated: "Last updated: February 2026",

contents: "Contents",

acceptanceTerms: "Acceptance of Terms",

acceptanceDesc:
  "By accessing or using SAFE DAYS, you agree to comply with these Terms of Service. If you do not agree, please discontinue use of the platform.",

userResponsibilities: "User Responsibilities",

accurateInfo: "Provide accurate account information",
secureCredentials: "Keep login credentials secure",
responsibleSOS: "Use SOS features responsibly",
followSafety: "Follow platform safety instructions",

prohibitedActivities: "Prohibited Activities",

falseReports: "False emergency reports",
unauthorizedAccess: "Unauthorized system access",
maliciousActivity:
  "Malicious activity or hacking attempts",
harassmentMisuse:
  "Harassment, abuse, or misuse of services",

emergencyServices: "Emergency Services",

emergencyDesc:
  "SOS features may share your location with emergency responders and trusted contacts during active incidents. SAFE DAYS assists emergency coordination but does not guarantee response times or outcomes.",

liabilityDisclaimers: "Liability & Disclaimers",
realtimeSafetyMonitor: "Realtime Safety Monitor",

aiGeofencingMonitoring:
  "AI-powered geofencing safety monitoring",

latitude: "Latitude",
longitude: "Longitude",

currentAreaSafety: "Current Area Safety",

liveGeofencingAnalysis:
  "Live AI geofencing analysis",

safeZone: "Safe Zone",
cautionZone: "Caution Zone",
dangerZone: "Danger Zone",

youAreHere: "You are here",

startTracking: "Start Tracking",
stopTracking: "Stop Tracking",

shareLocation: "Share Location",

safeRoutes: "Safe Routes",
liabilityDesc:
  'SAFE DAYS is provided "as is" without guarantees of uninterrupted service. We are not responsible for losses, damages, or disruptions caused by external factors or emergency circumstances.',

termination: "Termination",

terminationDesc:
  "We reserve the right to suspend or terminate accounts that violate platform policies or misuse emergency services.",

contactInformation: "Contact Information",

emergencyHotline: "Emergency Hotline:",

supportAvailability:
  "Support Availability: 24/7 Emergency Assistance",
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


        appName: "SAFE DAYS",
        features: "Features",
        dashboards: "Dashboards",
        login: "Login",
        logout: "Logout",
        hiUser: "Hi",
staySafeAroundYou: "Stay Safe Around You",
protected: "Protected.",
locationPopupDesc:
  "SAFE DAYS uses your live location to show nearby police stations, hospitals, tourist help desks, and real-time safety alerts.",

enableLocation: "Enable Location",

maybeLater: "Maybe Later",

        heroBadge: "AI + Blockchain Powered Safety System",
        heroTitle1: "Tourist Safety &",
        heroTitle2: "Incident Response",
        heroSubtitle:
          "AI-powered tourist safety platform for secure travel across India.",

        emergencySOS: "Emergency SOS",
        exploreFeatures: "Explore Features",
        checkSafeZone: "Check Safe Zone",
        exploreIndia: "Explore India",
safely: "Safely.",

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

        smartSafety: "AI Tourist Safety Platform",
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
          "© 2026 Safe-DAYS. All rights reserved.",

        madeWithLove:
  "Secure travel assistance powered by AI and real-time safety intelligence.",

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
createAccount: "खाता बनाएं",

registerSafetyEcosystem:
  "सुरक्षा प्रणाली तक पहुँचने के लिए पंजीकरण करें",

fullName: "पूरा नाम",

enterFullName:
  "अपना पूरा नाम दर्ज करें",

emailAddress: "ईमेल पता",

enterEmailAddress:
  "अपना ईमेल पता दर्ज करें",

confirmPassword:
  "पासवर्ड की पुष्टि करें",

confirmPasswordPlaceholder:
  "पासवर्ड की पुष्टि करें",

registerBlockchain:
  "ब्लॉकचेन (MetaMask) के साथ पंजीकरण करें",

creatingAccount:
  "खाता बनाया जा रहा है...",

register: "पंजीकरण करें",

alreadyAccount:
  "क्या आपके पास पहले से खाता है?",

loginHere:
  "यहाँ लॉगिन करें",

backToHomepage:
  "होमपेज पर वापस जाएँ",

yourBlockchainId:
  "आपकी ब्लॉकचेन आईडी",

blockchainLinked:
  "यह ब्लॉकचेन वॉलेट पता सुरक्षित रूप से आपकी SAFE DAYS पहचान से जुड़ा हुआ है।",

copied: "कॉपी किया गया!",

copyId: "आईडी कॉपी करें",

goToLogin:
  "लॉगिन पर जाएँ",
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
exploreSafeDestinations: "सुरक्षित स्थानों का अन्वेषण करें",
safeDaysAiTravel: "SAFE DAYS • AI यात्रा सुरक्षा",

emergencySosTitle: "आपातकालीन SOS",

northeastLabel: "पूर्वोत्तर",

moderateSafety: "मध्यम सुरक्षा",

watchZones: "सावधानी क्षेत्र",

safeScenic: "सुरक्षित और सुंदर",

indiaProtected: "भारत, सुरक्षित।",
protected: "सुरक्षित।",
emergencyProtectionDesc:
  "विश्वसनीय संपर्कों और अधिकारियों से जुड़ी एक-टैप आपातकालीन सुरक्षा।",
discoverCities:
  "रियल-टाइम सुरक्षा जानकारी, अलर्ट और यात्रा इंटेलिजेंस के साथ शहरों की खोज करें।",

mumbai: "मुंबई",
goa: "गोवा",
delhi: "दिल्ली",
northeast: "पूर्वोत्तर",

highSafety: "उच्च सुरक्षा",
moderateSafety: "मध्यम सुरक्षा",
watchZones: "सावधानी क्षेत्र",
safeScenic: "सुरक्षित और सुंदर",

indiaProtected: "भारत, सुरक्षित।",

aiSafeZones: "AI सुरक्षित क्षेत्र",
aiSafeZonesDesc:
  "रियल-टाइम इंटेलिजेंस पर्यटकों को असुरक्षित क्षेत्रों से बचने में मदद करता है।",

culturalDiscovery: "सांस्कृतिक खोज",
culturalDiscoveryDesc:
  "स्मारकों, परंपराओं, नृत्य, भोजन और प्रामाणिक अनुभवों का सुरक्षित अन्वेषण करें।",

dashboardText: "डैशबोर्ड",

sosAlertsLabel: "SOS अलर्ट",
safeZonesLabel: "सुरक्षित क्षेत्र",
aiAssistantLabel: "AI सहायक",

realTimeAlertsDesc:
  "रियल-टाइम अलर्ट, AI आधारित सुरक्षा और सुरक्षित यात्रा अनुभव।",
safetyAlerts: "सुरक्षा अलर्ट",
noActiveAlerts: "कोई सक्रिय अलर्ट नहीं",
theft: "चोरी",
harassment: "उत्पीड़न",
accident: "दुर्घटना",
suspiciousActivity: "संदिग्ध गतिविधि",
weatherNearby: "आस-पास का मौसम",
accountStatus: "खाता स्थिति",
verifiedTourist: "सत्यापित पर्यटक",
privacy: "गोपनीयता",
policy: "नीति",

privacySubtitle:
  "जानें कि SAFE DAYS आपकी जानकारी को कैसे सुरक्षित रूप से एकत्रित और प्रबंधित करता है।",

lastUpdated: "अंतिम अपडेट: सितंबर 2025",

infoCollect: "हम कौन सी जानकारी एकत्र करते हैं",

fullNameEmail: "पूरा नाम और ईमेल पता",
trustedContacts: "विश्वसनीय आपातकालीन संपर्क जानकारी",
liveLocationData:
  "SOS और सुरक्षा सेवाओं के लिए लाइव लोकेशन डेटा",
deviceBrowser: "डिवाइस और ब्राउज़र जानकारी",
platformLogs: "प्लेटफ़ॉर्म उपयोग और गतिविधि लॉग",

howUseInfo: "हम आपकी जानकारी का उपयोग कैसे करते हैं",

provideSOS: "आपातकालीन SOS सेवाएं प्रदान करना",
enableMonitoring:
  "लाइव सुरक्षा निगरानी और अलर्ट सक्षम करना",
manageAccounts:
  "उपयोगकर्ता खातों को सुरक्षित रूप से प्रबंधित करना",
improvePlatform:
  "प्लेटफ़ॉर्म प्रदर्शन और विश्वसनीयता में सुधार करना",
travelNotifications:
  "महत्वपूर्ण यात्रा सुरक्षा सूचनाएं भेजना",

dataSecurity: "डेटा संग्रहण और सुरक्षा",

secureInfrastructure:
  "SAFE DAYS उपयोगकर्ता जानकारी की सुरक्षा के लिए सुरक्षित क्लाउड इंफ्रास्ट्रक्चर, एन्क्रिप्शन और नियंत्रित एक्सेस सिस्टम का उपयोग करता है।",

sensitiveLocation:
  "संवेदनशील लोकेशन डेटा का उपयोग केवल सक्रिय सुरक्षा निगरानी और आपातकालीन स्थितियों के दौरान किया जाता है।",

dataSharing: "डेटा साझा करना",

noSellData:
  "SAFE DAYS व्यक्तिगत उपयोगकर्ता डेटा को बेचता या वितरित नहीं करता।",

shareEmergency:
  "जानकारी केवल आपातकालीन सेवाओं, विश्वसनीय संपर्कों या कानूनी अधिकारियों के साथ साझा की जा सकती है।",

userRights: "उपयोगकर्ता अधिकार",
legalDocumentation: "कानूनी दस्तावेज़",

termsOf: "सेवा की",
service: "शर्तें",

termsSubtitle:
  "ये शर्तें SAFE DAYS के उपयोग, जिम्मेदारियों, सुरक्षा नीतियों और प्लेटफ़ॉर्म उपयोग की शर्तों को नियंत्रित करती हैं।",

termsUpdated: "अंतिम अपडेट: फरवरी 2026",

contents: "सामग्री",

acceptanceTerms: "शर्तों की स्वीकृति",

acceptanceDesc:
  "SAFE DAYS का उपयोग करके आप इन सेवा शर्तों का पालन करने के लिए सहमत होते हैं। यदि आप सहमत नहीं हैं, तो कृपया प्लेटफ़ॉर्म का उपयोग बंद करें।",

userResponsibilities: "उपयोगकर्ता जिम्मेदारियाँ",

accurateInfo: "सही खाता जानकारी प्रदान करें",
secureCredentials: "लॉगिन जानकारी सुरक्षित रखें",
responsibleSOS: "SOS सुविधाओं का जिम्मेदारी से उपयोग करें",
followSafety: "प्लेटफ़ॉर्म सुरक्षा निर्देशों का पालन करें",

prohibitedActivities: "प्रतिबंधित गतिविधियाँ",

falseReports: "झूठी आपातकालीन रिपोर्ट",
unauthorizedAccess: "अनधिकृत सिस्टम एक्सेस",
maliciousActivity:
  "दुर्भावनापूर्ण गतिविधि या हैकिंग प्रयास",
harassmentMisuse:
  "उत्पीड़न, दुरुपयोग या सेवाओं का गलत उपयोग",

emergencyServices: "आपातकालीन सेवाएँ",

emergencyDesc:
  "SOS सुविधाएँ सक्रिय घटनाओं के दौरान आपकी लोकेशन आपातकालीन सेवाओं और विश्वसनीय संपर्कों के साथ साझा कर सकती हैं।",

liabilityDisclaimers: "दायित्व और अस्वीकरण",

liabilityDesc:
  'SAFE DAYS "जैसा है" आधार पर प्रदान किया जाता है। हम बाहरी कारणों या आपातकालीन परिस्थितियों से होने वाले नुकसान के लिए जिम्मेदार नहीं हैं।',

termination: "समाप्ति",

terminationDesc:
  "हम उन खातों को निलंबित या समाप्त करने का अधिकार सुरक्षित रखते हैं जो प्लेटफ़ॉर्म नीतियों का उल्लंघन करते हैं।",

contactInformation: "संपर्क जानकारी",

emergencyHotline: "आपातकालीन हेल्पलाइन:",

supportAvailability:
  "सहायता उपलब्धता: 24/7 आपातकालीन सहायता",
accessInfo: "अपनी व्यक्तिगत जानकारी देखें",
dataCorrection: "डेटा सुधार का अनुरोध करें",
deleteInfo:
  "संग्रहीत जानकारी हटाने का अनुरोध करें",
withdrawConsent:
  "वैकल्पिक सेवाओं के लिए सहमति वापस लें",

privacySupport:
  "गोपनीयता संबंधी प्रश्नों या सहायता के लिए:",

emergencyHelpline: "आपातकालीन हेल्पलाइन:",

privacyCopyright:
  "© 2026 SAFE DAYS. सर्वाधिकार सुरक्षित।",
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
        exploreIndia: "भारत को खोजें",
safely: "सुरक्षित रूप से।",

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
realtimeSafetyMonitor: "रीयलटाइम सुरक्षा मॉनिटर",

aiGeofencingMonitoring:
  "AI आधारित जियोफेंसिंग सुरक्षा मॉनिटरिंग",

latitude: "अक्षांश",
longitude: "देशांतर",

currentAreaSafety: "वर्तमान क्षेत्र सुरक्षा",

liveGeofencingAnalysis:
  "लाइव AI जियोफेंसिंग विश्लेषण",

safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावधानी क्षेत्र",
dangerZone: "खतरा क्षेत्र",

youAreHere: "आप यहाँ हैं",

startTracking: "ट्रैकिंग शुरू करें",
stopTracking: "ट्रैकिंग बंद करें",

shareLocation: "लोकेशन साझा करें",

safeRoutes: "सुरक्षित मार्ग",
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
email: "ईमेल",

enterEmail: "ईमेल दर्ज करें",

password: "पासवर्ड",

enterPassword: "पासवर्ड दर्ज करें",

loggingIn: "लॉगिन हो रहा है...",

loginNormally: "सामान्य लॉगिन",

connectingWallet: "वॉलेट कनेक्ट हो रहा है...",

loginWithMetaMask: "MetaMask से लॉगिन करें",
        smartSafety: "AI आधारित पर्यटक सुरक्षा मंच",

        copyright:
          "© 2025 Safe-DAYS — स्मार्ट पर्यटक सुरक्षा प्रणाली। सर्वाधिकार सुरक्षित।",

        madeWithLove:
          "AI और रियल-टाइम सुरक्षा तकनीक द्वारा संचालित सुरक्षित यात्रा सहायता।",
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
        exploreIndia: "भारत एक्सप्लोर करा",
safely: "सुरक्षितपणे.",

        sosAlerts: "SOS अलर्ट",
        blockchainId: "ब्लॉकचेन आयडी",
        aiAssistant: "AI सहाय्यक",
touristSafetyDashboard: "पर्यटक सुरक्षा डॅशबोर्ड",
back: "मागे",
exploreSafeDestinations: "सुरक्षित ठिकाणे एक्सप्लोर करा",

discoverCities:
  "रिअल-टाइम सुरक्षा माहिती, अलर्ट आणि प्रवास इंटेलिजन्ससह शहरांचा शोध घ्या.",

mumbai: "मुंबई",
goa: "गोवा",
delhi: "दिल्ली",
northeast: "ईशान्य भारत",

highSafety: "उच्च सुरक्षा",
moderateSafety: "मध्यम सुरक्षा",
watchZones: "सावध क्षेत्र",
safeScenic: "सुरक्षित आणि निसर्गरम्य",

indiaProtected: "भारत, सुरक्षित.",

aiSafeZones: "AI सुरक्षित क्षेत्र",
aiSafeZonesDesc:
  "रिअल-टाइम इंटेलिजन्स पर्यटकांना असुरक्षित क्षेत्र टाळण्यास मदत करते.",

culturalDiscovery: "सांस्कृतिक शोध",
culturalDiscoveryDesc:
  "स्मारके, परंपरा, नृत्य, खाद्यपदार्थ आणि अस्सल अनुभव सुरक्षितपणे अनुभवा.",

dashboardText: "डॅशबोर्ड",

sosAlertsLabel: "SOS अलर्ट",
safeZonesLabel: "सुरक्षित क्षेत्र",
aiAssistantLabel: "AI सहाय्यक",

realTimeAlertsDesc:
  "रिअल-टाइम अलर्ट, AI आधारित सुरक्षा आणि सुरक्षित प्रवास अनुभव.",
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
protected: "सुरक्षित.",
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
privacy: "गोपनीयता",
policy: "धोरण",

privacySubtitle:
  "SAFE DAYS तुमची माहिती कशी सुरक्षितपणे गोळा आणि व्यवस्थापित करते ते जाणून घ्या.",

lastUpdated: "शेवटचे अपडेट: सप्टेंबर 2025",

infoCollect: "आम्ही कोणती माहिती गोळा करतो",

fullNameEmail: "पूर्ण नाव आणि ईमेल पत्ता",
trustedContacts: "विश्वासू आपत्कालीन संपर्क माहिती",
liveLocationData:
  "SOS आणि सुरक्षा सेवांसाठी लाइव्ह लोकेशन डेटा",
deviceBrowser: "डिव्हाइस आणि ब्राउझर माहिती",
platformLogs: "प्लॅटफॉर्म वापर आणि क्रियाकलाप लॉग",

howUseInfo: "आम्ही तुमची माहिती कशी वापरतो",
legalDocumentation: "कायदेशीर दस्तऐवज",

termsOf: "सेवेच्या",
service: "अटी",

termsSubtitle:
  "या अटी SAFE DAYS चा वापर, जबाबदाऱ्या, सुरक्षा धोरणे आणि प्लॅटफॉर्म वापराच्या अटी स्पष्ट करतात.",

termsUpdated: "शेवटचे अपडेट: फेब्रुवारी 2026",

contents: "माहिती",

acceptanceTerms: "अटींची स्वीकृती",

acceptanceDesc:
  "SAFE DAYS वापरून तुम्ही या सेवा अटींचे पालन करण्यास सहमत आहात. जर तुम्ही सहमत नसाल तर कृपया प्लॅटफॉर्मचा वापर थांबवा.",

userResponsibilities: "वापरकर्त्यांच्या जबाबदाऱ्या",

accurateInfo: "अचूक खाते माहिती द्या",
secureCredentials: "लॉगिन माहिती सुरक्षित ठेवा",
responsibleSOS: "SOS सुविधांचा जबाबदारीने वापर करा",
followSafety: "प्लॅटफॉर्म सुरक्षा सूचनांचे पालन करा",

prohibitedActivities: "प्रतिबंधित क्रियाकलाप",
email: "ईमेल",

enterEmail: "ईमेल प्रविष्ट करा",

password: "पासवर्ड",

enterPassword: "पासवर्ड प्रविष्ट करा",

loggingIn: "लॉगिन होत आहे...",

loginNormally: "सामान्य लॉगिन",

connectingWallet: "वॉलेट कनेक्ट होत आहे...",
createAccount:
  "खाते तयार करा",

registerSafetyEcosystem:
  "सुरक्षा प्रणालीमध्ये प्रवेशासाठी नोंदणी करा",

fullName: "पूर्ण नाव",

enterFullName:
  "तुमचे पूर्ण नाव प्रविष्ट करा",

emailAddress:
  "ईमेल पत्ता",

enterEmailAddress:
  "तुमचा ईमेल पत्ता प्रविष्ट करा",

confirmPassword:
  "पासवर्डची पुष्टी करा",

confirmPasswordPlaceholder:
  "पासवर्डची पुष्टी करा",

registerBlockchain:
  "ब्लॉकचेन (MetaMask) सह नोंदणी करा",

creatingAccount:
  "खाते तयार होत आहे...",

register: "नोंदणी करा",

alreadyAccount:
  "आधीच खाते आहे का?",

loginHere:
  "येथे लॉगिन करा",

backToHomepage:
  "मुख्यपृष्ठावर परत जा",

yourBlockchainId:
  "तुमची ब्लॉकचेन आयडी",

blockchainLinked:
  "हा ब्लॉकचेन वॉलेट पत्ता सुरक्षितपणे तुमच्या SAFE DAYS ओळखीशी जोडलेला आहे.",

copied: "कॉपी झाले!",

copyId: "आयडी कॉपी करा",

goToLogin:
  "लॉगिनकडे जा",
loginWithMetaMask: "MetaMask सह लॉगिन करा",
falseReports: "खोटे आपत्कालीन अहवाल",
unauthorizedAccess: "अनधिकृत सिस्टम प्रवेश",
maliciousActivity:
  "दुर्भावनापूर्ण क्रिया किंवा हॅकिंग प्रयत्न",
harassmentMisuse:
  "छळ, गैरवापर किंवा सेवांचा चुकीचा वापर",

emergencyServices: "आपत्कालीन सेवा",

emergencyDesc:
  "SOS सुविधा सक्रिय घटनांदरम्यान तुमची लोकेशन आपत्कालीन सेवांशी आणि विश्वासू संपर्कांशी शेअर करू शकतात.",

liabilityDisclaimers: "जबाबदारी आणि अस्वीकरण",

liabilityDesc:
  'SAFE DAYS "जैसे आहे" तत्त्वावर प्रदान केले जाते. बाह्य कारणे किंवा आपत्कालीन परिस्थितींमुळे झालेल्या नुकसानीसाठी आम्ही जबाबदार नाही.',

termination: "समाप्ती",
realtimeSafetyMonitor: "रिअलटाइम सुरक्षा मॉनिटर",

aiGeofencingMonitoring:
  "AI आधारित जिओफेन्सिंग सुरक्षा मॉनिटरिंग",

latitude: "अक्षांश",
longitude: "रेखांश",

currentAreaSafety: "सध्याची क्षेत्र सुरक्षा",

liveGeofencingAnalysis:
  "लाइव्ह AI जिओफेन्सिंग विश्लेषण",

safeZone: "सुरक्षित क्षेत्र",
cautionZone: "सावध क्षेत्र",
dangerZone: "धोका क्षेत्र",

youAreHere: "तुम्ही येथे आहात",

startTracking: "ट्रॅकिंग सुरू करा",
stopTracking: "ट्रॅकिंग थांबवा",

shareLocation: "लोकेशन शेअर करा",

safeRoutes: "सुरक्षित मार्ग",
terminationDesc:
  "प्लॅटफॉर्म धोरणांचे उल्लंघन करणारी खाती निलंबित किंवा समाप्त करण्याचा आम्हाला अधिकार आहे.",

contactInformation: "संपर्क माहिती",

emergencyHotline: "आपत्कालीन हेल्पलाईन:",

supportAvailability:
  "सपोर्ट उपलब्धता: 24/7 आपत्कालीन मदत",
provideSOS:
  "आपत्कालीन SOS सेवा प्रदान करणे",
enableMonitoring:
  "लाइव्ह सुरक्षा निरीक्षण आणि अलर्ट सक्षम करणे",
manageAccounts:
  "वापरकर्ता खाती सुरक्षितपणे व्यवस्थापित करणे",
improvePlatform:
  "प्लॅटफॉर्म कार्यक्षमता आणि विश्वासार्हता सुधारणे",
travelNotifications:
  "महत्त्वाच्या प्रवास सुरक्षा सूचना पाठवणे",

dataSecurity: "डेटा संचयन आणि सुरक्षा",

secureInfrastructure:
  "SAFE DAYS वापरकर्त्यांची माहिती सुरक्षित ठेवण्यासाठी सुरक्षित क्लाउड इन्फ्रास्ट्रक्चर, एन्क्रिप्शन आणि नियंत्रित प्रवेश प्रणाली वापरते.",

sensitiveLocation:
  "संवेदनशील लोकेशन डेटा फक्त सक्रिय सुरक्षा निरीक्षण आणि आपत्कालीन परिस्थितीत वापरला जातो.",

dataSharing: "डेटा शेअरिंग",

noSellData:
  "SAFE DAYS वैयक्तिक वापरकर्ता डेटा विकत नाही किंवा वितरित करत नाही.",

shareEmergency:
  "माहिती फक्त आपत्कालीन सेवा, विश्वासू संपर्क किंवा कायदेशीर अधिकाऱ्यांशी शेअर केली जाऊ शकते.",

userRights: "वापरकर्ता हक्क",

accessInfo: "तुमची वैयक्तिक माहिती पाहा",
dataCorrection: "डेटा दुरुस्तीची विनंती करा",
deleteInfo:
  "संचयित माहिती हटविण्याची विनंती करा",
withdrawConsent:
  "पर्यायी सेवांसाठी संमती मागे घ्या",

privacySupport:
  "गोपनीयतेसंबंधित प्रश्न किंवा मदतीसाठी:",

emergencyHelpline: "आपत्कालीन हेल्पलाईन:",

privacyCopyright:
  "© 2026 SAFE DAYS. सर्व हक्क राखीव.",
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
safeDaysAiTravel: "SAFE DAYS • AI प्रवास सुरक्षा",

emergencySosTitle: "आपत्कालीन SOS",

northeastLabel: "ईशान्य भारत",

moderateSafety: "मध्यम सुरक्षा",

watchZones: "सावध क्षेत्र",

safeScenic: "सुरक्षित आणि निसर्गरम्य",

indiaProtected: "भारत, सुरक्षित.",

emergencyProtectionDesc:
  "विश्वासू संपर्क आणि अधिकाऱ्यांशी जोडलेले वन-टॅप आपत्कालीन संरक्षण.",
        quickLinks: "द्रुत दुवे",
        home: "मुख्यपृष्ठ",
        safetyGuidelines: "सुरक्षा मार्गदर्शक",
        emergencyContacts: "आपत्कालीन संपर्क",
        contactUs: "संपर्क करा",
        privacyPolicy: "गोपनीयता धोरण",
        terms: "अटी व शर्ती",

        smartSafety: "AI आधारित पर्यटक सुरक्षा प्लॅटफॉर्म",

        copyright:
          "© 2025 Safe-DAYS — स्मार्ट पर्यटक सुरक्षा प्रणाली. सर्व हक्क राखीव.",

        madeWithLove:
          "AI आणि रिअल-टाइम सुरक्षा तंत्रज्ञानावर आधारित सुरक्षित प्रवास सहाय्य.",
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

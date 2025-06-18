
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'fr' | 'rw' | 'sw';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation data
const translations = {
  en: {
    // App Name
    appName: 'HopeCore Hub',
    tagline: 'Your safe space for healing and support',
    
    // Welcome/Auth
    welcome: 'Welcome to HopeCore Hub! 💜',
    chooseLanguage: 'Choose your preferred language',
    continue: 'Continue',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    continueAsGuest: 'Continue as Guest',
    
    // Navigation
    forum: 'Forum',
    mahoro: 'Mahoro',
    muganga: 'Muganga',
    settings: 'Settings',
    
    // Mood Check
    howAreYouFeeling: 'How are you feeling today?',
    feelingGreat: 'Great',
    feelingOkay: 'Okay',
    feelingSad: 'Sad',
    feelingStruggling: 'Struggling',
    
    // Resources
    resources: 'Resources',
    selfCare: 'Self-Care',
    safetyPlanning: 'Safety Planning',
    crisisSupport: 'Crisis Support',
    educationalContent: 'Educational Content',
    
    // Settings
    appLanguage: 'App Language',
    choosePreferredLanguage: 'Choose your preferred language',
    saveChanges: 'Save Changes',
    
    // Onboarding
    onboardingWelcome: 'Welcome to HopeCore Hub! 💜',
    onboardingDescription: 'Let us show you around this safe space designed for survivors and their healing journey.',
    onboardingForum: 'Share your thoughts and connect with others in our anonymous, supportive community space.',
    onboardingMahoro: 'Chat with our AI companion Mahoro for 24/7 support and guidance.',
    onboardingSettings: 'Adjust settings like language preferences and accessibility features in the Settings page.',
    getStarted: 'Get Started',
    next: 'Next',
    previous: 'Previous',
    skip: 'Skip',
    
    // Emergency
    emergencyContacts: 'Emergency Contacts',
    isangeCenter: 'Isange One Stop Center',
    nationalPolice: 'Rwanda National Police',
    hopecoreTeam: 'HopeCore Team'
  },
  fr: {
    // App Name
    appName: 'HopeCore Hub',
    tagline: 'Votre espace sûr pour la guérison et le soutien',
    
    // Welcome/Auth
    welcome: 'Bienvenue sur HopeCore Hub! 💜',
    chooseLanguage: 'Choisissez votre langue préférée',
    continue: 'Continuer',
    signIn: 'Se connecter',
    signUp: 'S\'inscrire',
    continueAsGuest: 'Continuer en tant qu\'invité',
    
    // Navigation
    forum: 'Forum',
    mahoro: 'Mahoro',
    muganga: 'Muganga',
    settings: 'Paramètres',
    
    // Mood Check
    howAreYouFeeling: 'Comment vous sentez-vous aujourd\'hui?',
    feelingGreat: 'Très bien',
    feelingOkay: 'Ça va',
    feelingSad: 'Triste',
    feelingStruggling: 'En difficulté',
    
    // Resources
    resources: 'Ressources',
    selfCare: 'Auto-soins',
    safetyPlanning: 'Planification de sécurité',
    crisisSupport: 'Soutien de crise',
    educationalContent: 'Contenu éducatif',
    
    // Settings
    appLanguage: 'Langue de l\'application',
    choosePreferredLanguage: 'Choisissez votre langue préférée',
    saveChanges: 'Sauvegarder les modifications',
    
    // Onboarding
    onboardingWelcome: 'Bienvenue sur HopeCore Hub! 💜',
    onboardingDescription: 'Laissez-nous vous faire visiter cet espace sûr conçu pour les survivants et leur parcours de guérison.',
    onboardingForum: 'Partagez vos pensées et connectez-vous avec d\'autres dans notre espace communautaire anonyme et solidaire.',
    onboardingMahoro: 'Discutez avec notre compagnon IA Mahoro pour un soutien et des conseils 24h/24 et 7j/7.',
    onboardingSettings: 'Ajustez les paramètres comme les préférences linguistiques et les fonctionnalités d\'accessibilité dans la page Paramètres.',
    getStarted: 'Commencer',
    next: 'Suivant',
    previous: 'Précédent',
    skip: 'Passer',
    
    // Emergency
    emergencyContacts: 'Contacts d\'urgence',
    isangeCenter: 'Centre Isange One Stop',
    nationalPolice: 'Police nationale du Rwanda',
    hopecoreTeam: 'Équipe HopeCore'
  },
  rw: {
    // App Name
    appName: 'HopeCore Hub',
    tagline: 'Ahantu hawe h\'umutekano wo gukira no gufashanya',
    
    // Welcome/Auth
    welcome: 'Murakaza neza kuri HopeCore Hub! 💜',
    chooseLanguage: 'Hitamo ururimi rwawe',
    continue: 'Komeza',
    signIn: 'Injira',
    signUp: 'Iyandikishe',
    continueAsGuest: 'Komeza nk\'umukerarugendo',
    
    // Navigation
    forum: 'Ikiganiro',
    mahoro: 'Mahoro',
    muganga: 'Muganga',
    settings: 'Amahinduka',
    
    // Mood Check
    howAreYouFeeling: 'Ese umerewe ute uyu munsi?',
    feelingGreat: 'Neza cyane',
    feelingOkay: 'Ni byiza',
    feelingSad: 'Nababaye',
    feelingStruggling: 'Ndihangana',
    
    // Resources
    resources: 'Ibikoresho',
    selfCare: 'Kwikuza',
    safetyPlanning: 'Gahunda y\'umutekano',
    crisisSupport: 'Ubufasha mu bibazo',
    educationalContent: 'Ibirimo by\'uburezi',
    
    // Settings
    appLanguage: 'Ururimi rw\'application',
    choosePreferredLanguage: 'Hitamo ururimi rwawe',
    saveChanges: 'Bika impinduka',
    
    // Onboarding
    onboardingWelcome: 'Murakaza neza kuri HopeCore Hub! 💜',
    onboardingDescription: 'Reka tugukwereke ahantu heza h\'umutekano hagamijwe abarokotse n\'urugendo rwabo rwo gukira.',
    onboardingForum: 'Sangira ibitekerezo byawe kandi uhurire n\'abandi mu cyicaro cyacu gisanzwe kandi gishyigikira.',
    onboardingMahoro: 'Ganira na Mahoro, mugenzi wacu wa AI, kugira ngo ubone ubufasha n\'ubuyobozi bwa 24/7.',
    onboardingSettings: 'Hindura ibihinduka nk\'amahitamo y\'indimi n\'ibiranga ubushobozi mu rupapuro rw\'Amahinduka.',
    getStarted: 'Tangira',
    next: 'Ikurikira',
    previous: 'Ibanziriza',
    skip: 'Simbuka',
    
    // Emergency
    emergencyContacts: 'Nomero z\'ihutirwa',
    isangeCenter: 'Ikigo cya Isange One Stop',
    nationalPolice: 'Polisi y\'Igihugu y\'u Rwanda',
    hopecoreTeam: 'Itsinda rya HopeCore'
  },
  sw: {
    // App Name
    appName: 'HopeCore Hub',
    tagline: 'Nafasi yako salama ya kupona na msaada',
    
    // Welcome/Auth
    welcome: 'Karibu HopeCore Hub! 💜',
    chooseLanguage: 'Chagua lugha uliyopendelea',
    continue: 'Endelea',
    signIn: 'Ingia',
    signUp: 'Jisajili',
    continueAsGuest: 'Endelea kama mgeni',
    
    // Navigation
    forum: 'Jukwaa',
    mahoro: 'Mahoro',
    muganga: 'Muganga',
    settings: 'Mipangilio',
    
    // Mood Check
    howAreYouFeeling: 'Unahisije vipi leo?',
    feelingGreat: 'Vizuri sana',
    feelingOkay: 'Ni vizuri',
    feelingSad: 'Huzuni',
    feelingStruggling: 'Napambana',
    
    // Resources
    resources: 'Rasilimali',
    selfCare: 'Kujitunza',
    safetyPlanning: 'Mpango wa usalama',
    crisisSupport: 'Msaada wa dharura',
    educationalContent: 'Maudhui ya kielimu',
    
    // Settings
    appLanguage: 'Lugha ya programu',
    choosePreferredLanguage: 'Chagua lugha uliyopendelea',
    saveChanges: 'Hifadhi mabadiliko',
    
    // Onboarding
    onboardingWelcome: 'Karibu HopeCore Hub! 💜',
    onboardingDescription: 'Turuhusu tukuongoze katika nafasi hii salama iliyoundwa kwa ajili ya waliorokoka na safari yao ya kupona.',
    onboardingForum: 'Shiriki mawazo yako na uunganishe na wengine katika nafasi yetu ya kijamii isiyo na utambuzi na inayounga mkono.',
    onboardingMahoro: 'Ongea na mwenzetu wa AI Mahoro kwa msaada na mwongozo wa masaa 24/7.',
    onboardingSettings: 'Rekebisha mipangilio kama vile mapendeleo ya lugha na vipengele vya ufikiaji katika ukurasa wa Mipangilio.',
    getStarted: 'Anza',
    next: 'Ifuatayo',
    previous: 'Iliyotangulia',
    skip: 'Ruka',
    
    // Emergency
    emergencyContacts: 'Mawasiliano ya dharura',
    isangeCenter: 'Kituo cha Isange One Stop',
    nationalPolice: 'Polisi ya Kitaifa ya Rwanda',
    hopecoreTeam: 'Timu ya HopeCore'
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = localStorage.getItem('hopecore-language');
    return (stored as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('hopecore-language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    localStorage.setItem('hopecore-language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

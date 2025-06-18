
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const languages = [
  { code: "rw", name: "Kinyarwanda", flag: "🇷🇼" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "sw", name: "Kiswahili", flag: "🇹🇿" },
  { code: "fr", name: "Français", flag: "🇫🇷" }
];

const LanguageSelect = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("en");

  const handleContinue = () => {
    localStorage.setItem("hopecore-language", selectedLanguage);
    navigate("/welcome");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9E78E9] to-[#D3E4FD] flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-[#9E78E9]">
            HopeCore Hub
          </CardTitle>
          <CardDescription className="text-lg">
            Choose your preferred language
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {languages.map((lang) => (
            <Button
              key={lang.code}
              variant={selectedLanguage === lang.code ? "default" : "outline"}
              className={`w-full justify-start text-left h-14 ${
                selectedLanguage === lang.code 
                  ? "bg-[#9E78E9] hover:bg-[#8B69D6]" 
                  : "hover:bg-[#D3E4FD]/50"
              }`}
              onClick={() => setSelectedLanguage(lang.code)}
            >
              <span className="text-2xl mr-3">{lang.flag}</span>
              <span className="text-lg">{lang.name}</span>
            </Button>
          ))}
          
          <Button 
            onClick={handleContinue}
            className="w-full mt-6 bg-[#9E78E9] hover:bg-[#8B69D6] text-white"
            size="lg"
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default LanguageSelect;

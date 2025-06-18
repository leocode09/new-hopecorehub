
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import BottomNav from "@/components/BottomNav";
import { useMahoroChat } from "@/hooks/useMahoroChat";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { Bot, Send, Mic, Volume2, VolumeX, Globe, Loader2 } from "lucide-react";

const Mahoro = () => {
  const [message, setMessage] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const saved = localStorage.getItem('mahoro-language');
    return saved || "en";
  });
  
  const { messages, isLoading, sendMessage } = useMahoroChat();
  const { isEnabled: ttsEnabled, isSpeaking, speak, toggle: toggleTTS } = useTextToSpeech();

  const languages = [
    { value: "en", label: "EN", fullLabel: "English" },
    { value: "rw", label: "RW", fullLabel: "Kinyarwanda" },
    { value: "fr", label: "FR", fullLabel: "Français" },
    { value: "sw", label: "SW", fullLabel: "Kiswahili" }
  ];

  // Save language preference
  useEffect(() => {
    localStorage.setItem('mahoro-language', selectedLanguage);
  }, [selectedLanguage]);

  // Auto-speak bot messages when TTS is enabled
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage && lastMessage.isBot && ttsEnabled) {
      speak(lastMessage.text, selectedLanguage);
    }
  }, [messages, ttsEnabled, selectedLanguage, speak]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;
    
    const messageToSend = message;
    setMessage("");
    await sendMessage(messageToSend, selectedLanguage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#D3E4FD] to-white dark:from-gray-900 dark:to-gray-800 pb-20">
      <div className="container mx-auto px-4 py-6 max-w-md h-screen flex flex-col">
        {/* Enhanced Header */}
        <div className="mb-4">
          {/* Top bar with language switches */}
          <div className="flex items-center justify-between mb-4 bg-[#9E78E9] rounded-lg p-3">
            <div>
              <h1 className="text-xl font-bold text-white">Mahoro</h1>
              <p className="text-sm text-purple-100">Your 24/7 support companion</p>
            </div>
            
            {/* Language Pills */}
            <div className="flex space-x-1">
              {languages.map((lang) => (
                <button
                  key={lang.value}
                  onClick={() => setSelectedLanguage(lang.value)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedLanguage === lang.value
                      ? 'bg-white text-[#9E78E9]'
                      : 'bg-purple-600 text-white hover:bg-purple-500'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Controls bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#9E78E9] rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {languages.find(l => l.value === selectedLanguage)?.fullLabel}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">AI Support Active</p>
              </div>
            </div>
            
            {/* Accessibility Controls */}
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={toggleTTS}
                className={`${ttsEnabled ? 'bg-[#9E78E9] text-white' : ''}`}
              >
                {ttsEnabled ? (
                  isSpeaking ? <Volume2 className="w-4 h-4 animate-pulse" /> : <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  msg.isBot
                    ? 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600'
                    : 'bg-[#9E78E9] text-white'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                <p className={`text-xs mt-1 ${msg.isBot ? 'text-gray-500' : 'text-purple-100'}`}>
                  {msg.timestamp}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-600 px-4 py-2 rounded-lg max-w-xs">
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">Mahoro is thinking...</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <Card className="border-[#9E78E9]/20">
          <CardContent className="p-3">
            <div className="flex space-x-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={handleKeyPress}
                className="flex-1"
                disabled={isLoading}
              />
              <Button variant="outline" size="sm" disabled={isLoading}>
                <Mic className="w-4 h-4" />
              </Button>
              <Button 
                onClick={handleSendMessage}
                className="bg-[#9E78E9] hover:bg-[#8B69D6]"
                size="sm"
                disabled={isLoading || !message.trim()}
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              💜 AI-powered support in multiple languages - Crisis support: 3029 (Isange) | 3512 (Police)
            </p>
          </CardContent>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
};

export default Mahoro;

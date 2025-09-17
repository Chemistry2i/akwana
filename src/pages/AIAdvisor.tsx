import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { toast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AIAdvisor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your AI farming advisor. Ask me anything about crops, soil, pests, or farming techniques. I speak English, Luganda, and Swahili!',
      timestamp: new Date(),
      suggestions: [
        'How do I treat tomato blight?',
        'Best time to plant maize?',
        'How to improve soil fertility?',
        'Pest control for coffee'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = {
        'blight': 'For tomato blight: 1) Remove affected leaves immediately. 2) Apply copper-based fungicide (2.5g/L water). 3) Ensure good air circulation. 4) Water at the base, not on leaves. 5) Space plants properly. Treatment cost: ~UGX 20,000/acre.',
        'maize': 'Best maize planting time in Uganda: Early rains (March-April) or second rains (August-September). Ensure soil temperature is above 10°C. Plant when consistent rainfall is expected for 2-3 weeks.',
        'soil': 'To improve soil fertility: 1) Add organic compost (2-3 tons/acre). 2) Practice crop rotation. 3) Use cover crops like beans. 4) Apply NPK fertilizer based on soil test. 5) Maintain pH between 6.0-7.0.',
        'coffee': 'Coffee pest control: 1) For Coffee Berry Borer, use pheromone traps. 2) Spray neem oil solution monthly. 3) Remove infected berries. 4) Maintain shade trees. 5) Apply systemic insecticides if severe.',
        'default': 'Based on your question, I recommend consulting with local extension officers for specific guidance. Meanwhile, ensure regular monitoring of your crops and maintain good agricultural practices.'
      };

      const keyword = Object.keys(responses).find(key => 
        input.toLowerCase().includes(key)
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: responses[keyword || 'default'],
        timestamp: new Date(),
        suggestions: [
          'Tell me more',
          'What about costs?',
          'Alternative methods?',
          'Local suppliers?'
        ]
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    toast({
      title: isListening ? "Voice Input Stopped" : "Listening...",
      description: isListening ? "Voice recording stopped" : "Speak your question in any language",
    });
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="gradient-harvest text-white">
          <CardTitle className="flex items-center justify-between">
            <span>
              <i className="fas fa-robot mr-2"></i>
              AI Farming Advisor
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm">
                <i className="fas fa-language mr-2"></i>
                EN
              </Button>
              <Button variant="secondary" size="sm">
                <i className="fas fa-phone mr-2"></i>
                Call
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.role === 'user' ? 'U' : 'AI'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className={`rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted'
                      }`}>
                        {message.content}
                      </div>
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Button
                variant={isListening ? "destructive" : "outline"}
                size="icon"
                onClick={handleVoiceInput}
              >
                <i className={`fas ${isListening ? 'fa-stop' : 'fa-microphone'}`}></i>
              </Button>
              <Input
                placeholder="Ask about farming, crops, pests..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={handleSend} disabled={!input.trim() || isTyping}>
                <i className="fas fa-paper-plane mr-2"></i>
                Send
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            <i className="fas fa-bookmark text-primary mr-2"></i>
            Popular Topics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: 'fa-bug', label: 'Pest Control', color: 'text-error' },
              { icon: 'fa-seedling', label: 'Planting Guide', color: 'text-success' },
              { icon: 'fa-vial', label: 'Soil Testing', color: 'text-warning' },
              { icon: 'fa-tint', label: 'Irrigation', color: 'text-info' },
              { icon: 'fa-leaf', label: 'Diseases', color: 'text-error' },
              { icon: 'fa-sun', label: 'Climate', color: 'text-warning' },
              { icon: 'fa-coins', label: 'Finance', color: 'text-accent' },
              { icon: 'fa-chart-line', label: 'Yield Tips', color: 'text-success' }
            ].map((topic, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-20 flex flex-col"
                onClick={() => setInput(`Tell me about ${topic.label.toLowerCase()}`)}
              >
                <i className={`fas ${topic.icon} text-2xl mb-2 ${topic.color}`}></i>
                <span className="text-xs">{topic.label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAdvisor;
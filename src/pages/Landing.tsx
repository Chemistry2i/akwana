import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetStarted = () => {
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard');
      toast({
        title: "Welcome to Akwana!",
        description: "Start by scanning your crops or checking market prices.",
      });
    }, 1000);
  };

  const features = [
    {
      icon: 'fa-camera',
      title: 'AI Crop Diagnosis',
      description: 'Instant disease detection from photos',
      color: 'text-success'
    },
    {
      icon: 'fa-chart-line',
      title: 'Market Insights',
      description: 'Real-time prices & predictions',
      color: 'text-info'
    },
    {
      icon: 'fa-shield-alt',
      title: 'Crop Insurance',
      description: 'Protect your harvest investment',
      color: 'text-warning'
    },
    {
      icon: 'fa-users',
      title: 'Community Support',
      description: 'Connect with expert farmers',
      color: 'text-accent'
    }
  ];

  const stats = [
    { value: '50,000+', label: 'Active Farmers' },
    { value: '98%', label: 'Diagnosis Accuracy' },
    { value: '35%', label: 'Income Increase' },
    { value: '24/7', label: 'AI Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-harvest opacity-10"></div>
        <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center justify-center bg-success/10 rounded-full px-4 py-2 mb-6">
              <i className="fas fa-award text-success mr-2"></i>
              <span className="text-sm font-medium text-success">Hackathon Winner 2024</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Smart Farming with AI Power
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Empowering Ugandan farmers with AI-driven crop diagnosis, market insights, and community support — all in your local language.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button 
                variant="cta" 
                size="lg" 
                onClick={handleGetStarted}
                disabled={isLoading}
                className="text-lg px-8 py-6"
              >
                {isLoading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Loading...
                  </>
                ) : (
                  <>
                    <i className="fas fa-rocket mr-2"></i>
                    Get Started Free
                  </>
                )}
              </Button>
              
              <Link to="/demo">
                <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                  <i className="fas fa-play-circle mr-2"></i>
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-card rounded-lg p-4 shadow-md">
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float opacity-20">
          <i className="fas fa-seedling text-6xl text-success"></i>
        </div>
        <div className="absolute bottom-20 right-10 animate-float opacity-20" style={{ animationDelay: '1s' }}>
          <i className="fas fa-tractor text-6xl text-warning"></i>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Powerful Features for Modern Farming</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to maximize your harvest and income
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
                <div className={`text-4xl mb-4 ${feature.color}`}>
                  <i className={`fas ${feature.icon}`}></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Akwana Works</h2>
            <p className="text-muted-foreground">Simple steps to smarter farming</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                { step: '1', title: 'Take a Photo', desc: 'Snap your crop or soil with your phone', icon: 'fa-camera' },
                { step: '2', title: 'AI Analysis', desc: 'Our AI instantly diagnoses health issues', icon: 'fa-brain' },
                { step: '3', title: 'Get Recommendations', desc: 'Receive personalized treatment advice', icon: 'fa-clipboard-check' },
                { step: '4', title: 'Track & Improve', desc: 'Monitor progress and maximize yield', icon: 'fa-chart-line' }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                  <div className="text-2xl text-primary/30">
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-harvest text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of farmers already using Akwana</p>
          <Button 
            variant="secondary" 
            size="lg"
            onClick={handleGetStarted}
            className="text-lg px-8 py-6"
          >
            <i className="fas fa-seedling mr-2"></i>
            Start Free Trial
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
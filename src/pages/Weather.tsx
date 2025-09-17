import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

interface WeatherData {
  current: {
    temp: number;
    humidity: number;
    rainfall: number;
    windSpeed: number;
    condition: string;
    uvIndex: number;
  };
  forecast: Array<{
    day: string;
    temp: { min: number; max: number };
    rainfall: number;
    condition: string;
    advisory: string;
  }>;
  alerts: Array<{
    type: string;
    severity: 'low' | 'medium' | 'high';
    message: string;
    timing: string;
  }>;
}

const Weather: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState('Mukono');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching weather data
    setTimeout(() => {
      setWeatherData({
        current: {
          temp: 26,
          humidity: 72,
          rainfall: 0,
          windSpeed: 12,
          condition: 'Partly Cloudy',
          uvIndex: 7
        },
        forecast: [
          { day: 'Today', temp: { min: 18, max: 28 }, rainfall: 0, condition: 'Sunny', advisory: 'Perfect for planting beans and maize' },
          { day: 'Tomorrow', temp: { min: 19, max: 27 }, rainfall: 15, condition: 'Light Rain', advisory: 'Delay irrigation, natural rain expected' },
          { day: 'Thursday', temp: { min: 18, max: 26 }, rainfall: 35, condition: 'Heavy Rain', advisory: 'Apply fungicide after rain stops' },
          { day: 'Friday', temp: { min: 17, max: 25 }, rainfall: 5, condition: 'Cloudy', advisory: 'Good conditions for transplanting' },
          { day: 'Saturday', temp: { min: 18, max: 28 }, rainfall: 0, condition: 'Sunny', advisory: 'Monitor soil moisture levels' },
        ],
        alerts: [
          { type: 'rain', severity: 'high', message: 'Heavy rainfall expected Thursday', timing: 'In 2 days' },
          { type: 'pest', severity: 'medium', message: 'Increased pest activity after rain', timing: 'This week' }
        ]
      });
      setIsLoading(false);
    }, 1500);
  }, [selectedDistrict]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return 'fa-sun text-warning';
      case 'partly cloudy': return 'fa-cloud-sun text-info';
      case 'cloudy': return 'fa-cloud text-muted-foreground';
      case 'light rain': return 'fa-cloud-rain text-info';
      case 'heavy rain': return 'fa-cloud-showers-heavy text-primary';
      default: return 'fa-cloud text-muted-foreground';
    }
  };

  const getAdvisoryColor = (rainfall: number) => {
    if (rainfall > 30) return 'text-error bg-error/10';
    if (rainfall > 10) return 'text-warning bg-warning/10';
    return 'text-success bg-success/10';
  };

  const handleSetAlert = () => {
    toast({
      title: "Weather Alert Set",
      description: "You'll receive SMS alerts for severe weather in your area",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
          <p className="text-muted-foreground">Loading weather data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Weather Alerts */}
      {weatherData?.alerts.map((alert, index) => (
        <Alert key={index} className={`
          ${alert.severity === 'high' ? 'border-error bg-error/5' : 
            alert.severity === 'medium' ? 'border-warning bg-warning/5' : 
            'border-info bg-info/5'}
        `}>
          <i className={`fas ${
            alert.type === 'rain' ? 'fa-cloud-showers-heavy' : 'fa-bug'
          } mr-2 ${
            alert.severity === 'high' ? 'text-error' : 
            alert.severity === 'medium' ? 'text-warning' : 'text-info'
          }`}></i>
          <AlertDescription className="flex items-center justify-between">
            <span>{alert.message}</span>
            <Badge variant={alert.severity === 'high' ? 'destructive' : 'outline'}>
              {alert.timing}
            </Badge>
          </AlertDescription>
        </Alert>
      ))}

      {/* Current Weather */}
      <Card className="overflow-hidden">
        <div className="gradient-sunrise p-6 text-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-1">Weather Forecast</h2>
              <p className="opacity-90">{selectedDistrict} District</p>
            </div>
            <Button variant="secondary" size="sm" onClick={handleSetAlert}>
              <i className="fas fa-bell mr-2"></i>
              Set Alerts
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-4">
                <i className={`fas ${getWeatherIcon(weatherData!.current.condition)} text-6xl`}></i>
                <div>
                  <div className="text-5xl font-bold">{weatherData!.current.temp}°C</div>
                  <div className="text-lg opacity-90">{weatherData!.current.condition}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <i className="fas fa-tint text-2xl"></i>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData!.current.humidity}%</div>
                    <div className="text-xs opacity-80">Humidity</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <i className="fas fa-wind text-2xl"></i>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData!.current.windSpeed}</div>
                    <div className="text-xs opacity-80">km/h Wind</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <i className="fas fa-cloud-rain text-2xl"></i>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData!.current.rainfall}</div>
                    <div className="text-xs opacity-80">mm Rain</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <i className="fas fa-sun text-2xl"></i>
                  <div className="text-right">
                    <div className="text-2xl font-bold">{weatherData!.current.uvIndex}</div>
                    <div className="text-xs opacity-80">UV Index</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* 5-Day Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-calendar-week text-primary mr-2"></i>
            5-Day Agricultural Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weatherData?.forecast.map((day, index) => (
              <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 font-medium">{day.day}</div>
                    <i className={`fas ${getWeatherIcon(day.condition)} text-2xl`}></i>
                    <div>
                      <span className="font-semibold">{day.temp.max}°</span>
                      <span className="text-muted-foreground mx-2">/</span>
                      <span className="text-muted-foreground">{day.temp.min}°</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="flex items-center">
                        <i className="fas fa-tint text-info mr-2"></i>
                        <span className="font-medium">{day.rainfall}mm</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`text-sm px-3 py-2 rounded-lg ${getAdvisoryColor(day.rainfall)}`}>
                  <i className="fas fa-seedling mr-2"></i>
                  <strong>Farm Advisory:</strong> {day.advisory}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Recommendations */}
      <Card className="bg-gradient-to-br from-success/5 to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-brain text-success mr-2"></i>
            AI Weather-Based Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { icon: 'fa-seedling', title: 'Planting Window', desc: 'Optimal conditions for beans & maize today and tomorrow morning', action: 'Plan planting' },
            { icon: 'fa-spray-can', title: 'Pest Prevention', desc: 'Apply preventive pesticides before Thursday\'s rain', action: 'Buy pesticides' },
            { icon: 'fa-water', title: 'Irrigation', desc: 'Skip irrigation tomorrow - 15mm rain expected', action: 'Save water' },
            { icon: 'fa-shield-alt', title: 'Disease Risk', desc: 'High fungal risk after Thursday rain - prepare fungicides', action: 'Prepare treatment' }
          ].map((rec, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-white/50 dark:bg-black/20 rounded-lg">
              <i className={`fas ${rec.icon} text-2xl text-primary mt-1`}></i>
              <div className="flex-1">
                <h4 className="font-semibold">{rec.title}</h4>
                <p className="text-sm text-muted-foreground">{rec.desc}</p>
              </div>
              <Button variant="outline" size="sm">
                {rec.action}
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Climate Patterns */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-chart-area text-info mr-2"></i>
            Seasonal Climate Patterns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Rainfall Pattern</span>
                <span className="text-info">Normal</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Temperature Trend</span>
                <span className="text-warning">Above Average</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Drought Risk</span>
                <span className="text-success">Low</span>
              </div>
              <Progress value={25} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weather;
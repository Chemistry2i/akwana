import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface HeatmapData {
  district: string;
  coordinates: { lat: number; lng: number };
  cases: number;
  severity: 'low' | 'medium' | 'high';
  pest: string;
  trend: 'increasing' | 'stable' | 'decreasing';
}

const PestMap: React.FC = () => {
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [mapData] = useState<HeatmapData[]>([
    { district: 'Kampala', coordinates: { lat: 0.3476, lng: 32.5825 }, cases: 45, severity: 'low', pest: 'Aphids', trend: 'stable' },
    { district: 'Mukono', coordinates: { lat: 0.3534, lng: 32.7554 }, cases: 128, severity: 'high', pest: 'Fall Armyworm', trend: 'increasing' },
    { district: 'Wakiso', coordinates: { lat: 0.4044, lng: 32.4597 }, cases: 67, severity: 'medium', pest: 'Stem Borer', trend: 'decreasing' },
    { district: 'Jinja', coordinates: { lat: 0.4244, lng: 33.2041 }, cases: 89, severity: 'medium', pest: 'Coffee Berry Borer', trend: 'increasing' },
    { district: 'Mbarara', coordinates: { lat: -0.6066, lng: 30.6545 }, cases: 34, severity: 'low', pest: 'Banana Weevil', trend: 'stable' },
  ]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'bg-error text-white';
      case 'medium': return 'bg-warning text-white';
      case 'low': return 'bg-success text-white';
      default: return 'bg-muted';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'fa-arrow-up text-error';
      case 'decreasing': return 'fa-arrow-down text-success';
      case 'stable': return 'fa-equals text-warning';
      default: return 'fa-minus';
    }
  };

  return (
    <div className="space-y-6">
      {/* National Alert */}
      <Alert className="border-warning bg-warning/10">
        <i className="fas fa-exclamation-triangle text-warning mr-2"></i>
        <AlertDescription>
          <strong>National Alert:</strong> Fall Armyworm outbreak detected in 3 districts. Ministry of Agriculture advisory issued.
        </AlertDescription>
      </Alert>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>
              <i className="fas fa-map-marked-alt text-primary mr-2"></i>
              National Pest & Disease Heatmap
            </span>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <i className="fas fa-filter mr-2"></i>
                Filter
              </Button>
              <Button variant="cta" size="sm">
                <i className="fas fa-exclamation-circle mr-2"></i>
                Report Case
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Simulated Map Visual */}
          <div className="relative bg-gradient-to-br from-success/20 to-primary/20 rounded-lg h-96 mb-6 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <i className="fas fa-map text-6xl text-primary/30 mb-4"></i>
                <p className="text-muted-foreground">Interactive Uganda Map</p>
                <p className="text-xs text-muted-foreground">Real-time pest tracking across all districts</p>
              </div>
            </div>
            
            {/* Map Points */}
            {mapData.map((data, index) => (
              <div
                key={index}
                className={`absolute w-8 h-8 rounded-full ${getSeverityColor(data.severity)} flex items-center justify-center cursor-pointer hover:scale-125 transition-transform shadow-lg animate-pulse`}
                style={{
                  top: `${20 + (index * 15)}%`,
                  left: `${15 + (index * 18)}%`,
                }}
                onClick={() => setSelectedDistrict(data.district)}
              >
                <span className="text-xs font-bold">{data.cases}</span>
              </div>
            ))}
          </div>

          {/* District Details */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mapData.map((data) => (
              <div
                key={data.district}
                className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                  selectedDistrict === data.district ? 'border-primary bg-primary/5' : ''
                }`}
                onClick={() => setSelectedDistrict(data.district)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{data.district}</h3>
                  <Badge className={getSeverityColor(data.severity)}>
                    {data.severity}
                  </Badge>
                </div>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Pest:</span>
                    <span className="font-medium">{data.pest}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cases:</span>
                    <span className="font-medium">{data.cases}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Trend:</span>
                    <span className="flex items-center">
                      <i className={`fas ${getTrendIcon(data.trend)} text-xs mr-1`}></i>
                      {data.trend}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid md:grid-cols-4 gap-4">
        {[
          { label: 'Total Cases', value: '363', icon: 'fa-bug', color: 'text-error' },
          { label: 'Districts Affected', value: '12', icon: 'fa-map-marker-alt', color: 'text-warning' },
          { label: 'Farmers Alerted', value: '2,847', icon: 'fa-bell', color: 'text-info' },
          { label: 'Cases Resolved', value: '218', icon: 'fa-check-circle', color: 'text-success' }
        ].map((stat, index) => (
          <Card key={index}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
              <i className={`fas ${stat.icon} text-3xl ${stat.color} opacity-50`}></i>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-clock text-primary mr-2"></i>
            Recent Outbreak Reports
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', district: 'Mukono', pest: 'Fall Armyworm', reporter: 'John K.', verified: true },
              { time: '5 hours ago', district: 'Kampala', pest: 'Aphids', reporter: 'Mary N.', verified: false },
              { time: 'Yesterday', district: 'Jinja', pest: 'Coffee Berry Borer', reporter: 'Peter O.', verified: true },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <i className="fas fa-exclamation-circle text-warning"></i>
                  <div>
                    <p className="font-medium">{report.pest} in {report.district}</p>
                    <p className="text-xs text-muted-foreground">Reported by {report.reporter} • {report.time}</p>
                  </div>
                </div>
                {report.verified && (
                  <Badge variant="default" className="bg-success">
                    <i className="fas fa-check mr-1"></i>
                    Verified
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PestMap;
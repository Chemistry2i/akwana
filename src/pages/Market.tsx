import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Market: React.FC = () => {
  const prices = [
    { crop: 'Maize', current: 1200, previous: 1140, unit: 'UGX/kg', change: 5.3, district: 'Kampala' },
    { crop: 'Beans', current: 3500, previous: 3570, unit: 'UGX/kg', change: -2.0, district: 'Kampala' },
    { crop: 'Coffee', current: 8000, previous: 7400, unit: 'UGX/kg', change: 8.1, district: 'Kampala' },
    { crop: 'Cassava', current: 800, previous: 750, unit: 'UGX/kg', change: 6.7, district: 'Kampala' },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-chart-line text-info mr-2"></i>
            Market Price Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="current">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="current">Current Prices</TabsTrigger>
              <TabsTrigger value="prediction">Price Predictions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="current" className="space-y-4">
              {prices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <h3 className="font-semibold">{item.crop}</h3>
                    <p className="text-sm text-muted-foreground">{item.district}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold">{item.current.toLocaleString()} {item.unit}</div>
                    <div className={`text-sm flex items-center justify-end ${item.change > 0 ? 'text-success' : 'text-error'}`}>
                      <i className={`fas fa-arrow-${item.change > 0 ? 'up' : 'down'} mr-1`}></i>
                      {Math.abs(item.change)}%
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="prediction">
              <div className="text-center py-8">
                <i className="fas fa-chart-line text-6xl text-muted-foreground mb-4"></i>
                <p className="text-muted-foreground">AI predictions coming soon</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Market;
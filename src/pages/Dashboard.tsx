import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const userFarms = [
    {
      id: '1',
      name: 'Main Farm',
      location: 'Mukono District',
      size: 5,
      health: 85,
      crops: [
        { type: 'Maize', status: 'healthy', area: '2 acres' },
        { type: 'Beans', status: 'warning', area: '1.5 acres' },
        { type: 'Coffee', status: 'healthy', area: '1.5 acres' }
      ]
    }
  ];

  const recentScans = [
    { id: '1', crop: 'Maize', date: '2 hours ago', status: 'healthy', confidence: 95 },
    { id: '2', crop: 'Beans', date: 'Yesterday', status: 'warning', confidence: 87 },
    { id: '3', crop: 'Coffee', date: '3 days ago', status: 'healthy', confidence: 92 }
  ];

  const marketPrices = [
    { crop: 'Maize', price: 'UGX 1,200/kg', trend: 'up', change: '+5%' },
    { crop: 'Beans', price: 'UGX 3,500/kg', trend: 'down', change: '-2%' },
    { crop: 'Coffee', price: 'UGX 8,000/kg', trend: 'up', change: '+8%' }
  ];

  const alerts = [
    { type: 'warning', message: 'Fall Armyworm outbreak reported in nearby districts', severity: 'medium' },
    { type: 'info', message: 'Optimal planting season for beans starts next week', severity: 'low' }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 to-success/10 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Dickson Mugerwa!</h1>
            <p className="text-muted-foreground">Your farms are 85% healthy today</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Farmer Points</div>
            <div className="text-2xl font-bold text-primary">2,450 pts</div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {alerts.map((alert, index) => (
        <Alert key={index} className={alert.severity === 'medium' ? 'border-warning bg-warning/5' : 'border-info bg-info/5'}>
          <i className={`fas ${alert.type === 'warning' ? 'fa-exclamation-triangle text-warning' : 'fa-info-circle text-info'} mr-2`}></i>
          <AlertDescription>{alert.message}</AlertDescription>
        </Alert>
      ))}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: 'fa-camera', label: 'Scan Crop', link: '/scan', color: 'bg-success' },
          { icon: 'fa-chart-line', label: 'Market Prices', link: '/market', color: 'bg-info' },
          { icon: 'fa-comments', label: 'AI Advisor', link: '/chat', color: 'bg-accent' },
          { icon: 'fa-file-alt', label: 'Reports', link: '/reports', color: 'bg-warning' }
        ].map((action, index) => (
          <Link key={index} to={action.link}>
            <Card className="hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className={`${action.color} text-white rounded-full w-12 h-12 flex items-center justify-center mb-3`}>
                  <i className={`fas ${action.icon} text-xl`}></i>
                </div>
                <span className="text-sm font-medium">{action.label}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Farm Health Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <i className="fas fa-leaf text-success mr-2"></i>
            Farm Health Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userFarms.map((farm) => (
            <div key={farm.id} className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h3 className="font-semibold">{farm.name}</h3>
                  <p className="text-sm text-muted-foreground">{farm.location} • {farm.size} acres</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-success">{farm.health}%</div>
                  <div className="text-xs text-muted-foreground">Health Score</div>
                </div>
              </div>
              
              <Progress value={farm.health} className="h-2" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                {farm.crops.map((crop, index) => (
                  <div key={index} className="bg-muted/50 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium">{crop.type}</div>
                        <div className="text-xs text-muted-foreground">{crop.area}</div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        crop.status === 'healthy' ? 'bg-success/20 text-success' : 'bg-warning/20 text-warning'
                      }`}>
                        {crop.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Scans */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                <i className="fas fa-history text-primary mr-2"></i>
                Recent Scans
              </span>
              <Link to="/scans">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentScans.map((scan) => (
                <div key={scan.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      scan.status === 'healthy' ? 'bg-success' : 'bg-warning'
                    }`}></div>
                    <div>
                      <div className="font-medium">{scan.crop}</div>
                      <div className="text-xs text-muted-foreground">{scan.date}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{scan.confidence}%</div>
                    <div className="text-xs text-muted-foreground">confidence</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Market Prices */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                <i className="fas fa-chart-line text-info mr-2"></i>
                Market Prices
              </span>
              <Link to="/market">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {marketPrices.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{item.crop}</div>
                    <div className="text-sm text-muted-foreground">{item.price}</div>
                  </div>
                  <div className={`flex items-center space-x-1 ${
                    item.trend === 'up' ? 'text-success' : 'text-error'
                  }`}>
                    <i className={`fas fa-arrow-${item.trend} text-sm`}></i>
                    <span className="font-medium">{item.change}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

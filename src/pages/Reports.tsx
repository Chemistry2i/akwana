import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Reports: React.FC = () => {
  const reports = [
    { id: '1', title: 'March 2024 Farm Report', date: '2024-03-15', type: 'Monthly', status: 'ready' },
    { id: '2', title: 'Maize Disease Analysis', date: '2024-03-10', type: 'Diagnosis', status: 'ready' },
    { id: '3', title: 'Q1 Market Analysis', date: '2024-03-01', type: 'Market', status: 'ready' }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-file-alt text-warning mr-2"></i>
            Reports & Analytics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h3 className="font-medium">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.type} • {report.date}</p>
              </div>
              <Button variant="outline" size="sm">
                <i className="fas fa-download mr-2"></i>
                Download
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default Reports;
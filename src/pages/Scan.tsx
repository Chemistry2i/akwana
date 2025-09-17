import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';

const Scan: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [scanType, setScanType] = useState<'crop' | 'soil'>('crop');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setScanResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleScan = async () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      });
      return;
    }

    setIsScanning(true);
    
    // Simulate AI scanning
    setTimeout(() => {
      const mockResults = {
        crop: {
          status: 'warning',
          confidence: 87,
          diagnosis: 'Early Blight Disease Detected',
          issues: [
            'Fungal infection on leaves',
            'Yellow spots with concentric rings',
            'Lower leaves affected'
          ],
          recommendations: [
            'Apply fungicide (Mancozeb) - 2.5g/L water',
            'Remove affected leaves immediately',
            'Improve air circulation between plants',
            'Water at base, avoid wetting leaves'
          ],
          severity: 'Medium',
          affectedArea: '15-20%',
          treatmentCost: 'UGX 25,000 per acre'
        },
        soil: {
          status: 'healthy',
          confidence: 92,
          diagnosis: 'Good Soil Quality',
          issues: [
            'Slightly low nitrogen levels',
            'Good moisture retention'
          ],
          recommendations: [
            'Add organic compost - 2 tons/acre',
            'Consider nitrogen-rich fertilizer',
            'Maintain current irrigation schedule'
          ],
          nutrients: {
            nitrogen: 65,
            phosphorus: 85,
            potassium: 90,
            ph: 6.5
          }
        }
      };

      setScanResult(scanType === 'crop' ? mockResults.crop : mockResults.soil);
      setIsScanning(false);
      
      toast({
        title: "Scan Complete!",
        description: `${scanType === 'crop' ? 'Crop' : 'Soil'} analysis ready`,
      });
    }, 3000);
  };

  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "PDF report saved to your device",
    });
  };

  const handleShareResult = () => {
    toast({
      title: "Result Shared",
      description: "Sent to community for expert review",
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Scan Type Selection */}
      <Card>
        <CardHeader>
          <CardTitle>
            <i className="fas fa-camera text-primary mr-2"></i>
            AI Crop & Soil Scanner
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Button
              variant={scanType === 'crop' ? 'default' : 'outline'}
              onClick={() => setScanType('crop')}
              className="h-24"
            >
              <div className="text-center">
                <i className="fas fa-leaf text-2xl mb-2"></i>
                <div>Crop Health</div>
                <div className="text-xs opacity-80">Detect diseases & pests</div>
              </div>
            </Button>
            <Button
              variant={scanType === 'soil' ? 'default' : 'outline'}
              onClick={() => setScanType('soil')}
              className="h-24"
            >
              <div className="text-center">
                <i className="fas fa-mountain text-2xl mb-2"></i>
                <div>Soil Quality</div>
                <div className="text-xs opacity-80">Analyze nutrients</div>
              </div>
            </Button>
          </div>

          {/* Image Upload Area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {selectedImage ? (
              <div className="space-y-4">
                <img 
                  src={selectedImage} 
                  alt="Selected" 
                  className="max-h-64 mx-auto rounded-lg shadow-md"
                />
                <div className="flex justify-center space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <i className="fas fa-redo mr-2"></i>
                    Change Image
                  </Button>
                  <Button 
                    variant="gradient" 
                    onClick={handleScan}
                    disabled={isScanning}
                  >
                    {isScanning ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-search mr-2"></i>
                        Start AI Scan
                      </>
                    )}
                  </Button>
                </div>
              </div>
            ) : (
              <div>
                <i className="fas fa-cloud-upload-alt text-6xl text-muted-foreground mb-4"></i>
                <p className="text-muted-foreground mb-4">
                  Upload a photo of your {scanType === 'crop' ? 'crop leaves' : 'soil'}
                </p>
                <Button 
                  variant="cta" 
                  onClick={() => fileInputRef.current?.click()}
                >
                  <i className="fas fa-camera mr-2"></i>
                  Choose Photo
                </Button>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Scanning Progress */}
          {isScanning && (
            <div className="mt-6 space-y-3">
              <div className="text-center text-sm text-muted-foreground">
                AI is analyzing your {scanType}...
              </div>
              <Progress value={66} className="animate-pulse" />
              <div className="grid grid-cols-3 gap-2 text-xs text-center text-muted-foreground">
                <div>📸 Image Processing</div>
                <div className="text-primary">🔍 Pattern Analysis</div>
                <div className="opacity-50">📊 Generating Report</div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Scan Results */}
      {scanResult && (
        <Card className={`border-2 ${
          scanResult.status === 'healthy' ? 'border-success' : 
          scanResult.status === 'warning' ? 'border-warning' : 'border-error'
        }`}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                <i className={`fas fa-clipboard-check mr-2 ${
                  scanResult.status === 'healthy' ? 'text-success' : 
                  scanResult.status === 'warning' ? 'text-warning' : 'text-error'
                }`}></i>
                Scan Results
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                scanResult.status === 'healthy' ? 'bg-success/20 text-success' : 
                scanResult.status === 'warning' ? 'bg-warning/20 text-warning' : 
                'bg-error/20 text-error'
              }`}>
                {scanResult.confidence}% Confidence
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Diagnosis */}
            <div>
              <h3 className="font-semibold text-lg mb-2">{scanResult.diagnosis}</h3>
              {scanResult.severity && (
                <div className="flex items-center space-x-4 text-sm">
                  <span>Severity: <strong>{scanResult.severity}</strong></span>
                  <span>Affected Area: <strong>{scanResult.affectedArea}</strong></span>
                </div>
              )}
            </div>

            {/* Issues Found */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-exclamation-circle text-warning mr-2"></i>
                Issues Detected
              </h4>
              <ul className="space-y-1">
                {scanResult.issues.map((issue: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-warning mr-2">•</span>
                    <span className="text-sm">{issue}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommendations */}
            <div>
              <h4 className="font-medium mb-2 flex items-center">
                <i className="fas fa-prescription text-success mr-2"></i>
                Recommended Actions
              </h4>
              <div className="space-y-2">
                {scanResult.recommendations.map((rec: string, index: number) => (
                  <div key={index} className="flex items-start bg-success/5 rounded-lg p-3">
                    <span className="text-success font-medium mr-2">{index + 1}.</span>
                    <span className="text-sm">{rec}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Soil Nutrients (if soil scan) */}
            {scanResult.nutrients && (
              <div>
                <h4 className="font-medium mb-3">Nutrient Levels</h4>
                <div className="space-y-2">
                  {Object.entries(scanResult.nutrients).map(([nutrient, value]: [string, any]) => (
                    <div key={nutrient}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="capitalize">{nutrient}</span>
                        <span>{nutrient === 'ph' ? value : `${value}%`}</span>
                      </div>
                      <Progress 
                        value={nutrient === 'ph' ? (value / 14) * 100 : value} 
                        className="h-2"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Treatment Cost */}
            {scanResult.treatmentCost && (
              <Alert className="bg-info/5 border-info">
                <i className="fas fa-coins text-info mr-2"></i>
                <AlertDescription>
                  Estimated treatment cost: <strong>{scanResult.treatmentCost}</strong>
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button variant="gradient" className="flex-1" onClick={handleDownloadReport}>
                <i className="fas fa-download mr-2"></i>
                Download Report
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleShareResult}>
                <i className="fas fa-share-alt mr-2"></i>
                Share with Community
              </Button>
              <Button variant="success" className="flex-1">
                <i className="fas fa-shopping-cart mr-2"></i>
                Buy Treatment
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tips */}
      <Card className="bg-info/5 border-info">
        <CardContent className="pt-6">
          <h4 className="font-medium mb-3 flex items-center">
            <i className="fas fa-lightbulb text-info mr-2"></i>
            Scanning Tips
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• Take photos in good lighting conditions</li>
            <li>• Focus on affected areas for disease detection</li>
            <li>• Include both healthy and affected parts if possible</li>
            <li>• For soil, take photo of freshly dug sample</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default Scan;
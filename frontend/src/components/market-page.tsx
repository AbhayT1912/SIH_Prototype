import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { 
  Search, 
  TrendingUp, 
  TrendingDown,
  MapPin,
  Calendar,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  Star,
  Filter,
  RefreshCw,
  Bell
} from "lucide-react";

interface CropPrice {
  id: string;
  name: string;
  nameHindi: string;
  currentPrice: number;
  previousPrice: number;
  change: number;
  changePercent: number;
  market: string;
  image: string;
  trending?: boolean;
  category: string;
  unit: string;
  lastUpdated: string;
  weeklyData: number[];
  monthlyData: number[];
}

export function MarketPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMarket, setSelectedMarket] = useState<'local' | 'national'>('local');
  const [selectedCrop, setSelectedCrop] = useState<CropPrice | null>(null);
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'change'>('change');

  // Sample market data
  const cropsData: CropPrice[] = [
    {
      id: '1',
      name: 'Soybean',
      nameHindi: 'सोयाबीन',
      currentPrice: 5250,
      previousPrice: 5200,
      change: 50,
      changePercent: 0.96,
      market: 'Itarsi Mandi',
      image: 'https://images.unsplash.com/photo-1605351793013-780532cbdb66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb3liZWFuJTIwY3JvcCUyMGZpZWxkJTIwaW5kaWF8ZW58MXx8fHwxNzU3OTUwMjMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
      trending: true,
      category: 'Oil Seeds',
      unit: 'क्विंटल',
      lastUpdated: '2 hours ago',
      weeklyData: [5100, 5150, 5200, 5180, 5220, 5200, 5250],
      monthlyData: [4800, 4900, 5000, 5100, 5250]
    },
    {
      id: '2',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      currentPrice: 2150,
      previousPrice: 2180,
      change: -30,
      changePercent: -1.38,
      market: 'Itarsi Mandi',
      image: 'https://images.unsplash.com/photo-1661762406676-8b21999d011e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMG1haXplJTIwY29ybiUyMGNyb3BzfGVufDF8fHx8MTc1Nzk1MDIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      trending: false,
      category: 'Cereals',
      unit: 'क्विंटल',
      lastUpdated: '1 hour ago',
      weeklyData: [2200, 2190, 2180, 2170, 2160, 2180, 2150],
      monthlyData: [2300, 2250, 2200, 2180, 2150]
    },
    {
      id: '3',
      name: 'Maize',
      nameHindi: 'मक्का',
      currentPrice: 1850,
      previousPrice: 1820,
      change: 30,
      changePercent: 1.65,
      market: 'Itarsi Mandi',
      image: 'https://images.unsplash.com/photo-1661762406676-8b21999d011e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMG1haXplJTIwY29ybiUyMGNyb3BzfGVufDF8fHx8MTc1Nzk1MDIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      trending: true,
      category: 'Cereals',
      unit: 'क्विंटल',
      lastUpdated: '3 hours ago',
      weeklyData: [1800, 1810, 1820, 1815, 1825, 1820, 1850],
      monthlyData: [1750, 1780, 1800, 1820, 1850]
    },
    {
      id: '4',
      name: 'Cotton',
      nameHindi: 'कपास',
      currentPrice: 6800,
      previousPrice: 6750,
      change: 50,
      changePercent: 0.74,
      market: 'Itarsi Mandi',
      image: 'https://images.unsplash.com/photo-1661762406676-8b21999d011e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMG1haXplJTIwY29ybiUyMGNyb3BzfGVufDF8fHx8MTc1Nzk1MDIzNXww&ixlib=rb-4.1.0&q=80&w=1080',
      trending: false,
      category: 'Cash Crops',
      unit: 'क्विंटल',
      lastUpdated: '4 hours ago',
      weeklyData: [6700, 6720, 6750, 6740, 6760, 6750, 6800],
      monthlyData: [6500, 6600, 6700, 6750, 6800]
    }
  ];

  const featuredCrops = cropsData.filter(crop => crop.trending).slice(0, 3);

  const filteredCrops = cropsData.filter(crop =>
    crop.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    crop.nameHindi.includes(searchQuery)
  );

  const sortedCrops = [...filteredCrops].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.nameHindi.localeCompare(b.nameHindi);
      case 'price':
        return b.currentPrice - a.currentPrice;
      case 'change':
        return b.changePercent - a.changePercent;
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800" style={{ fontFamily: 'Poppins' }}>
              बाजार भाव
            </h1>
            <p className="text-gray-600 mt-1">आज की ताजी कीमतें और बाजार का विश्लेषण</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              रीफ्रेश करें
            </Button>
            <Button variant="outline" size="sm">
              <Bell className="w-4 h-4 mr-2" />
              अलर्ट सेट करें
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <Input
            placeholder="फसल खोजें जैसे सोयाबीन..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3"
          />
        </div>
      </div>

      {/* Market Toggle */}
      <div className="mb-6">
        <Tabs value={selectedMarket} onValueChange={(value) => setSelectedMarket(value as any)}>
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="local">स्थानीय बाजार</TabsTrigger>
            <TabsTrigger value="national">राष्ट्रीय औसत</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Featured Crops Carousel */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">आज की खास फसलें</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredCrops.map((crop) => (
            <motion.div
              key={crop.id}
              whileHover={{ scale: 1.02, y: -2 }}
              className="cursor-pointer"
              onClick={() => setSelectedCrop(crop)}
            >
              <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 transition-all">
                <div className="relative h-32">
                  <ImageWithFallback
                    src={crop.image}
                    alt={crop.nameHindi}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      ट्रेंडिंग
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{crop.nameHindi}</h3>
                    <div className="flex items-center">
                      {crop.changePercent > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${
                        crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-primary">₹{crop.currentPrice.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">प्रति {crop.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">{crop.market}</p>
                      <SimpleSparkline data={crop.weeklyData} color={crop.changePercent > 0 ? '#10B981' : '#EF4444'} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Crops List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>सभी फसलों की कीमतें</CardTitle>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-sm border rounded px-2 py-1"
                >
                  <option value="change">परिवर्तन के अनुसार</option>
                  <option value="price">कीमत के अनुसार</option>
                  <option value="name">नाम के अनुसार</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sortedCrops.map((crop) => (
                  <motion.div
                    key={crop.id}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setSelectedCrop(crop)}
                    className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:shadow-md transition-all"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={crop.image}
                          alt={crop.nameHindi}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{crop.nameHindi}</h3>
                        <p className="text-sm text-gray-600">{crop.category}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="font-bold">₹{crop.currentPrice.toLocaleString()}</p>
                        <p className="text-xs text-gray-600">प्रति {crop.unit}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className={`flex items-center ${
                          crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {crop.changePercent > 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          <span className="font-medium">
                            {crop.changePercent > 0 ? '+' : ''}₹{Math.abs(crop.change)}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {crop.changePercent > 0 ? '+' : ''}{crop.changePercent}%
                        </p>
                      </div>

                      <div className="w-20 h-10">
                        <SimpleSparkline 
                          data={crop.weeklyData} 
                          color={crop.changePercent > 0 ? '#10B981' : '#EF4444'} 
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Market Insights Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                बाजार सूझ-बूझ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700 mb-1">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  <span className="font-medium">तेजी</span>
                </div>
                <p className="text-sm text-green-600">सोयाबीन की कीमतों में वृद्धि</p>
              </div>
              
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="flex items-center text-red-700 mb-1">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  <span className="font-medium">मंदी</span>
                </div>
                <p className="text-sm text-red-600">गेहूं की मांग में कमी</p>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center text-blue-700 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="font-medium">मौसमी सुझाव</span>
                </div>
                <p className="text-sm text-blue-600">रबी की तैयारी का समय</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>मंडी की जानकारी</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">स्थान</span>
                  <span className="font-medium">इटारसी मंडी</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">दूरी</span>
                  <span className="font-medium">15 किमी</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">समय</span>
                  <span className="font-medium">सुबह 6-12 बजे</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  दिशा देखें
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Crop Detail Modal */}
      {selectedCrop && (
        <CropDetailModal 
          crop={selectedCrop}
          isOpen={!!selectedCrop}
          onClose={() => setSelectedCrop(null)}
        />
      )}
    </div>
  );
}

function SimpleSparkline({ data, color }: { data: number[], color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = range === 0 ? 50 : 100 - ((value - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
      />
    </svg>
  );
}

function CropDetailModal({ crop, isOpen, onClose }: {
  crop: CropPrice,
  isOpen: boolean,
  onClose: () => void
}) {
  if (!crop) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.nameHindi}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{crop.nameHindi}</h2>
                <p className="text-gray-600">{crop.name} • {crop.category}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose}>बंद करें</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>मूल्य ट्रेंड</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-16 h-16 mx-auto text-primary mb-4" />
                      <p className="text-lg font-medium">Interactive Chart</p>
                      <p className="text-gray-600">7-day, 1-month, 6-month trends</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>वर्तमान कीमत</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">
                      ₹{crop.currentPrice.toLocaleString()}
                    </p>
                    <p className="text-gray-600">प्रति {crop.unit}</p>
                    <div className={`flex items-center justify-center mt-2 ${
                      crop.changePercent > 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {crop.changePercent > 0 ? (
                        <TrendingUp className="w-4 h-4 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 mr-1" />
                      )}
                      <span>{crop.changePercent > 0 ? '+' : ''}₹{Math.abs(crop.change)} ({crop.changePercent}%)</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>बाजार की जानकारी</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>मंडी</span>
                    <span className="font-medium">{crop.market}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>अंतिम अपडेट</span>
                    <span className="font-medium">{crop.lastUpdated}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>श्रेणी</span>
                    <span className="font-medium">{crop.category}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
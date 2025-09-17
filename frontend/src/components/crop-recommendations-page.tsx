import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useLanguage, SpeakerButton } from "./language-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "motion/react";
import { 
  Search,
  Filter,
  TrendingUp,
  Droplets,
  Sun,
  DollarSign,
  Leaf,
  Target,
  Clock,
  MapPin,
  Star,
  ArrowRight
} from "lucide-react";

interface CropRecommendation {
  id: string;
  name: string;
  nameHindi: string;
  image: string;
  profitMargin: number;
  estimatedYield: string;
  waterRequirement: 'low' | 'medium' | 'high';
  marketDemand: 'low' | 'medium' | 'high';
  climateSuitability: 'excellent' | 'good' | 'fair';
  season: string;
  duration: string;
  difficulty: 'easy' | 'medium' | 'hard';
  investment: number;
  riskLevel: 'low' | 'medium' | 'high';
  description: string;
}

export function CropRecommendationsPage() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("profit");
  const [filterSeason, setFilterSeason] = useState("all");

  const recommendations: CropRecommendation[] = [
    {
      id: '1',
      name: 'Wheat',
      nameHindi: 'गेहूं',
      image: 'https://media.gettyimages.com/id/171553200/photo/wheat-berries-background.jpg?s=612x612&w=0&k=20&c=907B7IcP8MieoXvLzLILSqy05gTjehDBcSb-R2Wzmj4=',
      profitMargin: 65000,
      estimatedYield: '22-24 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'रबी',
      duration: '120-130 दिन',
      difficulty: 'easy',
      investment: 25000,
      riskLevel: 'low',
      description: 'स्थिर मांग और अच्छी कीमत के साथ पारंपरिक फसल'
    },
    {
      id: '2',
      name: 'Chickpea',
      nameHindi: 'चना',
      image: 'https://media.gettyimages.com/id/1942086498/photo/full-frame-macro-shot-of-chickpeas-background-food-texture.jpg?s=612x612&w=0&k=20&c=zLjXaUvILVOIqYU8cxgVERW4N4UJ45RmZfJce5-EJ3w=',
      profitMargin: 55000,
      estimatedYield: '12-15 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'रबी',
      duration: '95-110 दिन',
      difficulty: 'easy',
      investment: 20000,
      riskLevel: 'low',
      description: 'कम पानी की आवश्यकता, दलहन की बढ़ती मांग'
    },
    {
      id: '3',
      name: 'Mustard',
      nameHindi: 'सरसों',
      image: 'https://media.gettyimages.com/id/1479259505/photo/mustard-seeds.jpg?s=612x612&w=0&k=20&c=2XYQwRaYZy7Su26PCqOaFSn7jkL347-zq4LpPbYkOhQ=',
      profitMargin: 48000,
      estimatedYield: '18-20 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'medium',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '90-100 दिन',
      difficulty: 'easy',
      investment: 18000,
      riskLevel: 'medium',
      description: 'तेल की बढ़ती कीमत, कम निवेश'
    },
    {
      id: '4',
      name: 'Maize',
      nameHindi: 'मक्का',
      image: 'https://media.gettyimages.com/id/157608978/photo/corn.jpg?s=612x612&w=0&k=20&c=X6MWiwZw-qTF4NKW3KmPx9kcVDJSSmhaC5xztgsd9Ls=',
      profitMargin: 72000,
      estimatedYield: '25-30 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '110-120 दिन',
      difficulty: 'medium',
      investment: 30000,
      riskLevel: 'medium',
      description: 'उच्च उत्पादन क्षमता, पशु आहार की मांग'
    },
    {
      id: '5',
      name: 'Potato',
      nameHindi: 'आलू',
      image: 'https://media.gettyimages.com/id/1224918845/photo/farmers-market-organic-potatoes.jpg?s=612x612&w=0&k=20&c=OKNglpi8Cc1IG78-jXiws2E-8qNKb7dJGB2nXvdncfM=',
      profitMargin: 85000,
      estimatedYield: '200-250 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '90-110 दिन',
      difficulty: 'hard',
      investment: 45000,
      riskLevel: 'high',
      description: 'उच्च लाभ लेकिन अधिक जोखिम और निवेश'
    },
    {
      id: '6',
      name: 'Onion',
      nameHindi: 'प्याज',
      image: 'https://media.gettyimages.com/id/171158822/photo/red-onions-background.jpg?s=612x612&w=0&k=20&c=-jkt0464Xku9H0_eSrcz6RJc8TqeQwUFNI2AF9oFGL8=',
      profitMargin: 58000,
      estimatedYield: '150-180 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'रबी',
      duration: '120-150 दिन',
      difficulty: 'medium',
      investment: 35000,
      riskLevel: 'medium',
      description: 'निरंतर मांग, अच्छी भंडारण क्षमता'
    },
    // --- Added Crops Start Here ---
    {
      id: '7',
      name: 'Soybean',
      nameHindi: 'सोयाबीन',
      image: 'https://media.gettyimages.com/id/184878412/photo/soybean.jpg?s=612x612&w=0&k=20&c=y2ErWVIJEIZ2o_O2YGjfLHePuMLyRwf_5_felYaD-Qc=',
      profitMargin: 60000,
      estimatedYield: '10-12 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'खरीफ',
      duration: '90-100 दिन',
      difficulty: 'easy',
      investment: 22000,
      riskLevel: 'low',
      description: 'प्रमुख खरीफ फसल, प्रोटीन का उत्कृष्ट स्रोत'
    },
    {
      id: '8',
      name: 'Cotton',
      nameHindi: 'कपास',
      image: 'https://media.gettyimages.com/id/157742904/photo/raw-cotton-crops.jpg?s=612x612&w=0&k=20&c=OYL5IiqwJI5nuq47ZL1nk3f0t6vHrMcq65Yx6_dbyYU=',
      profitMargin: 75000,
      estimatedYield: '10-15 क्विंटल/एकड़',
      waterRequirement: 'medium',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'खरीफ',
      duration: '150-180 दिन',
      difficulty: 'hard',
      investment: 40000,
      riskLevel: 'high',
      description: 'प्रमुख नकदी फसल, कपड़ा उद्योग के लिए महत्वपूर्ण'
    },
    {
      id: '9',
      name: 'Tomato',
      nameHindi: 'टमाटर',
      image: 'https://media.gettyimages.com/id/a0119-000144/photo/ripe-tomatoes.jpg?s=612x612&w=0&k=20&c=iDv9omfzHWKF9R3RmiUIjy_uLp0qT8M20wTaNZ_qdBk=',
      profitMargin: 95000,
      estimatedYield: '250-300 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'जायद',
      duration: '100-120 दिन',
      difficulty: 'medium',
      investment: 50000,
      riskLevel: 'high',
      description: 'उच्च लाभ की संभावना, लेकिन मूल्य अस्थिरता का जोखिम'
    },
    {
      id: '10',
      name: 'Sugarcane',
      nameHindi: 'गन्ना',
      image: 'https://media.gettyimages.com/id/177596705/photo/peru-jilili-sicchez-sugarcane.jpg?s=612x612&w=0&k=20&c=OsMYNU6uPJQQl86-9mJWRjPZCL2VOfA7qFJGdyubCXA=',
      profitMargin: 110000,
      estimatedYield: '400-500 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'वार्षिक',
      duration: '300-365 दिन',
      difficulty: 'medium',
      investment: 60000,
      riskLevel: 'medium',
      description: 'लंबी अवधि की फसल, चीनी मिलों से सुनिश्चित खरीद'
    },
    {
      id: '11',
      name: 'Paddy (Rice)',
      nameHindi: 'धान',
      image: 'https://media.gettyimages.com/id/1912193566/photo/full-frame-macro-shot-of-brown-rice-background-food-texture.jpg?s=612x612&w=0&k=20&c=nvV_LCnxO58IaJzxfJ3QDd201L9TAUMokIwK3amaAtk=',
      profitMargin: 68000,
      estimatedYield: '25-30 क्विंटल/एकड़',
      waterRequirement: 'high',
      marketDemand: 'high',
      climateSuitability: 'good',
      season: 'खरीफ',
      duration: '120-140 दिन',
      difficulty: 'medium',
      investment: 32000,
      riskLevel: 'medium',
      description: 'भारत की मुख्य खाद्य फसल, सरकारी खरीद का लाभ'
    },
    {
      id: '12',
      name: 'Pomegranate',
      nameHindi: 'अनार',
      image: 'https://media.gettyimages.com/id/964956252/photo/close-up-of-pomegranate.jpg?s=612x612&w=0&k=20&c=iPJu_SvE-M3PQF8wFvf09-QjUd_HztJYQIMCNTCljtI=',
      profitMargin: 250000,
      estimatedYield: '80-100 क्विंटल/एकड़',
      waterRequirement: 'low',
      marketDemand: 'high',
      climateSuitability: 'excellent',
      season: 'वार्षिक',
      duration: '3-4 वर्ष (फलने तक)',
      difficulty: 'hard',
      investment: 120000,
      riskLevel: 'high',
      description: 'उच्च मूल्य वाली बागवानी फसल, निर्यात की अच्छी संभावना'
    }
  ];

  const getWaterIcon = (level: string) => {
    const color = level === 'low' ? 'text-green-600' : level === 'medium' ? 'text-yellow-600' : 'text-red-600';
    return <Droplets className={`w-4 h-4 ${color}`} />;
  };

  const getDemandIcon = (level: string) => {
    const color = level === 'high' ? 'text-green-600' : level === 'medium' ? 'text-yellow-600' : 'text-red-600';
    return <TrendingUp className={`w-4 h-4 ${color}`} />;
  };

  const getSuitabilityIcon = (level: string) => {
    const color = level === 'excellent' ? 'text-green-600' : level === 'good' ? 'text-yellow-600' : 'text-orange-600';
    return <Sun className={`w-4 h-4 ${color}`} />;
  };

  const getRiskBadge = (level: string) => {
    const colors = {
      low: 'bg-green-100 text-green-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    const labels = {
      low: 'कम जोखिम',
      medium: 'मध्यम जोखिम',
      high: 'उच्च जोखिम'
    };
    return <Badge className={colors[level]}>{labels[level]}</Badge>;
  };

  const sortedAndFilteredRecommendations = recommendations
    .filter(crop => {
      const matchesSearch = crop.nameHindi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            crop.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSeason = filterSeason === 'all' || crop.season === filterSeason || crop.season === 'वार्षिक';
      return matchesSearch && matchesSeason;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'profit':
          return b.profitMargin - a.profitMargin;
        case 'water':
          const waterOrder = { low: 1, medium: 2, high: 3 };
          return waterOrder[a.waterRequirement] - waterOrder[b.waterRequirement];
        case 'demand':
          const demandOrder = { high: 3, medium: 2, low: 1 };
          return demandOrder[b.marketDemand] - demandOrder[a.marketDemand];
        default:
          return 0;
      }
    });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Poppins' }}>
              {t('crop-recommendations', 'फसल सुझाव')}
            </h1>
            <p className="text-gray-600 mt-2">
              आपके खेत और जलवायु के अनुकूल सर्वोत्तम फसल विकल्प
            </p>
          </div>
          <SpeakerButton text="फसल सुझाव - आपके लिए सबसे उपयुक्त फसलों की सूची" />
        </div>
      </motion.div>

      {/* Filters and Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mb-8"
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="फसल खोजें..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="w-full md:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="क्रमबद्ध करें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="profit">सर्वाधिक लाभ</SelectItem>
                    <SelectItem value="water">कम पानी उपयोग</SelectItem>
                    <SelectItem value="demand">सर्वाधिक मांग</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filter by Season */}
              <div className="w-full md:w-48">
                <Select value={filterSeason} onValueChange={setFilterSeason}>
                  <SelectTrigger>
                    <SelectValue placeholder="सीज़न चुनें" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">सभी सीज़न</SelectItem>
                    <SelectItem value="खरीफ">खरीफ</SelectItem>
                    <SelectItem value="रबी">रबी</SelectItem>
                    <SelectItem value="जायद">जायद</SelectItem>
                    <SelectItem value="वार्षिक">वार्षिक</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedAndFilteredRecommendations.map((crop, index) => (
          <motion.div
            key={crop.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 group">
              <div className="relative">
                <ImageWithFallback
                  src={crop.image}
                  alt={crop.nameHindi}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="absolute top-3 right-3">
                  {getRiskBadge(crop.riskLevel)}
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-primary text-white">
                    {crop.season}
                  </Badge>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl" style={{ fontFamily: 'Poppins' }}>
                    {crop.nameHindi}
                  </CardTitle>
                  <SpeakerButton text={`${crop.nameHindi} - अनुमानित लाभ ${crop.profitMargin} रुपए प्रति एकड़`} />
                </div>
                <p className="text-gray-600 text-sm">{crop.name}</p>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Profit Margin */}
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">अनुमानित लाभ</span>
                    <DollarSign className="w-4 h-4 text-green-600" />
                  </div>
                  <p className="text-2xl font-bold text-green-600">
                    ₹{crop.profitMargin.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">प्रति एकड़</p>
                </div>

                {/* Estimated Yield */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">अनुमानित उत्पादन</span>
                  <span className="font-semibold">{crop.estimatedYield}</span>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    {getWaterIcon(crop.waterRequirement)}
                    <p className="text-xs text-gray-600 mt-1">पानी</p>
                    <p className="text-xs font-medium capitalize">{crop.waterRequirement}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    {getDemandIcon(crop.marketDemand)}
                    <p className="text-xs text-gray-600 mt-1">मांग</p>
                    <p className="text-xs font-medium capitalize">{crop.marketDemand}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    {getSuitabilityIcon(crop.climateSuitability)}
                    <p className="text-xs text-gray-600 mt-1">जलवायु</p>
                    <p className="text-xs font-medium capitalize">{crop.climateSuitability}</p>
                  </div>
                </div>

                {/* Additional Info */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">अवधि:</span>
                    <span className="font-medium">{crop.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">निवेश:</span>
                    <span className="font-medium">₹{crop.investment.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-sm text-gray-600">{crop.description}</p>

                {/* Action Button */}
                <Button className="w-full group-hover:bg-primary/90 transition-colors">
                  <Target className="w-4 h-4 mr-2" />
                  विस्तृत जानकारी
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {sortedAndFilteredRecommendations.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">कोई फसल नहीं मिली</h3>
          <p className="text-gray-600">कृपया अन्य खोज शब्द या फिल्टर का उपयोग करें</p>
        </motion.div>
      )}
    </div>
  );
}
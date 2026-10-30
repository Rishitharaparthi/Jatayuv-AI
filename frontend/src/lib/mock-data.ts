// Centralized mock data for the entire app.
export type Budget = "Low" | "Medium" | "Luxury";
export type IdealFor = "Solo" | "Couples" | "Family" | "Friends";

export type Destination = {
  id: string;
  name: string;
  country: string;
  continent: string;
  image: string;
  rating: number;
  season: string;        // short readable
  budget: string;        // legacy display, e.g. "$1,800"
  duration: string;      // legacy display, e.g. "5 days"
  tags: string[];        // legacy categories
  // Extended
  type: string[];        // Beach, Mountain, City...
  famousFor: string;
  bestMonths: string[];  // ["Mar","Apr","May"]
  budgetTier: Budget;
  climate: string;
  visa: string;
  currency: string;
  languages: string[];
  topAttractions: string[];
  thingsToDo: string[];
  food: string[];
  shopping: string[];
  familyFriendly: boolean;
  honeymoonFriendly: boolean;
  adventure: number;     // 1-5
  nightlife: number;     // 1-5
  safety: number;        // 1-5
  transport: string[];
  airport: string;
  idealFor: IdealFor[];
  shortDesc: string;
  categories: string[];  // ties to CATEGORIES, e.g. "Beaches"
  gallery?: string[];
};

const u = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

// Helper to keep entries compact
type D = Partial<Destination> & Pick<Destination, "id" | "name" | "country" | "continent" | "image" | "shortDesc">;
const make = (d: D): Destination => ({
  rating: 4.7,
  season: "Year-round",
  budget: "$1,500",
  duration: "5 days",
  tags: [],
  type: ["City"],
  famousFor: "Iconic landmarks and culture",
  bestMonths: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  budgetTier: "Medium",
  climate: "Temperate",
  visa: "Check eligibility",
  currency: "USD",
  languages: ["English"],
  topAttractions: [],
  thingsToDo: [],
  food: [],
  shopping: [],
  familyFriendly: true,
  honeymoonFriendly: true,
  adventure: 3,
  nightlife: 3,
  safety: 4,
  transport: ["Metro", "Taxi", "Walk"],
  airport: "—",
  idealFor: ["Couples", "Friends"],
  categories: [],
  ...d,
});

export const DESTINATIONS: Destination[] = [
  // ============ JAPAN ============
  make({ id:"jp-tokyo", name:"Tokyo", country:"Japan", continent:"Asia",
    image:u("1540959733332-eab4deabeeaf"),
    shortDesc:"Neon-lit megacity where ancient shrines meet anime, sushi, and shinkansen.",
    rating:4.9, season:"Mar – May", budget:"$2,000", duration:"6 days",
    tags:["City","Food","Shopping"], type:["City","Modern"],
    famousFor:"Skyline, sushi, anime, Shibuya crossing",
    bestMonths:["Mar","Apr","May","Oct","Nov"], budgetTier:"Luxury",
    climate:"Humid subtropical", visa:"e-Visa for many nationalities",
    currency:"JPY", languages:["Japanese"],
    topAttractions:["Shibuya Crossing","Senso-ji Temple","Tokyo Skytree","Meiji Shrine","Akihabara"],
    thingsToDo:["Sushi omakase","Robot show","Studio Ghibli museum","Tsukiji food tour","Karaoke nights"],
    food:["Sushi","Ramen","Tempura","Wagyu","Mochi"],
    shopping:["Ginza","Harajuku","Akihabara","Shinjuku"],
    adventure:3, nightlife:5, safety:5,
    transport:["Metro","JR Rail","Taxi"], airport:"Haneda / Narita (HND/NRT)",
    idealFor:["Solo","Couples","Friends","Family"],
    categories:["Modern Cities","Food & Culinary Experiences","Shopping Destinations","Photography Hotspots"] }),

  make({ id:"jp-kyoto", name:"Kyoto", country:"Japan", continent:"Asia",
    image:"https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Thousand-year capital of geishas, golden pavilions, and cherry blossom poetry.",
    rating:4.9, season:"Mar – May", budget:"$1,800", duration:"5 days",
    tags:["Heritage","Cherry Blossom","Temples"], type:["Heritage","City"],
    famousFor:"Temples, geisha district, cherry blossoms", bestMonths:["Mar","Apr","May","Oct","Nov"],
    budgetTier:"Luxury", climate:"Humid subtropical", visa:"e-Visa for many", currency:"JPY", languages:["Japanese"],
    topAttractions:["Fushimi Inari","Kinkaku-ji","Arashiyama Bamboo Grove","Gion","Nijo Castle"],
    thingsToDo:["Tea ceremony","Geisha walk","Temple stay","Kimono experience"],
    food:["Kaiseki","Matcha","Yudofu","Tofu Ryori"],
    shopping:["Nishiki Market","Teramachi"],
    adventure:2, nightlife:3, safety:5,
    transport:["Bus","Subway","Bike"], airport:"Kansai (KIX)",
    idealFor:["Couples","Family","Solo"],
    categories:["Historical & Heritage Sites","Spiritual & Pilgrimage Places","Honeymoon Destinations","UNESCO World Heritage Sites","Photography Hotspots"] }),

  make({ id:"jp-osaka", name:"Osaka", country:"Japan", continent:"Asia",
    image:u("1590559899731-a382839e5549"),
    shortDesc:"Japan's kitchen — street food, neon Dotonbori, and a castle worth crossing seas for.",
    rating:4.7, season:"Mar – May", budget:"$1,600", duration:"4 days",
    tags:["Food","City"], type:["City","Food"], famousFor:"Street food & Osaka Castle",
    bestMonths:["Mar","Apr","May","Oct","Nov"], budgetTier:"Medium", currency:"JPY", languages:["Japanese"],
    topAttractions:["Osaka Castle","Dotonbori","Universal Studios","Umeda Sky"],
    thingsToDo:["Takoyaki tour","Universal Studios","Sumo viewing"],
    food:["Takoyaki","Okonomiyaki","Kushikatsu"], shopping:["Shinsaibashi","Amerikamura"],
    adventure:3, nightlife:5, safety:5, transport:["Metro","Train"], airport:"Kansai (KIX)",
    idealFor:["Family","Friends","Couples"],
    categories:["Food & Culinary Experiences","Theme Parks","Modern Cities","Family Vacations"] }),

  make({ id:"jp-fuji", name:"Mount Fuji", country:"Japan", continent:"Asia",
    image:u("1570459027562-4a916cc66e69"),
    shortDesc:"Sacred snow-capped volcano mirrored in five tranquil lakes.",
    rating:4.9, season:"Jul – Sep", budget:"$1,200", duration:"3 days",
    tags:["Mountain","Nature"], type:["Mountain","Volcano"],
    famousFor:"Iconic volcanic cone & climbing", bestMonths:["Jul","Aug","Sep"],
    budgetTier:"Medium", climate:"Alpine", currency:"JPY", languages:["Japanese"],
    topAttractions:["Fuji Five Lakes","Chureito Pagoda","Hakone"],
    thingsToDo:["Summit climb","Onsen","Lake cruise"],
    food:["Hoto noodles","Fuji apples"], adventure:5, nightlife:1, safety:5,
    airport:"Haneda (HND)", idealFor:["Solo","Couples","Friends"],
    categories:["Mountains & Hill Stations","Adventure & Trekking","Volcanoes & Geological Wonders","Photography Hotspots"] }),

  make({ id:"jp-nara", name:"Nara", country:"Japan", continent:"Asia",
    image:u("1528360983277-13d401cdc186"),
    shortDesc:"Ancient capital where bowing deer roam free among 8th-century temples.",
    rating:4.7, season:"Mar – May", budget:"$900", duration:"2 days",
    tags:["Heritage","Wildlife"], type:["Heritage","Wildlife"],
    famousFor:"Deer park & Todai-ji Buddha", currency:"JPY", languages:["Japanese"],
    topAttractions:["Nara Park","Todai-ji","Kasuga Shrine"], thingsToDo:["Deer feeding","Temple tour"],
    safety:5, airport:"Kansai (KIX)", idealFor:["Family","Couples"],
    categories:["Historical & Heritage Sites","Family Vacations","UNESCO World Heritage Sites"] }),

  make({ id:"jp-hiroshima", name:"Hiroshima", country:"Japan", continent:"Asia",
    image:u("1492571350019-22de08371fd3"),
    shortDesc:"A city of remembrance, resilience, and the floating torii of Miyajima.",
    rating:4.7, season:"Mar – Nov", budget:"$1,000", duration:"3 days",
    tags:["Heritage"], type:["Heritage","City"], famousFor:"Peace Memorial & Itsukushima Shrine",
    currency:"JPY", languages:["Japanese"],
    topAttractions:["Peace Park","Atomic Dome","Miyajima","Itsukushima Shrine"],
    safety:5, airport:"Hiroshima (HIJ)", idealFor:["Couples","Solo","Family"],
    categories:["Historical & Heritage Sites","UNESCO World Heritage Sites"] }),

  // ============ SWITZERLAND ============
  make({ id:"ch-zurich", name:"Zurich", country:"Switzerland", continent:"Europe",
    image:u("1515488764276-beab7607c1e6"),
    shortDesc:"Lakeside finance capital with old-town cobblestones and Alpine getaways.",
    rating:4.6, season:"Jun – Sep", budget:"$2,400", duration:"3 days",
    tags:["City","Luxury"], type:["City"], currency:"CHF", languages:["German","English"],
    topAttractions:["Lake Zurich","Old Town","Bahnhofstrasse"], adventure:3, nightlife:4, safety:5,
    airport:"Zurich (ZRH)", idealFor:["Couples","Family"],
    categories:["Modern Cities","Shopping Destinations"] }),

  make({ id:"ch-lucerne", name:"Lucerne", country:"Switzerland", continent:"Europe",
    image:u("1527668752968-14dc70a27c95"),
    shortDesc:"Storybook lake town under snow-dusted peaks and a wooden chapel bridge.",
    rating:4.8, season:"May – Sep", budget:"$2,200", duration:"3 days",
    tags:["Mountain","Lake"], type:["Mountain","Lake"], currency:"CHF", languages:["German"],
    topAttractions:["Chapel Bridge","Mt. Pilatus","Lion Monument"], adventure:4, safety:5,
    airport:"Zurich (ZRH)", idealFor:["Couples","Family"],
    categories:["Mountains & Hill Stations","Honeymoon Destinations","Photography Hotspots"] }),

  make({ id:"ch-interlaken", name:"Interlaken", country:"Switzerland", continent:"Europe",
    image:u("1530122037265-a5f1f91d3b99"),
    shortDesc:"Adventure capital between two turquoise lakes and the mighty Jungfrau.",
    rating:4.9, season:"Jun – Sep", budget:"$2,500", duration:"4 days",
    tags:["Adventure","Mountain"], type:["Mountain","Adventure"], currency:"CHF", languages:["German"],
    topAttractions:["Harder Kulm","Lake Thun","Lake Brienz"],
    thingsToDo:["Paragliding","Skydiving","Canyoning","Hiking"], adventure:5, safety:5,
    airport:"Bern (BRN)", idealFor:["Friends","Couples","Solo"],
    categories:["Adventure & Trekking","Mountains & Hill Stations","Honeymoon Destinations"] }),

  make({ id:"ch-jungfraujoch", name:"Jungfraujoch", country:"Switzerland", continent:"Europe",
    image:u("1531366936337-7c912a4589a7"),
    shortDesc:"'Top of Europe' — a glacial wonderland reached by Europe's highest railway.",
    rating:4.8, season:"Year-round", budget:"$2,800", duration:"2 days",
    tags:["Snow","Mountain"], type:["Snow","Mountain"], currency:"CHF", languages:["German"],
    topAttractions:["Sphinx Observatory","Ice Palace","Aletsch Glacier"],
    adventure:4, safety:5, airport:"Zurich (ZRH)", idealFor:["Couples","Family"],
    categories:["Snow Destinations","Mountains & Hill Stations","UNESCO World Heritage Sites"] }),

  make({ id:"ch-zermatt", name:"Zermatt", country:"Switzerland", continent:"Europe",
    image:"https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Car-free alpine village beneath the unmistakable pyramid of the Matterhorn.",
    rating:4.8, season:"Dec – Feb", budget:"$2,600", duration:"6 days",
    tags:["Snow","Mountains","Luxury"], type:["Snow","Mountain"], currency:"CHF", languages:["German"],
    topAttractions:["Matterhorn","Gornergrat","Glacier Paradise"], thingsToDo:["Skiing","Snowboarding","Heli-ski"],
    adventure:5, safety:5, airport:"Geneva (GVA)", idealFor:["Couples","Friends"],
    categories:["Snow Destinations","Mountains & Hill Stations","Honeymoon Destinations","Adventure & Trekking"] }),

  make({ id:"ch-geneva", name:"Geneva", country:"Switzerland", continent:"Europe",
    image:u("1581315629007-30b1d61b6f59"),
    shortDesc:"Lakeside diplomatic capital with the iconic Jet d'Eau and Alpine vistas.",
    rating:4.5, season:"May – Sep", budget:"$2,200", duration:"3 days",
    tags:["City","Lake"], currency:"CHF", languages:["French","English"],
    topAttractions:["Jet d'Eau","Old Town","CERN"], airport:"Geneva (GVA)", safety:5,
    idealFor:["Couples","Family"], categories:["Modern Cities","Shopping Destinations"] }),

  // ============ ITALY ============
  make({ id:"it-rome", name:"Rome", country:"Italy", continent:"Europe",
    image:u("1552832230-c0197dd311b5"),
    shortDesc:"Eternal city of emperors, gelato, and ruins that still take your breath away.",
    rating:4.9, season:"Apr – Jun", budget:"$1,800", duration:"5 days",
    tags:["Heritage","Food"], type:["Heritage","City"], currency:"EUR", languages:["Italian"],
    topAttractions:["Colosseum","Vatican","Trevi Fountain","Pantheon"], food:["Pasta","Pizza","Gelato"],
    safety:4, airport:"Fiumicino (FCO)", idealFor:["Couples","Family","Solo"],
    categories:["Historical & Heritage Sites","Food & Culinary Experiences","UNESCO World Heritage Sites"] }),

  make({ id:"it-venice", name:"Venice", country:"Italy", continent:"Europe",
    image:u("1523906834658-6e24ef2386f9"),
    shortDesc:"A floating fantasy of canals, gondolas, masked balls, and pastel palazzos.",
    rating:4.8, season:"Apr – Jun", budget:"$2,000", duration:"3 days",
    tags:["Romance","Heritage"], type:["Heritage","City"], currency:"EUR", languages:["Italian"],
    topAttractions:["St. Mark's Square","Grand Canal","Doge's Palace","Murano"],
    safety:4, airport:"Marco Polo (VCE)", idealFor:["Couples"],
    categories:["Honeymoon Destinations","Historical & Heritage Sites","UNESCO World Heritage Sites","Photography Hotspots"] }),

  make({ id:"it-florence", name:"Florence", country:"Italy", continent:"Europe",
    image:u("1543429776-2782fc8e1acd"),
    shortDesc:"Birthplace of the Renaissance — Michelangelo, the Duomo, and Tuscan dusks.",
    rating:4.8, season:"Apr – Jun", budget:"$1,800", duration:"4 days",
    tags:["Art","Heritage"], currency:"EUR", languages:["Italian"],
    topAttractions:["Duomo","Uffizi","Ponte Vecchio"], airport:"Florence (FLR)", safety:4,
    idealFor:["Couples","Solo"], categories:["Historical & Heritage Sites","UNESCO World Heritage Sites","Food & Culinary Experiences"] }),

  make({ id:"it-milan", name:"Milan", country:"Italy", continent:"Europe",
    image:u("1520440229-6469a149ac59"),
    shortDesc:"Italy's fashion capital — Gothic spires, designer boutiques, and aperitivo culture.",
    rating:4.6, season:"Apr – Jun", budget:"$1,800", duration:"3 days",
    tags:["Shopping","City"], currency:"EUR", languages:["Italian"],
    topAttractions:["Duomo","La Scala","Galleria Vittorio Emanuele"], airport:"Malpensa (MXP)",
    nightlife:5, idealFor:["Couples","Friends"], categories:["Shopping Destinations","Modern Cities","Food & Culinary Experiences"] }),

  make({ id:"it-amalfi", name:"Amalfi Coast", country:"Italy", continent:"Europe",
    image:"https://images.unsplash.com/photo-1530841377377-3ff06c0ca713?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Pastel cliffside villages tumbling into the impossibly blue Tyrrhenian Sea.",
    rating:4.8, season:"May – Sep", budget:"$2,400", duration:"7 days",
    tags:["Coast","Food","Romance"], type:["Coast","Beach"], currency:"EUR", languages:["Italian"],
    topAttractions:["Positano","Ravello","Amalfi town","Capri"], airport:"Naples (NAP)",
    idealFor:["Couples","Family"], categories:["Honeymoon Destinations","Beaches","Photography Hotspots","UNESCO World Heritage Sites"] }),

  // ============ FRANCE ============
  make({ id:"fr-paris", name:"Paris", country:"France", continent:"Europe",
    image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"The city of light, love, and a thousand café terraces.",
    rating:4.7, season:"Apr – Jun", budget:"$2,100", duration:"5 days",
    tags:["Romance","Food","Art"], currency:"EUR", languages:["French"],
    topAttractions:["Eiffel Tower","Louvre","Notre-Dame","Versailles"], food:["Croissant","Macarons","Steak frites"],
    nightlife:5, safety:4, airport:"CDG", idealFor:["Couples","Solo","Family"],
    categories:["Honeymoon Destinations","Food & Culinary Experiences","Shopping Destinations","Historical & Heritage Sites"] }),

  make({ id:"fr-nice", name:"Nice", country:"France", continent:"Europe",
    image:u("1491166617655-0723a0a1ac7c"),
    shortDesc:"French Riviera glamour — pebble beaches, belle époque hotels, sun-drenched markets.",
    rating:4.6, season:"May – Sep", budget:"$1,900", duration:"4 days",
    tags:["Beach","Riviera"], type:["Beach","City"], currency:"EUR",
    topAttractions:["Promenade des Anglais","Old Town","Castle Hill"], airport:"Nice (NCE)",
    idealFor:["Couples","Friends"], categories:["Beaches","Honeymoon Destinations","Modern Cities"] }),

  make({ id:"fr-lyon", name:"Lyon", country:"France", continent:"Europe",
    image:u("1524396309943-e03f5249f002"),
    shortDesc:"Gastronomic heart of France — bouchons, silk lanes, and Roman amphitheaters.",
    rating:4.6, season:"Apr – Oct", budget:"$1,500", duration:"3 days",
    tags:["Food","Heritage"], currency:"EUR", airport:"Lyon (LYS)",
    categories:["Food & Culinary Experiences","Historical & Heritage Sites","UNESCO World Heritage Sites"] }),

  make({ id:"fr-bordeaux", name:"Bordeaux", country:"France", continent:"Europe",
    image:u("1568797629192-1ec1a4f0bb1a"),
    shortDesc:"Elegant wine capital with grand boulevards and vineyards as far as you can ride.",
    rating:4.6, season:"May – Oct", budget:"$1,600", duration:"4 days",
    tags:["Wine","City"], currency:"EUR", airport:"Bordeaux (BOD)",
    categories:["Food & Culinary Experiences","UNESCO World Heritage Sites"] }),

  // ============ NORWAY / ICELAND / NORDICS ============
  make({ id:"no-lofoten", name:"Lofoten", country:"Norway", continent:"Europe",
    image:"https://images.unsplash.com/photo-1531168556467-80aace0d0144?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Jagged fjord peaks, red fishing huts, and dancing Northern Lights.",
    rating:4.9, season:"Sep – Mar", budget:"$2,800", duration:"8 days",
    tags:["Aurora","Fjords","Adventure"], type:["Mountain","Coast"], currency:"NOK",
    topAttractions:["Reine","Hamnoy","Trollfjord"], adventure:5, airport:"Leknes (LKN)",
    idealFor:["Couples","Friends"], categories:["Northern Lights","Mountains & Hill Stations","Photography Hotspots","Adventure & Trekking"] }),

  make({ id:"is-reykjavik", name:"Reykjavík", country:"Iceland", continent:"Europe",
    image:"https://images.unsplash.com/photo-1504109586057-7a2ae83d1338?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Volcanic playground of geysers, glaciers, waterfalls, and emerald auroras.",
    rating:4.8, season:"Oct – Mar", budget:"$3,000", duration:"6 days",
    tags:["Aurora","Volcanoes","Hot Springs"], type:["Volcano","Adventure"], currency:"ISK",
    topAttractions:["Blue Lagoon","Golden Circle","Jökulsárlón"], adventure:5, airport:"Keflavík (KEF)",
    categories:["Northern Lights","Volcanoes & Geological Wonders","Adventure & Trekking","Photography Hotspots"] }),

  make({ id:"fi-rovaniemi", name:"Rovaniemi", country:"Finland", continent:"Europe",
    image:u("1483347756197-71ef80e95f73"),
    shortDesc:"Official hometown of Santa, where snow forests glow under the Aurora Borealis.",
    rating:4.7, season:"Nov – Mar", budget:"$2,500", duration:"5 days",
    tags:["Aurora","Snow"], type:["Snow"], currency:"EUR", airport:"Rovaniemi (RVN)",
    topAttractions:["Santa Claus Village","Arctic Circle","Husky safari"],
    categories:["Northern Lights","Snow Destinations","Family Vacations"] }),

  // ============ MIDDLE EAST / AFRICA ============
  make({ id:"ae-dubai", name:"Dubai", country:"UAE", continent:"Asia",
    image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Audacious desert metropolis of record-breaking skylines and gold-leaf brunches.",
    rating:4.7, season:"Nov – Mar", budget:"$1,900", duration:"5 days",
    tags:["Luxury","Shopping","Desert"], type:["City","Desert"], currency:"AED", languages:["Arabic","English"],
    topAttractions:["Burj Khalifa","Palm Jumeirah","Dubai Mall","Desert Safari"],
    nightlife:5, safety:5, airport:"Dubai (DXB)",
    categories:["Modern Cities","Shopping Destinations","Theme Parks","Family Vacations"] }),

  make({ id:"eg-cairo", name:"Cairo", country:"Egypt", continent:"Africa",
    image:"https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Pyramids on the horizon, Nile feluccas drifting at sunset.",
    rating:4.6, season:"Oct – Apr", budget:"$1,200", duration:"6 days",
    tags:["Heritage","Pyramids","Desert"], type:["Heritage","Desert"], currency:"EGP", languages:["Arabic"],
    topAttractions:["Pyramids of Giza","Sphinx","Egyptian Museum","Khan el-Khalili"],
    airport:"Cairo (CAI)", categories:["Historical & Heritage Sites","UNESCO World Heritage Sites"] }),

  make({ id:"ke-masai", name:"Masai Mara", country:"Kenya", continent:"Africa",
    image:u("1516426122078-c23e76319801"),
    shortDesc:"The Great Migration thunders across savannahs of lions, leopards, and acacia.",
    rating:4.9, season:"Jul – Oct", budget:"$3,000", duration:"7 days",
    tags:["Wildlife","Safari"], type:["Wildlife"], currency:"KES",
    topAttractions:["Mara Reserve","Mara River","Balloon Safari"], adventure:5, airport:"Nairobi (NBO)",
    categories:["Wildlife & National Parks","Photography Hotspots","Adventure & Trekking"] }),

  make({ id:"za-capetown", name:"Cape Town", country:"South Africa", continent:"Africa",
    image:"https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Where Table Mountain meets two oceans — wine farms, penguins, and big skies.",
    rating:4.8, season:"Nov – Mar", budget:"$1,800", duration:"9 days",
    tags:["Wildlife","Coast","Adventure"], currency:"ZAR",
    topAttractions:["Table Mountain","Cape Point","Boulders Beach","V&A Waterfront"],
    airport:"Cape Town (CPT)", categories:["Mountains & Hill Stations","Wildlife & National Parks","Beaches","Adventure & Trekking"] }),

  // ============ AMERICAS / OCEANIA ============
  make({ id:"us-nyc", name:"New York City", country:"USA", continent:"North America",
    image:u("1496442226666-8d4d0e62e6e9"),
    shortDesc:"The city that never sleeps — skyscrapers, Broadway, and every cuisine on Earth.",
    rating:4.8, season:"Apr – Jun", budget:"$2,500", duration:"6 days",
    tags:["City","Shopping","Food"], currency:"USD", languages:["English"],
    topAttractions:["Statue of Liberty","Central Park","Times Square","MoMA"], nightlife:5, airport:"JFK / LGA",
    categories:["Modern Cities","Shopping Destinations","Food & Culinary Experiences","Theme Parks"] }),

  make({ id:"us-grandcanyon", name:"Grand Canyon", country:"USA", continent:"North America",
    image:u("1474044159687-1ee9f3a51722"),
    shortDesc:"A mile-deep crimson masterpiece carved by the Colorado over six million years.",
    rating:4.9, season:"Mar – May", budget:"$1,500", duration:"4 days",
    tags:["Nature","Adventure"], type:["Canyon","Adventure"], currency:"USD",
    adventure:5, airport:"Flagstaff (FLG)",
    categories:["Nature & Flower Valleys","Adventure & Trekking","UNESCO World Heritage Sites","Photography Hotspots"] }),

  make({ id:"ca-banff", name:"Banff", country:"Canada", continent:"North America",
    image:u("1609825488888-3a766db05542"),
    shortDesc:"Turquoise glacial lakes mirrored by snow-laced Rockies and grizzly forests.",
    rating:4.9, season:"Jun – Sep", budget:"$2,200", duration:"6 days",
    tags:["Mountain","Nature"], currency:"CAD",
    topAttractions:["Lake Louise","Moraine Lake","Banff Gondola"], adventure:5, airport:"Calgary (YYC)",
    categories:["Mountains & Hill Stations","Nature & Flower Valleys","UNESCO World Heritage Sites","Photography Hotspots"] }),

  make({ id:"br-rio", name:"Rio de Janeiro", country:"Brazil", continent:"South America",
    image:u("1483729558449-99ef09a8c325"),
    shortDesc:"Samba, sand, and Sugarloaf — Brazil's sunlit, soulful party capital.",
    rating:4.7, season:"Dec – Mar", budget:"$1,500", duration:"6 days",
    tags:["Beach","City","Nightlife"], currency:"BRL", languages:["Portuguese"],
    topAttractions:["Christ the Redeemer","Copacabana","Sugarloaf","Ipanema"], nightlife:5, airport:"Rio (GIG)",
    categories:["Beaches","Modern Cities","Honeymoon Destinations","Food & Culinary Experiences"] }),

  make({ id:"pe-cusco", name:"Cusco & Machu Picchu", country:"Peru", continent:"South America",
    image:"https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Inca ruins in cloud forests — a pilgrimage every traveler should make once.",
    rating:4.9, season:"May – Sep", budget:"$1,500", duration:"8 days",
    tags:["Trekking","Heritage","Adventure"], currency:"PEN",
    topAttractions:["Machu Picchu","Sacred Valley","Rainbow Mountain"], adventure:5, airport:"Cusco (CUZ)",
    categories:["Historical & Heritage Sites","Adventure & Trekking","UNESCO World Heritage Sites","Mountains & Hill Stations"] }),

  make({ id:"au-sydney", name:"Sydney", country:"Australia", continent:"Oceania",
    image:u("1506973035872-a4ec16b8e8d9"),
    shortDesc:"Iconic harbour city of opera sails, surf beaches, and laid-back style.",
    rating:4.8, season:"Sep – Nov", budget:"$2,200", duration:"7 days",
    tags:["City","Beach"], currency:"AUD", languages:["English"],
    topAttractions:["Opera House","Harbour Bridge","Bondi Beach","Blue Mountains"], airport:"Sydney (SYD)",
    categories:["Modern Cities","Beaches","Family Vacations","Photography Hotspots"] }),

  make({ id:"nz-queenstown", name:"Queenstown", country:"New Zealand", continent:"Oceania",
    image:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Adventure capital of the world — bungee, jet boats, glaciers, and Middle Earth.",
    rating:4.9, season:"Dec – Feb", budget:"$2,500", duration:"10 days",
    tags:["Adventure","Mountains","Lakes"], currency:"NZD",
    topAttractions:["Lake Wakatipu","Milford Sound","Skyline Gondola"], adventure:5, airport:"Queenstown (ZQN)",
    categories:["Adventure & Trekking","Mountains & Hill Stations","Road Trips","Photography Hotspots"] }),

  // ============ MORE ASIA ============
  make({ id:"th-bangkok", name:"Bangkok", country:"Thailand", continent:"Asia",
    image:u("1508009603885-50cf7c579365"),
    shortDesc:"Tuk-tuks, temples, and floating markets — Asia's most electric capital.",
    rating:4.6, season:"Nov – Feb", budget:"$900", duration:"5 days",
    tags:["City","Food","Nightlife"], currency:"THB",
    topAttractions:["Grand Palace","Wat Arun","Chatuchak"], nightlife:5, airport:"Suvarnabhumi (BKK)",
    categories:["Modern Cities","Food & Culinary Experiences","Shopping Destinations","Backpacking Trips"] }),

  make({ id:"th-chiangmai", name:"Chiang Mai", country:"Thailand", continent:"Asia",
    image:"https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Mountain temples, elephant sanctuaries, and lanterns that float to the moon.",
    rating:4.6, season:"Nov – Feb", budget:"$900", duration:"7 days",
    tags:["Backpacking","Temples","Food"], currency:"THB",
    topAttractions:["Doi Suthep","Old City","Elephant Nature Park"], airport:"Chiang Mai (CNX)",
    categories:["Backpacking Trips","Spiritual & Pilgrimage Places","Mountains & Hill Stations"] }),

  make({ id:"mv-male", name:"Maldives", country:"Maldives", continent:"Asia",
    image:"https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Overwater villas above kaleidoscopic reefs — the ultimate barefoot luxury.",
    rating:4.9, season:"Nov – Apr", budget:"$3,200", duration:"5 days",
    tags:["Beach","Honeymoon","Diving"], type:["Island","Beach"], currency:"MVR",
    topAttractions:["Overwater villas","Reef diving","Sandbank picnic"], airport:"Malé (MLE)",
    categories:["Islands","Honeymoon Destinations","Beaches","Cruise Destinations"] }),

  make({ id:"id-bali", name:"Bali", country:"Indonesia", continent:"Asia",
    image:"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Rice terraces, temples in the sea, and the world's friendliest sunsets.",
    rating:4.8, season:"Apr – Oct", budget:"$1,300", duration:"8 days",
    tags:["Beach","Spiritual","Wellness"], type:["Island","Beach"], currency:"IDR",
    topAttractions:["Ubud","Tanah Lot","Uluwatu","Nusa Penida"], airport:"Denpasar (DPS)",
    categories:["Islands","Beaches","Honeymoon Destinations","Spiritual & Pilgrimage Places"] }),

  make({ id:"sg-sg", name:"Singapore", country:"Singapore", continent:"Asia",
    image:"https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Garden-city of supertrees, Michelin hawkers, and pristine futurism.",
    rating:4.7, season:"Year-round", budget:"$1,700", duration:"4 days",
    tags:["Urban","Food","Family"], currency:"SGD",
    topAttractions:["Marina Bay Sands","Gardens by the Bay","Sentosa","Universal Studios"], airport:"Changi (SIN)",
    categories:["Modern Cities","Family Vacations","Theme Parks","Food & Culinary Experiences","Shopping Destinations"] }),

  make({ id:"tr-cappadocia", name:"Cappadocia", country:"Türkiye", continent:"Asia",
    image:"https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"Hot-air balloons drifting over fairy chimneys at dawn — pure magic.",
    rating:4.9, season:"Apr – Oct", budget:"$1,400", duration:"5 days",
    tags:["Balloons","Heritage","Photography"], type:["Heritage","Geology"], currency:"TRY",
    topAttractions:["Hot air balloons","Göreme","Underground cities"], airport:"Kayseri (ASR)",
    categories:["Volcanoes & Geological Wonders","Photography Hotspots","UNESCO World Heritage Sites","Honeymoon Destinations"] }),

  make({ id:"gr-santorini", name:"Santorini", country:"Greece", continent:"Europe",
    image:u("1570077188670-e3a8d69ac5ff"),
    shortDesc:"Whitewashed cliffside villages above an indigo caldera at sunset.",
    rating:4.8, season:"May – Sep", budget:"$2,200", duration:"5 days",
    tags:["Islands","Romance","Sunset"], type:["Island","Beach"], currency:"EUR",
    topAttractions:["Oia","Fira","Red Beach"], airport:"Santorini (JTR)",
    categories:["Islands","Honeymoon Destinations","Beaches","Photography Hotspots"] }),

  // ============ INDIA ============
  make({ id:"in-kashmir", name:"Kashmir", country:"India", continent:"Asia",
    image:u("1593181629936-11c609b8db9b"),
    shortDesc:"Paradise on Earth — shikara rides on Dal Lake under snow-veiled Pir Panjal.",
    rating:4.9, season:"Apr – Oct", budget:"₹35,000", duration:"6 days",
    tags:["Mountain","Snow"], type:["Mountain","Snow"], budgetTier:"Medium",
    currency:"INR", languages:["Kashmiri","Hindi","Urdu"],
    topAttractions:["Dal Lake","Gulmarg","Pahalgam","Sonmarg"],
    thingsToDo:["Shikara ride","Gondola at Gulmarg","Skiing","Houseboat stay"],
    food:["Rogan Josh","Yakhni","Kahwa","Wazwan"], shopping:["Pashmina","Saffron","Walnut wood"],
    adventure:4, safety:3, airport:"Srinagar (SXR)", idealFor:["Couples","Family","Friends"],
    categories:["Mountains & Hill Stations","Snow Destinations","Honeymoon Destinations","Nature & Flower Valleys"] }),

  make({ id:"in-ladakh", name:"Leh-Ladakh", country:"India", continent:"Asia",
    image:u("1626621341517-bbf3d9990a23"),
    shortDesc:"Moonscape monasteries, prayer flags, and the world's highest motorable passes.",
    rating:4.9, season:"May – Sep", budget:"₹45,000", duration:"8 days",
    tags:["Adventure","Mountain"], type:["Mountain","Desert"], budgetTier:"Medium",
    currency:"INR", languages:["Ladakhi","Hindi"],
    topAttractions:["Pangong Lake","Nubra Valley","Magnetic Hill","Thiksey Monastery"],
    thingsToDo:["Bike trip","Camel safari","Monastery visits","River rafting"],
    food:["Thukpa","Momos","Skyu"], adventure:5, safety:4, airport:"Leh (IXL)",
    idealFor:["Friends","Solo","Couples"],
    categories:["Mountains & Hill Stations","Adventure & Trekking","Road Trips","Spiritual & Pilgrimage Places"] }),

  make({ id:"in-goa", name:"Goa", country:"India", continent:"Asia",
    image:u("1512343879784-a960bf40e7f2"),
    shortDesc:"Susegad living — palm-fringed beaches, Portuguese churches, all-night shacks.",
    rating:4.6, season:"Nov – Feb", budget:"₹25,000", duration:"5 days",
    tags:["Beach","Nightlife"], type:["Beach"], budgetTier:"Low", currency:"INR", languages:["Konkani","Hindi","English"],
    topAttractions:["Baga","Anjuna","Old Goa","Dudhsagar Falls"],
    thingsToDo:["Beach hopping","Water sports","Cruise","Flea markets"],
    food:["Vindaloo","Xacuti","Bebinca","Seafood"], shopping:["Anjuna market","Mapusa market"],
    nightlife:5, airport:"Dabolim (GOI)", idealFor:["Friends","Couples","Solo"],
    categories:["Beaches","Honeymoon Destinations","Backpacking Trips","Food & Culinary Experiences"] }),

  make({ id:"in-kerala", name:"Kerala", country:"India", continent:"Asia",
    image:u("1602216056096-3b40cc0c9944"),
    shortDesc:"God's Own Country — backwater houseboats, spice gardens, and Kathakali nights.",
    rating:4.8, season:"Sep – Mar", budget:"₹30,000", duration:"7 days",
    tags:["Backwaters","Nature"], type:["Coast","Nature"], budgetTier:"Medium",
    currency:"INR", languages:["Malayalam","English"],
    topAttractions:["Alleppey","Munnar","Kochi","Kumarakom","Wayanad"],
    thingsToDo:["Houseboat cruise","Tea plantations","Ayurveda spa","Kathakali"],
    food:["Sadya","Appam","Karimeen","Puttu"], airport:"Kochi (COK)",
    idealFor:["Couples","Family"],
    categories:["Honeymoon Destinations","Nature & Flower Valleys","Wildlife & National Parks","Mountains & Hill Stations"] }),

  make({ id:"in-ooty", name:"Ooty", country:"India", continent:"Asia",
    image:u("1580500550469-4e07bb3edec8"),
    shortDesc:"Queen of the Nilgiris — eucalyptus valleys, toy trains, and tea-carpeted hills.",
    rating:4.5, season:"Mar – Jun, Sep – Nov", budget:"₹18,000", duration:"4 days",
    tags:["Hill Station"], type:["Mountain"], budgetTier:"Low", currency:"INR",
    topAttractions:["Botanical Garden","Doddabetta","Nilgiri Mountain Railway","Ooty Lake"],
    airport:"Coimbatore (CJB)", idealFor:["Family","Couples"],
    categories:["Mountains & Hill Stations","Family Vacations","Honeymoon Destinations"] }),

  make({ id:"in-kodaikanal", name:"Kodaikanal", country:"India", continent:"Asia",
    image:u("1606200348085-1cdb38ed7d6c"),
    shortDesc:"Princess of hill stations — misty pine forests around a star-shaped lake.",
    rating:4.5, season:"Apr – Jun, Sep – Oct", budget:"₹16,000", duration:"3 days",
    tags:["Hill Station"], budgetTier:"Low", currency:"INR",
    topAttractions:["Kodai Lake","Coaker's Walk","Pillar Rocks"], airport:"Madurai (IXM)",
    categories:["Mountains & Hill Stations","Honeymoon Destinations","Nature & Flower Valleys"] }),

  make({ id:"in-coorg", name:"Coorg", country:"India", continent:"Asia",
    image:u("1572798104484-c9572cc04699"),
    shortDesc:"Scotland of India — coffee plantations, waterfalls, and Western Ghat mists.",
    rating:4.6, season:"Oct – Mar", budget:"₹18,000", duration:"4 days",
    tags:["Hill Station","Nature"], budgetTier:"Low", currency:"INR",
    topAttractions:["Abbey Falls","Raja's Seat","Dubare Elephant Camp"], airport:"Mangalore (IXE)",
    categories:["Mountains & Hill Stations","Nature & Flower Valleys","Honeymoon Destinations"] }),

  make({ id:"in-jaipur", name:"Jaipur", country:"India", continent:"Asia",
    image:"https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    shortDesc:"The Pink City — Rajput palaces, bazaars of mirror work, and royal high tea.",
    rating:4.7, season:"Oct – Mar", budget:"₹22,000", duration:"5 days",
    tags:["Heritage","Royal","Food"], type:["Heritage","City"], budgetTier:"Low",
    currency:"INR", languages:["Hindi","Rajasthani","English"],
    topAttractions:["Amber Fort","Hawa Mahal","City Palace","Jantar Mantar"],
    food:["Dal Baati","Laal Maas","Ghewar"], shopping:["Johari Bazaar","Bapu Bazaar"],
    airport:"Jaipur (JAI)", idealFor:["Family","Couples","Friends"],
    categories:["Historical & Heritage Sites","Family Vacations","Shopping Destinations","UNESCO World Heritage Sites"] }),

  make({ id:"in-udaipur", name:"Udaipur", country:"India", continent:"Asia",
    image:u("1609920658906-8223bd289001"),
    shortDesc:"City of lakes and palaces — Rajasthan at its most regal and romantic.",
    rating:4.8, season:"Sep – Mar", budget:"₹25,000", duration:"4 days",
    tags:["Heritage","Romance"], budgetTier:"Medium", currency:"INR",
    topAttractions:["Lake Pichola","City Palace","Jag Mandir"], airport:"Udaipur (UDR)",
    idealFor:["Couples"], categories:["Honeymoon Destinations","Historical & Heritage Sites","Photography Hotspots"] }),

  make({ id:"in-rishikesh", name:"Rishikesh", country:"India", continent:"Asia",
    image:u("1591018653737-3c47e5bf16df"),
    shortDesc:"Yoga capital of the world — Ganga aartis, rafting, and the Beatles' ashram.",
    rating:4.7, season:"Sep – May", budget:"₹15,000", duration:"4 days",
    tags:["Spiritual","Adventure"], budgetTier:"Low", currency:"INR",
    topAttractions:["Triveni Ghat","Laxman Jhula","Beatles Ashram"],
    thingsToDo:["Rafting","Bungee","Yoga retreats"], adventure:5, airport:"Dehradun (DED)",
    categories:["Spiritual & Pilgrimage Places","Adventure & Trekking","Backpacking Trips"] }),

  make({ id:"in-manali", name:"Manali", country:"India", continent:"Asia",
    image:u("1626621341517-bbf3d9990a23"),
    shortDesc:"Snowy peaks, apple orchards, and Himalayan hippie cafés in the Kullu Valley.",
    rating:4.6, season:"Oct – Jun", budget:"₹20,000", duration:"5 days",
    tags:["Snow","Mountain"], budgetTier:"Low", currency:"INR",
    topAttractions:["Rohtang Pass","Solang Valley","Hadimba Temple"], airport:"Bhuntar (KUU)",
    adventure:5, categories:["Mountains & Hill Stations","Snow Destinations","Adventure & Trekking","Honeymoon Destinations"] }),

  make({ id:"in-shimla", name:"Shimla", country:"India", continent:"Asia",
    image:u("1605649461784-edc01e09b6d2"),
    shortDesc:"Colonial-era summer capital — toy trains and pine-scented Mall Road strolls.",
    rating:4.5, season:"Mar – Jun, Dec – Jan", budget:"₹18,000", duration:"4 days",
    tags:["Hill Station","Heritage"], budgetTier:"Low", currency:"INR",
    topAttractions:["Mall Road","Christ Church","Kufri"], airport:"Shimla (SLV)",
    categories:["Mountains & Hill Stations","Family Vacations","Historical & Heritage Sites"] }),

  make({ id:"in-meghalaya", name:"Meghalaya", country:"India", continent:"Asia",
    image:u("1626621341517-bbf3d9990a23"),
    shortDesc:"Abode of clouds — living root bridges, the cleanest village, and endless rain.",
    rating:4.8, season:"Oct – May", budget:"₹25,000", duration:"6 days",
    tags:["Nature","Adventure"], budgetTier:"Medium", currency:"INR",
    topAttractions:["Cherrapunji","Mawlynnong","Living Root Bridges","Dawki"],
    adventure:5, airport:"Shillong (SHL)",
    categories:["Nature & Flower Valleys","Adventure & Trekking","Photography Hotspots"] }),

  make({ id:"in-andaman", name:"Andaman & Nicobar", country:"India", continent:"Asia",
    image:u("1583212292454-1fe6229603b7"),
    shortDesc:"India's secret paradise — coral atolls, glass-clear seas, and untouched beaches.",
    rating:4.8, season:"Oct – May", budget:"₹40,000", duration:"6 days",
    tags:["Beach","Island"], type:["Island","Beach"], budgetTier:"Medium", currency:"INR",
    topAttractions:["Radhanagar Beach","Cellular Jail","Neil Island"], airport:"Port Blair (IXZ)",
    categories:["Islands","Beaches","Honeymoon Destinations","Cruise Destinations"] }),

  make({ id:"in-lakshadweep", name:"Lakshadweep", country:"India", continent:"Asia",
    image:u("1505228395891-9a51e7e86bf6"),
    shortDesc:"Coral lagoons and atolls — India's own quiet Maldives.",
    rating:4.8, season:"Oct – May", budget:"₹45,000", duration:"5 days",
    tags:["Beach","Island"], budgetTier:"Luxury", currency:"INR",
    topAttractions:["Agatti","Bangaram","Kavaratti"], airport:"Agatti (AGX)",
    categories:["Islands","Beaches","Honeymoon Destinations"] }),

  make({ id:"in-darjeeling", name:"Darjeeling", country:"India", continent:"Asia",
    image:u("1599031461229-2e0c3b9e0e7d"),
    shortDesc:"Tea-terraced slopes with the dawn glow of Kanchenjunga in your morning cup.",
    rating:4.6, season:"Mar – May, Sep – Nov", budget:"₹18,000", duration:"4 days",
    tags:["Hill Station","Tea"], budgetTier:"Low", currency:"INR",
    topAttractions:["Tiger Hill","Toy Train","Tea Gardens"], airport:"Bagdogra (IXB)",
    categories:["Mountains & Hill Stations","UNESCO World Heritage Sites","Honeymoon Destinations"] }),

  make({ id:"in-sikkim", name:"Sikkim", country:"India", continent:"Asia",
    image:u("1605649461784-edc01e09b6d2"),
    shortDesc:"Buddhist monasteries beneath Kanchenjunga and rhododendron flower valleys.",
    rating:4.8, season:"Mar – May, Oct – Dec", budget:"₹28,000", duration:"6 days",
    tags:["Mountain","Spiritual"], budgetTier:"Medium", currency:"INR",
    topAttractions:["Gangtok","Tsomgo Lake","Nathula","Yumthang Valley"], airport:"Pakyong (PYG)",
    categories:["Mountains & Hill Stations","Spiritual & Pilgrimage Places","Nature & Flower Valleys"] }),

  make({ id:"in-varanasi", name:"Varanasi", country:"India", continent:"Asia",
    image:u("1561361398-a8f6f8b41039"),
    shortDesc:"World's oldest living city — Ganga ghats, aarti fires, and timeless silence.",
    rating:4.7, season:"Oct – Mar", budget:"₹15,000", duration:"3 days",
    tags:["Spiritual","Heritage"], budgetTier:"Low", currency:"INR",
    topAttractions:["Dashashwamedh Ghat","Kashi Vishwanath","Sarnath"], airport:"Varanasi (VNS)",
    categories:["Spiritual & Pilgrimage Places","Historical & Heritage Sites","Photography Hotspots"] }),

  make({ id:"in-agra", name:"Agra", country:"India", continent:"Asia",
    image:u("1564507592333-c60657eea523"),
    shortDesc:"Home to the Taj Mahal — a poem in marble built for love.",
    rating:4.8, season:"Oct – Mar", budget:"₹15,000", duration:"2 days",
    tags:["Heritage","Romance"], budgetTier:"Low", currency:"INR",
    topAttractions:["Taj Mahal","Agra Fort","Fatehpur Sikri"], airport:"Agra (AGR)",
    categories:["Historical & Heritage Sites","UNESCO World Heritage Sites","Honeymoon Destinations","Photography Hotspots"] }),

  make({ id:"in-hampi", name:"Hampi", country:"India", continent:"Asia",
    image:u("1582719508461-905c673771fd"),
    shortDesc:"Vijayanagara ruins scattered across a surreal boulder-strewn landscape.",
    rating:4.7, season:"Oct – Feb", budget:"₹14,000", duration:"3 days",
    tags:["Heritage"], budgetTier:"Low", currency:"INR",
    topAttractions:["Virupaksha Temple","Vittala Temple","Stone Chariot"], airport:"Hubli (HBX)",
    categories:["Historical & Heritage Sites","UNESCO World Heritage Sites","Backpacking Trips"] }),

  make({ id:"in-mysuru", name:"Mysuru", country:"India", continent:"Asia",
    image:u("1599661046289-e31897846e41"),
    shortDesc:"City of palaces — silk, sandalwood, and the dazzling Dussehra durbar.",
    rating:4.6, season:"Oct – Mar", budget:"₹15,000", duration:"3 days",
    tags:["Heritage"], budgetTier:"Low", currency:"INR",
    topAttractions:["Mysore Palace","Chamundi Hill","Brindavan Gardens"], airport:"Mysuru (MYQ)",
    categories:["Historical & Heritage Sites","Family Vacations","Shopping Destinations"] }),

  make({ id:"in-hyderabad", name:"Hyderabad", country:"India", continent:"Asia",
    image:u("1623238913973-21e45cced554"),
    shortDesc:"City of pearls and biryani — Nizami heritage meets futuristic Cyberabad.",
    rating:4.6, season:"Oct – Feb", budget:"₹18,000", duration:"3 days",
    tags:["Heritage","Food"], budgetTier:"Low", currency:"INR",
    topAttractions:["Charminar","Golconda Fort","Ramoji Film City"], airport:"Hyderabad (HYD)",
    categories:["Modern Cities","Food & Culinary Experiences","Historical & Heritage Sites"] }),

  make({ id:"in-delhi", name:"Delhi", country:"India", continent:"Asia",
    image:u("1587474260584-136574528ed5"),
    shortDesc:"Where Mughal monuments meet metro lines and the spiciest street food on Earth.",
    rating:4.5, season:"Oct – Mar", budget:"₹18,000", duration:"4 days",
    tags:["Heritage","Food","City"], budgetTier:"Low", currency:"INR",
    topAttractions:["Red Fort","Qutub Minar","India Gate","Humayun's Tomb"], airport:"Delhi (DEL)",
    categories:["Historical & Heritage Sites","Food & Culinary Experiences","Shopping Destinations","UNESCO World Heritage Sites"] }),

  // ============ INDIA — EXPANDED COVERAGE (all states & UTs) ============
  ...(() => {
    const img = (q: string) => `https://source.unsplash.com/1600x1000/?${encodeURIComponent(q)}`;
    type Row = {
      id: string; name: string; state: string; region: string;
      desc: string; kind: string; cats: string[]; airport?: string; season?: string;
      months?: string[]; budgetTier?: Budget; tier?: string; imgQ?: string;
    };
    const rows: Row[] = [
      // ---------- North India ----------
      // Jammu & Kashmir / Ladakh
      { id:"in-jammu", name:"Jammu", state:"Jammu & Kashmir", region:"North India", desc:"City of temples and gateway to Vaishno Devi.", kind:"City", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], airport:"Jammu (IXJ)", imgQ:"Jammu temple India" },
      { id:"in-vaishno-devi", name:"Vaishno Devi (Katra)", state:"Jammu & Kashmir", region:"North India", desc:"Sacred trek to the Mata Vaishno Devi cave shrine in the Trikuta hills.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Mountains & Hill Stations"], imgQ:"Vaishno Devi Katra" },
      { id:"in-gulmarg", name:"Gulmarg", state:"Jammu & Kashmir", region:"North India", desc:"Meadow of flowers turned into a world-class ski resort under Apharwat.", kind:"Snow", cats:["Snow Destinations","Mountains & Hill Stations","Adventure & Trekking"], imgQ:"Gulmarg Kashmir snow" },
      { id:"in-pahalgam", name:"Pahalgam", state:"Jammu & Kashmir", region:"North India", desc:"Valley of shepherds where the Lidder river dances between pine slopes.", kind:"Valley", cats:["Mountains & Hill Stations","Nature & Flower Valleys"], imgQ:"Pahalgam Kashmir valley" },
      { id:"in-sonmarg", name:"Sonmarg", state:"Jammu & Kashmir", region:"North India", desc:"'Meadow of Gold' — glaciers, alpine lakes, and the Zoji La gateway.", kind:"Valley", cats:["Mountains & Hill Stations","Snow Destinations"], imgQ:"Sonmarg Kashmir" },
      { id:"in-pangong", name:"Pangong Tso", state:"Ladakh", region:"North India", desc:"Shape-shifting sapphire lake straddling India and Tibet at 4,350 m.", kind:"Lake", cats:["Nature & Flower Valleys","Photography Hotspots","Mountains & Hill Stations"], imgQ:"Pangong lake Ladakh" },
      { id:"in-nubra", name:"Nubra Valley", state:"Ladakh", region:"North India", desc:"Sand dunes, double-humped camels, and monasteries beyond Khardung La.", kind:"Valley", cats:["Adventure & Trekking","Desert","Road Trips"], imgQ:"Nubra valley Ladakh" },
      { id:"in-tsomoriri", name:"Tso Moriri", state:"Ladakh", region:"North India", desc:"High-altitude Ramsar wetland, migratory birds and Changpa nomads.", kind:"Lake", cats:["Nature & Flower Valleys","Wildlife & National Parks"], imgQ:"Tso Moriri Ladakh" },

      // Himachal
      { id:"in-dharamshala", name:"Dharamshala & McLeodganj", state:"Himachal Pradesh", region:"North India", desc:"Little Lhasa — Dalai Lama's home, Dhauladhar views, Tibetan cafes.", kind:"Hill Station", cats:["Mountains & Hill Stations","Spiritual & Pilgrimage Places"], imgQ:"Dharamshala McLeodganj" },
      { id:"in-dalhousie", name:"Dalhousie", state:"Himachal Pradesh", region:"North India", desc:"Colonial-era hill retreat of pine-covered ridges and Chamba art.", kind:"Hill Station", cats:["Mountains & Hill Stations","Honeymoon Destinations"], imgQ:"Dalhousie Himachal" },
      { id:"in-kasol", name:"Kasol & Parvati Valley", state:"Himachal Pradesh", region:"North India", desc:"Riverside backpacker haven of pine forests, treks, and Israeli cafés.", kind:"Valley", cats:["Backpacking Trips","Mountains & Hill Stations","Adventure & Trekking"], imgQ:"Kasol Parvati valley" },
      { id:"in-spiti", name:"Spiti Valley", state:"Himachal Pradesh", region:"North India", desc:"Cold desert of monasteries — Key, Tabo, Chandratal, and the moon-like Kaza.", kind:"Cold Desert", cats:["Adventure & Trekking","Road Trips","Spiritual & Pilgrimage Places"], imgQ:"Spiti valley Kaza" },
      { id:"in-kufri", name:"Kufri", state:"Himachal Pradesh", region:"North India", desc:"Snow slopes and pony rides above Shimla's Mahasu ridge.", kind:"Snow", cats:["Snow Destinations","Family Vacations"], imgQ:"Kufri Shimla snow" },
      { id:"in-khajjiar", name:"Khajjiar", state:"Himachal Pradesh", region:"North India", desc:"'Mini Switzerland' — a saucer-shaped meadow ringed by deodars.", kind:"Meadow", cats:["Nature & Flower Valleys","Mountains & Hill Stations"], imgQ:"Khajjiar Himachal" },
      { id:"in-bir", name:"Bir Billing", state:"Himachal Pradesh", region:"North India", desc:"Paragliding capital of India with monasteries and cafés at 2,400 m.", kind:"Adventure", cats:["Adventure & Trekking","Mountains & Hill Stations"], imgQ:"Bir Billing paragliding" },

      // Punjab
      { id:"in-amritsar", name:"Amritsar", state:"Punjab", region:"North India", desc:"The Golden Temple's kirtan, langar, and Wagah's thundering flag ceremony.", kind:"City", cats:["Spiritual & Pilgrimage Places","Food & Culinary Experiences","Historical & Heritage Sites"], airport:"Amritsar (ATQ)", imgQ:"Golden Temple Amritsar" },
      { id:"in-anandpur", name:"Anandpur Sahib", state:"Punjab", region:"North India", desc:"City of bliss — Takht Sri Kesgarh and the Khalsa's birthplace.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Anandpur Sahib" },

      // Chandigarh
      { id:"in-chandigarh", name:"Chandigarh", state:"Chandigarh", region:"North India", desc:"Le Corbusier's planned utopia — Rock Garden, Sukhna Lake, wide boulevards.", kind:"City", cats:["Modern Cities","UNESCO World Heritage Sites"], airport:"Chandigarh (IXC)", imgQ:"Chandigarh Rock Garden" },

      // Haryana
      { id:"in-kurukshetra", name:"Kurukshetra", state:"Haryana", region:"North India", desc:"Land of the Mahabharata — Brahma Sarovar and Krishna's Gita upadesha.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Kurukshetra Brahma Sarovar" },
      { id:"in-sultanpur", name:"Sultanpur Bird Sanctuary", state:"Haryana", region:"North India", desc:"Winter haven for cranes, flamingos, and 250+ migratory species near Gurgaon.", kind:"Wildlife", cats:["Wildlife & National Parks","Nature & Flower Valleys"], imgQ:"Sultanpur bird sanctuary" },

      // Uttarakhand
      { id:"in-nainital", name:"Nainital", state:"Uttarakhand", region:"North India", desc:"Emerald eye-shaped lake ringed by seven Kumaoni hills and colonial villas.", kind:"Hill Station", cats:["Mountains & Hill Stations","Family Vacations"], imgQ:"Nainital lake" },
      { id:"in-mussoorie", name:"Mussoorie", state:"Uttarakhand", region:"North India", desc:"'Queen of the hills' — misty ridges, Mall Road, and Kempty Falls.", kind:"Hill Station", cats:["Mountains & Hill Stations","Honeymoon Destinations"], imgQ:"Mussoorie hills" },
      { id:"in-haridwar", name:"Haridwar", state:"Uttarakhand", region:"North India", desc:"Gateway to the gods — Har Ki Pauri aarti where the Ganga leaves the mountains.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Haridwar Ganga aarti" },
      { id:"in-auli", name:"Auli", state:"Uttarakhand", region:"North India", desc:"Powder-white ski slopes with Nanda Devi framing every turn.", kind:"Snow", cats:["Snow Destinations","Adventure & Trekking","Mountains & Hill Stations"], imgQ:"Auli ski Uttarakhand" },
      { id:"in-jim-corbett", name:"Jim Corbett National Park", state:"Uttarakhand", region:"North India", desc:"India's oldest tiger reserve — sal forests, Ramganga river, elephant herds.", kind:"Wildlife", cats:["Wildlife & National Parks","Nature & Flower Valleys"], imgQ:"Jim Corbett tiger" },
      { id:"in-valley-flowers", name:"Valley of Flowers", state:"Uttarakhand", region:"North India", desc:"UNESCO alpine valley bursting into hundreds of endemic blooms each monsoon.", kind:"Valley", cats:["Nature & Flower Valleys","UNESCO World Heritage Sites","Adventure & Trekking"], imgQ:"Valley of Flowers Uttarakhand" },
      { id:"in-kedarnath", name:"Kedarnath", state:"Uttarakhand", region:"North India", desc:"12th Jyotirlinga behind Mandakini glaciers — the holiest of Char Dham.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Mountains & Hill Stations"], imgQ:"Kedarnath temple" },
      { id:"in-badrinath", name:"Badrinath", state:"Uttarakhand", region:"North India", desc:"Vishnu's Himalayan abode between Nar and Narayan peaks.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Mountains & Hill Stations"], imgQ:"Badrinath temple" },
      { id:"in-dehradun", name:"Dehradun", state:"Uttarakhand", region:"North India", desc:"Doon Valley capital — Robber's Cave, Sahastradhara, and Mindrolling stupa.", kind:"City", cats:["Modern Cities","Mountains & Hill Stations"], airport:"Dehradun (DED)", imgQ:"Dehradun valley" },

      // Uttar Pradesh
      { id:"in-lucknow", name:"Lucknow", state:"Uttar Pradesh", region:"North India", desc:"Nawabi capital of tehzeeb, tundey kebabs, and Bara Imambara's labyrinth.", kind:"City", cats:["Historical & Heritage Sites","Food & Culinary Experiences","Modern Cities"], airport:"Lucknow (LKO)", imgQ:"Lucknow Bara Imambara" },
      { id:"in-ayodhya", name:"Ayodhya", state:"Uttar Pradesh", region:"North India", desc:"Birthplace of Lord Ram on the Sarayu — a resurgent pilgrimage city.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Ayodhya Ram Mandir" },
      { id:"in-mathura", name:"Mathura", state:"Uttar Pradesh", region:"North India", desc:"Krishna's janmabhoomi on the Yamuna, alive with Holi and Janmashtami.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Mathura Krishna temple" },
      { id:"in-vrindavan", name:"Vrindavan", state:"Uttar Pradesh", region:"North India", desc:"Krishna's playground of Radha Raman, Banke Bihari, and Nidhivan mysteries.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places"], imgQ:"Vrindavan temple" },
      { id:"in-prayagraj", name:"Prayagraj (Allahabad)", state:"Uttar Pradesh", region:"North India", desc:"Sangam of Ganga, Yamuna, and mythical Saraswati — home of the Kumbh Mela.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Prayagraj Sangam" },
      { id:"in-fatehpur-sikri", name:"Fatehpur Sikri", state:"Uttar Pradesh", region:"North India", desc:"Akbar's abandoned red-sandstone capital — Buland Darwaza, Panch Mahal.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites"], imgQ:"Fatehpur Sikri" },

      // Rajasthan
      { id:"in-jodhpur", name:"Jodhpur", state:"Rajasthan", region:"North India", desc:"Blue city under Mehrangarh — indigo lanes, mirchi vada, and Marwari havelis.", kind:"Heritage City", cats:["Historical & Heritage Sites","Photography Hotspots"], airport:"Jodhpur (JDH)", imgQ:"Jodhpur blue city Mehrangarh" },
      { id:"in-jaisalmer", name:"Jaisalmer", state:"Rajasthan", region:"North India", desc:"Golden fort rising from Thar dunes — camel safaris under a billion stars.", kind:"Desert", cats:["Desert","Historical & Heritage Sites","Adventure & Trekking"], airport:"Jaisalmer (JSA)", imgQ:"Jaisalmer fort desert" },
      { id:"in-pushkar", name:"Pushkar", state:"Rajasthan", region:"North India", desc:"Only Brahma temple in the world above a holy lake famed for its camel fair.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Backpacking Trips"], imgQ:"Pushkar lake ghats" },
      { id:"in-mount-abu", name:"Mount Abu", state:"Rajasthan", region:"North India", desc:"Rajasthan's only hill station — Dilwara marble temples and Nakki Lake sunsets.", kind:"Hill Station", cats:["Mountains & Hill Stations","Spiritual & Pilgrimage Places"], imgQ:"Mount Abu Dilwara" },
      { id:"in-ranthambore", name:"Ranthambore National Park", state:"Rajasthan", region:"North India", desc:"Tiger sightings around a 10th-century fort in dry deciduous jungle.", kind:"Wildlife", cats:["Wildlife & National Parks","Historical & Heritage Sites"], imgQ:"Ranthambore tiger" },
      { id:"in-bikaner", name:"Bikaner", state:"Rajasthan", region:"North India", desc:"Junagarh Fort, Karni Mata's rats, and the world's finest bhujia.", kind:"Heritage City", cats:["Historical & Heritage Sites","Desert","Food & Culinary Experiences"], imgQ:"Bikaner Junagarh fort" },
      { id:"in-chittorgarh", name:"Chittorgarh", state:"Rajasthan", region:"North India", desc:"Largest fort in India — Rani Padmini's palace and the Tower of Victory.", kind:"Fort", cats:["Historical & Heritage Sites","UNESCO World Heritage Sites"], imgQ:"Chittorgarh fort" },
      { id:"in-ajmer", name:"Ajmer", state:"Rajasthan", region:"North India", desc:"Sufi city of Khwaja Moinuddin Chishti's dargah beside Ana Sagar.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Ajmer Sharif dargah" },

      // ---------- South India ----------
      // Karnataka
      { id:"in-bengaluru", name:"Bengaluru", state:"Karnataka", region:"South India", desc:"India's tech capital — Cubbon Park, craft breweries, and MTR dosas.", kind:"City", cats:["Modern Cities","Food & Culinary Experiences","Shopping Destinations"], airport:"Bengaluru (BLR)", imgQ:"Bengaluru Vidhana Soudha" },
      { id:"in-chikmagalur", name:"Chikmagalur", state:"Karnataka", region:"South India", desc:"Birthplace of Indian coffee — misty estates below Mullayanagiri.", kind:"Hill Station", cats:["Mountains & Hill Stations","Nature & Flower Valleys","Food & Culinary Experiences"], imgQ:"Chikmagalur coffee estate" },
      { id:"in-gokarna", name:"Gokarna", state:"Karnataka", region:"South India", desc:"Temple town with a chain of crescent beaches — Om, Kudle, Paradise.", kind:"Beach", cats:["Beaches","Spiritual & Pilgrimage Places","Backpacking Trips"], imgQ:"Gokarna beach Karnataka" },
      { id:"in-badami", name:"Badami", state:"Karnataka", region:"South India", desc:"Chalukyan rock-cut caves in red sandstone above Agastya lake.", kind:"Heritage", cats:["Historical & Heritage Sites","Caves","Photography Hotspots"], imgQ:"Badami cave temples" },
      { id:"in-jog-falls", name:"Jog Falls", state:"Karnataka", region:"South India", desc:"India's second-highest plunge waterfall — the Sharavati leaps 253 metres.", kind:"Waterfall", cats:["Nature & Flower Valleys","Photography Hotspots"], imgQ:"Jog Falls Karnataka" },

      // Kerala (extras)
      { id:"in-munnar", name:"Munnar", state:"Kerala", region:"South India", desc:"Tea-carpeted High Ranges, Neelakurinji blooms, and Anamudi peak.", kind:"Hill Station", cats:["Mountains & Hill Stations","Nature & Flower Valleys","Honeymoon Destinations"], imgQ:"Munnar tea plantations" },
      { id:"in-alleppey", name:"Alleppey (Alappuzha)", state:"Kerala", region:"South India", desc:"Backwater houseboats gliding through coconut-lined lagoons.", kind:"Backwaters", cats:["Nature & Flower Valleys","Honeymoon Destinations","Cruise Destinations"], imgQ:"Alleppey backwaters houseboat" },
      { id:"in-thekkady", name:"Thekkady (Periyar)", state:"Kerala", region:"South India", desc:"Spice hills and elephant-spotting boat safaris on Periyar lake.", kind:"Wildlife", cats:["Wildlife & National Parks","Nature & Flower Valleys"], imgQ:"Periyar Thekkady Kerala" },
      { id:"in-wayanad", name:"Wayanad", state:"Kerala", region:"South India", desc:"Emerald plateau of Edakkal caves, waterfalls, and paddy-scented breeze.", kind:"Hill Station", cats:["Mountains & Hill Stations","Wildlife & National Parks","Adventure & Trekking"], imgQ:"Wayanad Kerala hills" },
      { id:"in-varkala", name:"Varkala", state:"Kerala", region:"South India", desc:"Red laterite cliffs above the Arabian Sea — sunsets and Ayurveda.", kind:"Beach", cats:["Beaches","Honeymoon Destinations","Backpacking Trips"], imgQ:"Varkala cliff beach Kerala" },
      { id:"in-kochi", name:"Kochi (Fort Kochi)", state:"Kerala", region:"South India", desc:"Chinese fishing nets, Dutch palaces, and Jew Town spice lanes.", kind:"Heritage City", cats:["Historical & Heritage Sites","Food & Culinary Experiences"], airport:"Kochi (COK)", imgQ:"Fort Kochi Chinese fishing nets" },

      // Tamil Nadu
      { id:"in-chennai", name:"Chennai", state:"Tamil Nadu", region:"South India", desc:"Marina Beach, Kapaleeshwarar temple, and world-class filter kaapi.", kind:"City", cats:["Modern Cities","Beaches","Food & Culinary Experiences"], airport:"Chennai (MAA)", imgQ:"Chennai Marina beach" },
      { id:"in-madurai", name:"Madurai", state:"Tamil Nadu", region:"South India", desc:"Temple city of Meenakshi Amman — living Dravidian architecture.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Historical & Heritage Sites"], imgQ:"Meenakshi temple Madurai" },
      { id:"in-rameswaram", name:"Rameswaram", state:"Tamil Nadu", region:"South India", desc:"Island Jyotirlinga, Ram Setu views, and Dhanushkodi's ghost coast.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Islands","Beaches"], imgQ:"Rameswaram temple bridge" },
      { id:"in-kanyakumari", name:"Kanyakumari", state:"Tamil Nadu", region:"South India", desc:"India's tip — three seas meet at Vivekananda Rock's sunrise-sunset horizon.", kind:"Coastal", cats:["Beaches","Spiritual & Pilgrimage Places","Photography Hotspots"], imgQ:"Kanyakumari Vivekananda rock" },
      { id:"in-mahabalipuram", name:"Mahabalipuram", state:"Tamil Nadu", region:"South India", desc:"Pallava shore temples and Arjuna's Penance carved into granite.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites","Beaches"], imgQ:"Mahabalipuram shore temple" },
      { id:"in-thanjavur", name:"Thanjavur", state:"Tamil Nadu", region:"South India", desc:"Chola grandeur — Brihadeeswarar's soaring vimana and bronze icons.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites"], imgQ:"Thanjavur Brihadeeswarar temple" },

      // Puducherry
      { id:"in-pondicherry", name:"Puducherry", state:"Puducherry", region:"South India", desc:"French-quarter yellow villas, Auroville, and quiet Bay of Bengal cafés.", kind:"Coastal Town", cats:["Beaches","Honeymoon Destinations","Food & Culinary Experiences"], imgQ:"Pondicherry French quarter" },

      // Andhra & Telangana
      { id:"in-vizag", name:"Visakhapatnam", state:"Andhra Pradesh", region:"South India", desc:"Steel city with Ramakrishna Beach, Kailasagiri, and INS Kursura museum.", kind:"City", cats:["Modern Cities","Beaches"], airport:"Vizag (VTZ)", imgQ:"Visakhapatnam beach" },
      { id:"in-araku", name:"Araku Valley", state:"Andhra Pradesh", region:"South India", desc:"Coffee-hued hills, tribal Dhimsa dances, and the Borra limestone caves.", kind:"Valley", cats:["Mountains & Hill Stations","Caves","Nature & Flower Valleys"], imgQ:"Araku valley Andhra" },
      { id:"in-tirupati", name:"Tirupati (Tirumala)", state:"Andhra Pradesh", region:"South India", desc:"World's richest shrine — Sri Venkateswara atop the seven hills.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Mountains & Hill Stations"], imgQ:"Tirupati temple" },
      { id:"in-warangal", name:"Warangal", state:"Telangana", region:"South India", desc:"Kakatiya capital — Thousand Pillar temple and Ramappa UNESCO shrine.", kind:"Heritage", cats:["Historical & Heritage Sites","UNESCO World Heritage Sites"], imgQ:"Warangal Ramappa temple" },

      // ---------- West India ----------
      // Maharashtra
      { id:"in-mumbai", name:"Mumbai", state:"Maharashtra", region:"West India", desc:"City of dreams — Gateway of India, Marine Drive, Bollywood, vada pav.", kind:"City", cats:["Modern Cities","Food & Culinary Experiences","Shopping Destinations"], airport:"Mumbai (BOM)", imgQ:"Mumbai Gateway of India" },
      { id:"in-pune", name:"Pune", state:"Maharashtra", region:"West India", desc:"Culture capital of Maharashtra — Shaniwar Wada, Osho, and monsoon ghats.", kind:"City", cats:["Modern Cities","Historical & Heritage Sites"], airport:"Pune (PNQ)", imgQ:"Pune Shaniwar Wada" },
      { id:"in-lonavala", name:"Lonavala & Khandala", state:"Maharashtra", region:"West India", desc:"Monsoon-misted Sahyadri ghats, chikki, and Karla-Bhaja caves.", kind:"Hill Station", cats:["Mountains & Hill Stations","Caves","Family Vacations"], imgQ:"Lonavala monsoon ghats" },
      { id:"in-mahabaleshwar", name:"Mahabaleshwar", state:"Maharashtra", region:"West India", desc:"Strawberry farms and Venna Lake in the highest Western Ghat range.", kind:"Hill Station", cats:["Mountains & Hill Stations","Honeymoon Destinations"], imgQ:"Mahabaleshwar strawberries" },
      { id:"in-ajanta-ellora", name:"Ajanta & Ellora Caves", state:"Maharashtra", region:"West India", desc:"Rock-cut Buddhist, Hindu, and Jain masterpieces of 2,000-year artistry.", kind:"Caves", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites","Caves"], imgQ:"Ajanta Ellora caves" },
      { id:"in-shirdi", name:"Shirdi", state:"Maharashtra", region:"West India", desc:"Sai Baba's samadhi and the humble village of miracles.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places"], imgQ:"Shirdi Sai Baba temple" },
      { id:"in-matheran", name:"Matheran", state:"Maharashtra", region:"West India", desc:"Asia's only auto-free hill station with red-earth trails and toy train.", kind:"Hill Station", cats:["Mountains & Hill Stations","Family Vacations"], imgQ:"Matheran toy train" },
      { id:"in-tadoba", name:"Tadoba Andhari Tiger Reserve", state:"Maharashtra", region:"West India", desc:"Central India's tiger territory of teak forests and bamboo thickets.", kind:"Wildlife", cats:["Wildlife & National Parks"], imgQ:"Tadoba tiger reserve" },

      // Gujarat / DNH & DD
      { id:"in-ahmedabad", name:"Ahmedabad", state:"Gujarat", region:"West India", desc:"UNESCO walled city — Sabarmati Ashram, pols, and khaman-jalebi mornings.", kind:"Heritage City", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites","Food & Culinary Experiences"], airport:"Ahmedabad (AMD)", imgQ:"Ahmedabad Sabarmati" },
      { id:"in-kutch", name:"Rann of Kutch", state:"Gujarat", region:"West India", desc:"Endless white salt desert glowing under Rann Utsav full-moon nights.", kind:"Desert", cats:["Desert","Photography Hotspots","Nature & Flower Valleys"], imgQ:"Rann of Kutch white desert" },
      { id:"in-statue-unity", name:"Statue of Unity", state:"Gujarat", region:"West India", desc:"World's tallest statue — Sardar Patel above the Narmada at Kevadia.", kind:"Landmark", cats:["Modern Cities","Family Vacations"], imgQ:"Statue of Unity Gujarat" },
      { id:"in-somnath", name:"Somnath", state:"Gujarat", region:"West India", desc:"First of the twelve Jyotirlingas, restored on the Arabian Sea's edge.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Beaches"], imgQ:"Somnath temple Gujarat" },
      { id:"in-dwarka", name:"Dwarka", state:"Gujarat", region:"West India", desc:"Krishna's oceanic kingdom — Dwarkadhish temple and Bet Dwarka island.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Islands","Beaches"], imgQ:"Dwarka temple" },
      { id:"in-gir", name:"Gir National Park", state:"Gujarat", region:"West India", desc:"Last refuge of the majestic Asiatic lion in dry teak forests.", kind:"Wildlife", cats:["Wildlife & National Parks"], imgQ:"Gir lion Gujarat" },
      { id:"in-diu", name:"Diu", state:"Dadra & Nagar Haveli and Daman & Diu", region:"West India", desc:"Portuguese fort island of Nagoa beach and quiet seafood shacks.", kind:"Island Beach", cats:["Islands","Beaches","Historical & Heritage Sites"], imgQ:"Diu fort beach" },
      { id:"in-daman", name:"Daman", state:"Dadra & Nagar Haveli and Daman & Diu", region:"West India", desc:"Portuguese-era Moti Daman fort with breezy Devka beach walks.", kind:"Coastal Town", cats:["Beaches","Historical & Heritage Sites"], imgQ:"Daman beach fort" },
      { id:"in-silvassa", name:"Silvassa", state:"Dadra & Nagar Haveli and Daman & Diu", region:"West India", desc:"Green riverside capital of Dadra & Nagar Haveli — Vasona lion safari.", kind:"City", cats:["Nature & Flower Valleys","Wildlife & National Parks"], imgQ:"Silvassa Vasona" },

      // ---------- East India ----------
      { id:"in-kolkata", name:"Kolkata", state:"West Bengal", region:"East India", desc:"City of joy — Howrah bridge, Durga Puja pandals, and Coffee House adda.", kind:"City", cats:["Modern Cities","Historical & Heritage Sites","Food & Culinary Experiences"], airport:"Kolkata (CCU)", imgQ:"Kolkata Howrah bridge" },
      { id:"in-sundarbans", name:"Sundarbans", state:"West Bengal", region:"East India", desc:"Mangrove labyrinth where Royal Bengal tigers swim between deltaic islands.", kind:"Wildlife", cats:["Wildlife & National Parks","UNESCO World Heritage Sites","Islands"], imgQ:"Sundarbans tiger mangrove" },
      { id:"in-shantiniketan", name:"Shantiniketan", state:"West Bengal", region:"East India", desc:"Tagore's abode of learning — Baul music, Poush Mela, and terracotta art.", kind:"Cultural", cats:["Historical & Heritage Sites","Heritage villages"], imgQ:"Shantiniketan Tagore" },
      { id:"in-digha", name:"Digha", state:"West Bengal", region:"East India", desc:"Bengal's favourite weekend beach on the Bay of Bengal.", kind:"Beach", cats:["Beaches","Family Vacations"], imgQ:"Digha beach" },

      { id:"in-puri", name:"Puri", state:"Odisha", region:"East India", desc:"Jagannath's chariot city and golden beaches of the Bay of Bengal.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","Beaches"], imgQ:"Puri Jagannath temple" },
      { id:"in-konark", name:"Konark Sun Temple", state:"Odisha", region:"East India", desc:"13th-century stone chariot of Surya — a UNESCO Kalinga masterpiece.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites"], imgQ:"Konark sun temple" },
      { id:"in-bhubaneswar", name:"Bhubaneswar", state:"Odisha", region:"East India", desc:"Temple city of Lingaraja, Mukteshwar, and Khandagiri-Udayagiri caves.", kind:"Heritage City", cats:["Historical & Heritage Sites","Caves","Spiritual & Pilgrimage Places"], airport:"Bhubaneswar (BBI)", imgQ:"Bhubaneswar Lingaraja" },
      { id:"in-chilika", name:"Chilika Lake", state:"Odisha", region:"East India", desc:"Asia's largest brackish lagoon — flamingos, Irrawaddy dolphins, and pearls.", kind:"Lake", cats:["Wildlife & National Parks","Nature & Flower Valleys"], imgQ:"Chilika lake Odisha" },

      { id:"in-patna", name:"Patna", state:"Bihar", region:"East India", desc:"Ancient Pataliputra on the Ganges — Golghar granary and Sikh Takht.", kind:"City", cats:["Historical & Heritage Sites","Spiritual & Pilgrimage Places"], airport:"Patna (PAT)", imgQ:"Patna Golghar" },
      { id:"in-bodhgaya", name:"Bodh Gaya", state:"Bihar", region:"East India", desc:"Where Buddha attained enlightenment beneath the Mahabodhi tree.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places","UNESCO World Heritage Sites"], imgQ:"Bodh Gaya Mahabodhi" },
      { id:"in-nalanda", name:"Nalanda & Rajgir", state:"Bihar", region:"East India", desc:"Ruins of the ancient Buddhist university and Rajgir's hot springs.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites"], imgQ:"Nalanda ruins" },

      { id:"in-ranchi", name:"Ranchi", state:"Jharkhand", region:"East India", desc:"Waterfall-ringed plateau capital — Hundru, Dassam, and Patratu valley drive.", kind:"City", cats:["Nature & Flower Valleys","Modern Cities"], airport:"Ranchi (IXR)", imgQ:"Ranchi Hundru falls" },
      { id:"in-deoghar", name:"Deoghar", state:"Jharkhand", region:"East India", desc:"Baidyanath Jyotirlinga town and Shravani Mela pilgrimage centre.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places"], imgQ:"Deoghar Baidyanath" },
      { id:"in-netarhat", name:"Netarhat", state:"Jharkhand", region:"East India", desc:"'Queen of Chotanagpur' — pine-scented sunrise plateau above Latehar.", kind:"Hill Station", cats:["Mountains & Hill Stations","Nature & Flower Valleys"], imgQ:"Netarhat Jharkhand" },

      // ---------- Central India ----------
      { id:"in-bhopal", name:"Bhopal", state:"Madhya Pradesh", region:"Central India", desc:"City of lakes with Bhimbetka rock art and Taj-ul-Masajid nearby.", kind:"City", cats:["Modern Cities","Historical & Heritage Sites"], airport:"Bhopal (BHO)", imgQ:"Bhopal upper lake" },
      { id:"in-sanchi", name:"Sanchi", state:"Madhya Pradesh", region:"Central India", desc:"Ashoka's Great Stupa — the oldest surviving Buddhist monument in India.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Spiritual & Pilgrimage Places"], imgQ:"Sanchi stupa" },
      { id:"in-khajuraho", name:"Khajuraho", state:"Madhya Pradesh", region:"Central India", desc:"Chandela temples of intricate sculpture and the annual dance festival.", kind:"Heritage", cats:["UNESCO World Heritage Sites","Historical & Heritage Sites"], airport:"Khajuraho (HJR)", imgQ:"Khajuraho temples" },
      { id:"in-orchha", name:"Orchha", state:"Madhya Pradesh", region:"Central India", desc:"Bundela chhatris on the Betwa — a fairytale of forgotten palaces.", kind:"Heritage", cats:["Historical & Heritage Sites","Photography Hotspots"], imgQ:"Orchha chhatris" },
      { id:"in-gwalior", name:"Gwalior", state:"Madhya Pradesh", region:"Central India", desc:"Cliff-top Gwalior Fort and Jai Vilas' 3,500 kg chandeliers.", kind:"Heritage City", cats:["Historical & Heritage Sites"], airport:"Gwalior (GWL)", imgQ:"Gwalior fort" },
      { id:"in-ujjain", name:"Ujjain", state:"Madhya Pradesh", region:"Central India", desc:"Mahakaleshwar Jyotirlinga, Kumbh site on the Shipra.", kind:"Pilgrimage", cats:["Spiritual & Pilgrimage Places"], imgQ:"Ujjain Mahakaleshwar" },
      { id:"in-kanha", name:"Kanha National Park", state:"Madhya Pradesh", region:"Central India", desc:"Sal-and-bamboo forests that inspired Kipling's Jungle Book.", kind:"Wildlife", cats:["Wildlife & National Parks"], imgQ:"Kanha tiger reserve" },
      { id:"in-bandhavgarh", name:"Bandhavgarh National Park", state:"Madhya Pradesh", region:"Central India", desc:"Highest tiger density in India around a ruined hilltop fort.", kind:"Wildlife", cats:["Wildlife & National Parks"], imgQ:"Bandhavgarh tiger" },
      { id:"in-pachmarhi", name:"Pachmarhi", state:"Madhya Pradesh", region:"Central India", desc:"'Satpura ki Rani' — waterfalls, cave shrines, and biosphere forests.", kind:"Hill Station", cats:["Mountains & Hill Stations","Nature & Flower Valleys","Caves"], imgQ:"Pachmarhi Satpura" },

      { id:"in-raipur", name:"Raipur", state:"Chhattisgarh", region:"Central India", desc:"Steel-and-rice capital with Mahant Ghasidas museum and Purkhauti village.", kind:"City", cats:["Modern Cities","Historical & Heritage Sites"], airport:"Raipur (RPR)", imgQ:"Raipur Chhattisgarh" },
      { id:"in-chitrakote", name:"Chitrakote Falls", state:"Chhattisgarh", region:"Central India", desc:"'Niagara of India' — horseshoe cascade of the Indravati river in Bastar.", kind:"Waterfall", cats:["Nature & Flower Valleys","Photography Hotspots"], imgQ:"Chitrakote falls Bastar" },
      { id:"in-bastar", name:"Bastar", state:"Chhattisgarh", region:"Central India", desc:"Tribal heartland of Dhurwa dances, bell-metal art, and Kanger caves.", kind:"Cultural", cats:["Heritage villages","Caves","Nature & Flower Valleys"], imgQ:"Bastar tribal Chhattisgarh" },

      // ---------- North-East India ----------
      { id:"in-guwahati", name:"Guwahati", state:"Assam", region:"North-East India", desc:"Gateway to the Northeast — Kamakhya temple, Brahmaputra cruises, Umananda.", kind:"City", cats:["Spiritual & Pilgrimage Places","Modern Cities"], airport:"Guwahati (GAU)", imgQ:"Guwahati Kamakhya" },
      { id:"in-kaziranga", name:"Kaziranga National Park", state:"Assam", region:"North-East India", desc:"Two-thirds of the world's one-horned rhinos in tall elephant-grass floodplains.", kind:"Wildlife", cats:["Wildlife & National Parks","UNESCO World Heritage Sites"], imgQ:"Kaziranga rhino Assam" },
      { id:"in-majuli", name:"Majuli", state:"Assam", region:"North-East India", desc:"World's largest river island — Neo-Vaishnavite satras and mask makers.", kind:"River Island", cats:["Islands","Heritage villages","Nature & Flower Valleys"], imgQ:"Majuli island Assam" },

      { id:"in-tawang", name:"Tawang", state:"Arunachal Pradesh", region:"North-East India", desc:"India's largest monastery above 10,000 ft — Sela Pass, Madhuri Lake.", kind:"Monastery", cats:["Spiritual & Pilgrimage Places","Mountains & Hill Stations","Snow Destinations"], imgQ:"Tawang monastery Arunachal" },
      { id:"in-ziro", name:"Ziro Valley", state:"Arunachal Pradesh", region:"North-East India", desc:"Apatani paddy-terrace bowl famed for its September music festival.", kind:"Valley", cats:["Nature & Flower Valleys","Heritage villages"], imgQ:"Ziro valley Arunachal" },

      { id:"in-shillong", name:"Shillong", state:"Meghalaya", region:"North-East India", desc:"'Scotland of the East' — Ward's Lake, Elephant Falls, and rock cafés.", kind:"Hill Station", cats:["Mountains & Hill Stations","Nature & Flower Valleys"], airport:"Shillong (SHL)", imgQ:"Shillong Meghalaya" },
      { id:"in-cherrapunji", name:"Cherrapunji (Sohra)", state:"Meghalaya", region:"North-East India", desc:"One of the wettest places on Earth — living root bridges over emerald canyons.", kind:"Nature", cats:["Nature & Flower Valleys","Adventure & Trekking","Photography Hotspots"], imgQ:"Cherrapunji root bridge" },
      { id:"in-mawlynnong", name:"Mawlynnong", state:"Meghalaya", region:"North-East India", desc:"Asia's cleanest village of bamboo skywalks and Khasi hospitality.", kind:"Village", cats:["Heritage villages","Nature & Flower Valleys"], imgQ:"Mawlynnong village Meghalaya" },
      { id:"in-dawki", name:"Dawki (Umngot River)", state:"Meghalaya", region:"North-East India", desc:"Boats float on the crystal-clear Umngot at the Bangladesh border.", kind:"River", cats:["Nature & Flower Valleys","Photography Hotspots"], imgQ:"Dawki Umngot river" },

      { id:"in-imphal", name:"Imphal", state:"Manipur", region:"North-East India", desc:"Kangla fort, Ima Keithel women's market, and Manipuri Ras dance.", kind:"City", cats:["Historical & Heritage Sites","Modern Cities"], airport:"Imphal (IMF)", imgQ:"Imphal Kangla" },
      { id:"in-loktak", name:"Loktak Lake", state:"Manipur", region:"North-East India", desc:"World's only floating phumdis and Keibul Lamjao's sangai deer.", kind:"Lake", cats:["Nature & Flower Valleys","Wildlife & National Parks"], imgQ:"Loktak lake Manipur" },

      { id:"in-aizawl", name:"Aizawl", state:"Mizoram", region:"North-East India", desc:"Hill capital on a knife-edge ridge — Solomon's Temple, Reiek trails.", kind:"City", cats:["Mountains & Hill Stations","Modern Cities"], airport:"Lengpui (AJL)", imgQ:"Aizawl Mizoram" },

      { id:"in-kohima", name:"Kohima", state:"Nagaland", region:"North-East India", desc:"WWII war cemetery and gateway to the Hornbill Festival at Kisama.", kind:"City", cats:["Historical & Heritage Sites","Heritage villages"], airport:"Dimapur (DMU)", imgQ:"Kohima Nagaland" },
      { id:"in-dzukou", name:"Dzukou Valley", state:"Nagaland", region:"North-East India", desc:"Trekker's paradise of rolling green meadows and the July Dzukou lily.", kind:"Valley", cats:["Nature & Flower Valleys","Adventure & Trekking"], imgQ:"Dzukou valley Nagaland" },

      { id:"in-gangtok", name:"Gangtok", state:"Sikkim", region:"North-East India", desc:"Ropeway-hopping capital with Enchey monastery and MG Marg promenade.", kind:"City", cats:["Mountains & Hill Stations","Spiritual & Pilgrimage Places"], airport:"Pakyong (PYG)", imgQ:"Gangtok Sikkim" },
      { id:"in-yumthang", name:"Yumthang Valley", state:"Sikkim", region:"North-East India", desc:"'Valley of Flowers' in North Sikkim — rhododendrons and hot springs.", kind:"Valley", cats:["Nature & Flower Valleys","Snow Destinations"], imgQ:"Yumthang valley Sikkim" },

      { id:"in-agartala", name:"Agartala", state:"Tripura", region:"North-East India", desc:"Ujjayanta Palace capital with Neermahal water palace nearby.", kind:"City", cats:["Historical & Heritage Sites","Modern Cities"], airport:"Agartala (IXA)", imgQ:"Agartala Ujjayanta palace" },
      { id:"in-unakoti", name:"Unakoti", state:"Tripura", region:"North-East India", desc:"Rock-cut Shaiva reliefs hidden in the jungles of northern Tripura.", kind:"Heritage", cats:["Historical & Heritage Sites","Caves"], imgQ:"Unakoti Tripura rock carvings" },
    ];

    return rows.map(r => make({
      id: r.id, name: r.name, country: "India", continent: "Asia",
      image: img(r.imgQ ?? `${r.name} India`),
      shortDesc: r.desc,
      rating: 4.6,
      season: r.season ?? "Oct – Mar",
      budget: "₹15,000 – ₹40,000",
      duration: "3 – 6 days",
      tags: [r.kind, r.state],
      type: [r.kind],
      famousFor: r.desc,
      bestMonths: r.months ?? ["Oct","Nov","Dec","Jan","Feb","Mar"],
      budgetTier: r.budgetTier ?? "Medium",
      climate: "Varies by season",
      visa: "No visa required for Indian nationals",
      currency: "INR",
      languages: ["Hindi","English","Regional"],
      topAttractions: [r.name],
      thingsToDo: ["Sightseeing","Local food walk","Photography","Culture immersion"],
      food: ["Regional specialties"],
      shopping: ["Local bazaars","Handicrafts"],
      familyFriendly: true,
      honeymoonFriendly: r.cats.includes("Honeymoon Destinations"),
      adventure: r.cats.includes("Adventure & Trekking") ? 5 : 3,
      nightlife: r.cats.includes("Modern Cities") ? 4 : 2,
      safety: 4,
      transport: ["Taxi","Local transport","Trains"],
      airport: r.airport ?? "Nearest metro airport",
      idealFor: ["Solo","Couples","Family","Friends"],
      categories: r.cats,
      gallery: [img(`${r.imgQ ?? r.name}`), img(`${r.name} landscape`), img(`${r.state} tourism`)],
    }));
  })(),
];

export const CATEGORIES = [
  { name: "Beaches", icon: "🏖️" },
  { name: "Mountains & Hill Stations", icon: "🏔️" },
  { name: "Snow Destinations", icon: "❄️" },
  { name: "Islands", icon: "🏝️" },
  { name: "Historical & Heritage Sites", icon: "🏛️" },
  { name: "Spiritual & Pilgrimage Places", icon: "🕉️" },
  { name: "Wildlife & National Parks", icon: "🦁" },
  { name: "Volcanoes & Geological Wonders", icon: "🌋" },
  { name: "Nature & Flower Valleys", icon: "🌸" },
  { name: "Northern Lights", icon: "🌌" },
  { name: "Theme Parks", icon: "🎢" },
  { name: "Modern Cities", icon: "🌆" },
  { name: "Shopping Destinations", icon: "🛍️" },
  { name: "Food & Culinary Experiences", icon: "🍜" },
  { name: "Honeymoon Destinations", icon: "💕" },
  { name: "Family Vacations", icon: "👨‍👩‍👧" },
  { name: "Backpacking Trips", icon: "🎒" },
  { name: "Adventure & Trekking", icon: "🥾" },
  { name: "Road Trips", icon: "🚗" },
  { name: "Cruise Destinations", icon: "🛳️" },
  { name: "Photography Hotspots", icon: "📸" },
  { name: "UNESCO World Heritage Sites", icon: "🏆" },
];

export const FEATURES = [
  { title: "AI Itinerary Generation", desc: "Personalized day-wise plans crafted by AI in seconds.", icon: "Sparkles" },
  { title: "Hidden Gems Discovery", desc: "Find places loved by locals, off the tourist trail.", icon: "Gem" },
  { title: "Smart Budget Planning", desc: "Optimized spends across stay, food, and experiences.", icon: "Wallet" },
  { title: "Weather Insights", desc: "Daily and hourly forecasts mapped to your itinerary.", icon: "CloudSun" },
  { title: "Hotel Recommendations", desc: "Stays curated for your style, budget, and location.", icon: "BedDouble" },
  { title: "Local Food Guide", desc: "Signature dishes, street food, and food walks.", icon: "Soup" },
  { title: "Packing Checklist", desc: "Auto-generated by destination, weather, and activities.", icon: "Backpack" },
  { title: "Interactive Maps", desc: "Beautiful maps with routes, pins, and clustering.", icon: "Map" },
];

export const TESTIMONIALS = [
  { name: "Aarav Mehta", role: "Solo Traveler", avatar: "https://i.pravatar.cc/120?img=12", quote: "Felt like having a local friend in every city.", place: "Kyoto, Japan" },
  { name: "Sara Lindqvist", role: "Photographer", avatar: "https://i.pravatar.cc/120?img=47", quote: "Planned a 10-day Iceland trip in 3 minutes.", place: "Reykjavík" },
  { name: "Diego Ramos", role: "Family of 4", avatar: "https://i.pravatar.cc/120?img=33", quote: "Kid-friendly stops, budget that worked. Perfect.", place: "Singapore" },
  { name: "Mei Tanaka", role: "Honeymooner", avatar: "https://i.pravatar.cc/120?img=49", quote: "Romantic sunset spots we'd never have found.", place: "Santorini" },
];

export const FAQS = [
  { q: "Is Jatayuv AI free to use?", a: "Yes — the Free plan lets you generate 3 trips per month." },
  { q: "How accurate are the AI itineraries?", a: "Plans are tuned on real reviews, weather, and seasonality." },
  { q: "Can I edit the generated plan?", a: "Absolutely — every day and activity can be swapped." },
  { q: "Does it work offline?", a: "Pro and Premium plans support full offline access." },
  { q: "Which destinations are supported?", a: "190+ countries and deep data for 500+ top destinations." },
  { q: "How does pricing work?", a: "Free forever for casual planning. Pro $9/mo, Premium $19/mo." },
];

export const PRICING = [
  { name: "Free", price: "$0", period: "/mo", desc: "Start exploring", features: ["3 AI trips per month","Basic itineraries","Standard maps"], cta: "Start free", highlight: false },
  { name: "Pro", price: "$9", period: "/mo", desc: "For frequent travelers", features: ["Unlimited AI trips","Hidden gems","Offline mode","Smart budget"], cta: "Go Pro", highlight: true },
  { name: "Premium", price: "$19", period: "/mo", desc: "World-class explorer", features: ["Everything in Pro","Concierge support","Live rebalancing","Group planning"], cta: "Go Premium", highlight: false },
];

export const STEPS = [
  { title: "Choose Destination", desc: "Pick anywhere on Earth — we know it.", icon: "Globe2" },
  { title: "Select Number of Days", desc: "Weekend escape or month-long journey.", icon: "Calendar" },
  { title: "Travel Preferences", desc: "Style, budget, pace, diet — your trip.", icon: "Sliders" },
  { title: "AI Collects Information", desc: "Weather, prices, openings — in real time.", icon: "Database" },
  { title: "AI Generates Plan", desc: "Day-by-day itinerary in seconds.", icon: "Sparkles" },
  { title: "Download & Enjoy", desc: "Take it offline, share it, live it.", icon: "Download" },
];

export const COMPANIES = ["Airbnb", "Booking", "Skyscanner", "Lonely Planet", "GetYourGuide", "Kayak", "Expedia"];

export const SAMPLE_ITINERARY = {
  destination: "Kyoto, Japan",
  days: 5,
  travelers: 2,
  budget: "$1,800",
  safety: 92,
  weather: "Sunny, 21°C",
  days_plan: Array.from({ length: 5 }).map((_, i) => ({
    day: i + 1,
    title: ["Arrival & Gion stroll", "Temples & bamboo grove", "Imperial culture", "Day trip to Nara", "Food markets & departure"][i],
    morning: ["Land at KIX, train to Kyoto", "Fushimi Inari hike at dawn", "Kyoto Imperial Palace tour", "Train to Nara, deer park", "Nishiki market food walk"][i],
    afternoon: ["Lunch at Nishiki market", "Arashiyama bamboo grove", "Nijo Castle gardens", "Todai-ji great Buddha", "Tea ceremony experience"][i],
    evening: ["Gion lantern walk", "Kinkaku-ji golden pavilion", "Pontocho alley dinner", "Return to Kyoto", "Bullet train to Osaka airport"][i],
    night: ["Ryokan check-in & onsen", "Sushi omakase", "Sake tasting", "Quiet temple stay", "Late flight home"][i],
    hotel: ["Hotel The Mitsui Kyoto", "Ryokan Yachiyo", "Hotel Granvia", "Onyado Nono Nara", "Kyoto Tower Hotel"][i],
    cost: ["$320", "$280", "$300", "$290", "$210"][i],
    distance: ["12 km", "24 km", "8 km", "60 km", "45 km"][i],
  })),
};

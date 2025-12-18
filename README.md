# 🌏 AI Travel Planner for India

An intelligent travel planning platform specialized in Indian destinations with graph-based routing, seasonal intelligence, and personality-driven recommendations.

## 🔥 Unique Features

- **District-Level Travel Graph**: Smart route optimization using place-to-place distance matrix
- **Seasonal Scoring System**: Automatic filtering based on best/avoid seasons
- **Hidden Gems Mode**: Discover local waterfalls, temples, viewpoints beyond tourist hotspots
- **Trip Personality Engine**: Adventure/Spiritual/Instagram/Foodie/Nature-based recommendations
- **Budget Breakdown Transparency**: Detailed cost split (Travel/Stay/Food/Tickets)
- **Crowd Prediction**: Real-time crowd status (Low/Medium/High) based on festivals & weekends
- **Dynamic Plan Sliders**: Real-time itinerary updates as you adjust budget/days
- **Weather Backup Plans**: Automatic "Plan B" suggestions for rain/extreme weather

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL with PostGIS (geospatial queries)
- **Maps**: Leaflet.js with OpenStreetMap
- **APIs**: OpenWeatherMap (weather), Google Maps Distance Matrix (routes)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL 14+ with PostGIS extension

### Installation

1. Clone and install dependencies:
```bash
npm install
```

2. Setup database:
```bash
# Create PostgreSQL database
createdb trip_planner

# Enable PostGIS extension
psql trip_planner -c "CREATE EXTENSION postgis;"
```

3. Configure environment:
```bash
cp .env.example .env
# Edit .env with your database URL and API keys
```

4. Initialize database schema:
```bash
npm run db:push
```

5. Seed pilot data (Tamil Nadu):
```bash
npm run db:seed
```

6. Start development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📊 Database Structure

### Core Entities
- **Places**: Attractions (temples, waterfalls, malls, hill stations) with coordinates, seasons, personality tags
- **Routes**: Distance/time relationships between places
- **Itineraries**: User-generated trip plans with day-wise schedules

### Graph-Like Querying
Places connected via Routes table enabling efficient "nearby places" and "shortest path" queries.

## 🎯 Scoring Algorithm

```
final_score = (season_weight × season_match) 
            + (budget_weight × budget_fit) 
            + (days_weight × distance_feasibility) 
            + (personality_weight × personality_match) 
            + (crowd_preference × crowd_inverse)
```

## 🗺️ Pilot Coverage

**Tamil Nadu Districts**:
- Coimbatore (Isha Temple, LuLu Mall, VOC Park)
- Nilgiris (Ooty, Coonoor, Kotagiri)
- Dindigul (Kodaikanal, Palani)
- Madurai (Meenakshi Temple, Thiruparankundram)
- And 100+ hidden gems

## 📝 License

MIT License - built for travelers by travelers

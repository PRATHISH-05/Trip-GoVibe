'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapComponentProps {
  days: any[];
  origin: any;
}

export default function MapComponent({ days, origin }: MapComponentProps) {
  const allPlaces = days.flatMap(day => day.places).filter(p => p.lat && p.lon);
  
  if (allPlaces.length === 0) {
    return <div className="h-full flex items-center justify-center text-gray-500">No location data available</div>;
  }
  
  // Calculate center point
  const avgLat = allPlaces.reduce((sum, p) => sum + (p.lat || p.latitude || 0), 0) / allPlaces.length;
  const avgLon = allPlaces.reduce((sum, p) => sum + (p.lon || p.longitude || 0), 0) / allPlaces.length;
  
  // Create route line coordinates
  const routeCoordinates = allPlaces.map(place => [(place.lat || place.latitude), (place.lon || place.longitude)] as [number, number]);

  // Custom icon for different place types
  const getMarkerIcon = (type: string) => {
    const colors: any = {
      TEMPLE: '#f97316',
      WATERFALL: '#3b82f6',
      HILL_STATION: '#22c55e',
      MALL: '#a855f7',
      PARK: '#84cc16',
      LAKE: '#06b6d4',
      VIEWPOINT: '#6366f1',
      GARDEN: '#ec4899',
    };
    
    const color = colors[type] || '#6b7280';
    
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
      className: '',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  return (
    <MapContainer
      center={[avgLat, avgLon]}
      zoom={9}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Route Line */}
      <Polyline
        positions={routeCoordinates}
        color="#0ea5e9"
        weight={3}
        opacity={0.7}
        dashArray="10, 10"
      />
      
      {/* Place Markers */}
      {allPlaces.map((place, index) => (
        <Marker
          key={index}
          position={[(place.lat || place.latitude), (place.lon || place.longitude)]}
          icon={getMarkerIcon(place.type)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-sm">{place.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{place.type.replace('_', ' ')}</p>
              {place.isHiddenGem && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded mt-1 inline-block">
                  🌿 Hidden Gem
                </span>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
      
      {/* Origin Marker */}
      {origin && (origin.lat || origin.latitude) && (
        <Marker
          position={[(origin.lat || origin.latitude || avgLat), (origin.lon || origin.longitude || avgLon)]}
          icon={L.divIcon({
            html: '<div style="background-color: #dc2626; width: 40px; height: 40px; border-radius: 50%; border: 4px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px;">🏠</div>',
            className: '',
            iconSize: [40, 40],
            iconAnchor: [20, 20],
          })}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-sm">Starting Point</h3>
              <p className="text-xs text-gray-600">{origin.name}</p>
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

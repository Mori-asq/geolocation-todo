import { useState, useEffect, useRef } from "react";
import { GEOLOCATION_LOCAL_STORAGE_KEY, TEN_MINUTES } from "../constants";
import { GeoLocation } from "../models/GeoLocation";

export const useGeolocation = (): GeoLocation | null => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  const getStoredLocation = (): GeoLocation | null => {
    try {
      const stored = localStorage.getItem(GEOLOCATION_LOCAL_STORAGE_KEY);
      if (!stored) return null;

      const storedLocation: GeoLocation = JSON.parse(stored);
      const isExpired = Date.now() - storedLocation.timestamp > TEN_MINUTES;
      if (!isExpired) {
        return storedLocation;
      }
    } catch (error) {
      console.error("Error reading stored location:", error);
    }
    return null;
  };

  const fetchLocation = async (): Promise<void> => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            timeout: 1000,
            maximumAge: TEN_MINUTES,
            enableHighAccuracy: false,
          });
        }
      );

      const newLocation: GeoLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        timestamp: Date.now(),
      };
      setLocation(newLocation);
      localStorage.setItem(
        GEOLOCATION_LOCAL_STORAGE_KEY,
        JSON.stringify(newLocation)
      );
    } catch (error) {
      console.error("Error fetching geolocation:", error);
      // Only fall back to stored location if we don't have a current location
      if (!location) {
        const storedLocation = getStoredLocation();
        if (storedLocation) {
          setLocation(storedLocation);
        }
      }
    }
  };

  useEffect(() => {
    const initializeLocation = async () => {
      // Try to get stored location first
      const storedLocation = getStoredLocation();
      if (storedLocation) {
        setLocation(storedLocation);
      }

      // Set up periodic location updates
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Only fetch immediately if we don't have a valid stored location
      if (!storedLocation) {
        await fetchLocation();
      }

      intervalRef.current = setInterval(() => {
        const locationAge = location
          ? Date.now() - location.timestamp
          : Infinity;
        if (locationAge > TEN_MINUTES) {
          fetchLocation();
        }
      }, 30000);
    };

    if (isInitialMount.current) {
      isInitialMount.current = false;
      initializeLocation();
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return location;
};

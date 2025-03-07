import { useState, useEffect, useRef } from "react";
import { GEOLOCATION_LOCAL_STORAGE_KEY, TEN_MINUTES } from "../constants";
import { GeoLocation } from "../models/GeoLocation";

export const useGeolocation = (): GeoLocation | null => {
  const [location, setLocation] = useState<GeoLocation | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch the user's current geolocation
  const fetchLocation = () => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const newLocation: GeoLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          timestamp: Date.now(),
        };

        // Update the state and local storage
        setLocation(newLocation);
        localStorage.setItem(
          GEOLOCATION_LOCAL_STORAGE_KEY,
          JSON.stringify(newLocation)
        );

        // Clear the existing interval and restart it
        if (intervalRef.current) clearInterval(intervalRef.current);
        startInterval();
      },
      (error) => {
        console.error("Error fetching geolocation:", error);

        // Fallback to the last valid geolocation
        const stored = localStorage.getItem(GEOLOCATION_LOCAL_STORAGE_KEY);
        if (stored) {
          const storedLocation: GeoLocation = JSON.parse(stored);
          if (Date.now() - storedLocation.timestamp < TEN_MINUTES) {
            setLocation(storedLocation);
          } else {
            console.error("Last valid geolocation is expired");
          }
        }
      },
      { timeout: 10000 } // 10 seconds timeout
    );
  };

  // Start the interval to check for expired geolocation
  const startInterval = () => {
    intervalRef.current = setInterval(() => {
      if (location && Date.now() - location.timestamp > TEN_MINUTES) {
        fetchLocation(); // Fetch a new geolocation if the current one is expired
      }
    }, TEN_MINUTES);
  };

  // Initialize the hook
  useEffect(() => {
    const stored = localStorage.getItem(GEOLOCATION_LOCAL_STORAGE_KEY);
    if (stored) {
      const storedLocation: GeoLocation = JSON.parse(stored);

      // Use the stored location if it's still valid
      if (Date.now() - storedLocation.timestamp < TEN_MINUTES) {
        setLocation(storedLocation);
      } else {
        fetchLocation(); // Fetch a new location if the stored one is expired
      }
    } else {
      fetchLocation(); // Fetch a new location if no stored location exists
    }

    // Start the interval
    startInterval();

    // Cleanup the interval on unmount
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return location;
};

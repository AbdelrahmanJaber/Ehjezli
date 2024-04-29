import { useEffect, useState } from "react";
import {
  requestForegroundPermissionsAsync,
  watchPositionAsync,
  Accuracy,
} from "expo-location";

export default () => {
  const [err, setErr] = useState(null);

  useEffect(() => {
    let subscriber;
    const startWatching = async () => {
      try {
        const { granted } = await requestForegroundPermissionsAsync();
        if (!granted) {
          throw new Error("Location permission not granted");
        }

        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          
        );
      } catch (e) {
        setErr(e);
      }
    };

      startWatching();

    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, []);

  return [err];
};

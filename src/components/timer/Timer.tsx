import { useEffect, useRef, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { formatTime } from "../../utils/format";
import "./Timer.css";

interface TimerProps {
  duration: number;
  categoryId: number;
  onTimeExpired: () => void;
  onTimeUpdate: (remainingTime: number) => void;
}

export default function Timer({ duration, categoryId, onTimeExpired, onTimeUpdate }: TimerProps) {
  const [currentTime, setCurrentTime] = useState(duration);
  const intervalRef = useRef<number | null>(null);
  const hasExpiredRef = useRef(false);

  // Resetta il timer quando cambia la durata
  useEffect(() => {
    setCurrentTime(duration);
    hasExpiredRef.current = false;
  }, [duration]);

  // Gestisce il timer
  useEffect(() => {
    // Pulisci l'intervallo precedente
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        const newTime = prev - 1;
        
        // Aggiorna sempre il tempo rimanente
        onTimeUpdate(Math.max(0, newTime));
        
        // Se il tempo è scaduto e non abbiamo già chiamato onTimeExpired
        if (newTime <= 0 && !hasExpiredRef.current) {
          hasExpiredRef.current = true;
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          
          // Chiama onTimeExpired in modo asincrono per evitare problemi di stato
          setTimeout(() => {
            onTimeExpired();
          }, 0);
          
          return 0;
        }
        
        return Math.max(0, newTime);
      });
    }, 1000);

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [duration]);

  const progress = (currentTime / duration) * 100;
  const countdownClass = `countdown-display time-value${categoryId % 6}`;
  const progressBarClass = `category-${categoryId % 6}`;

  return (
    <div className="timer-container">
      <div className={countdownClass}>{formatTime(currentTime)}</div>
      <ProgressBar value={progress} className={progressBarClass} showValue={false} />
    </div>
  );
}
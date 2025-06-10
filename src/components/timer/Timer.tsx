import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { formatTime } from '../../utils/format';
import "./Timer.css";

interface TimerProps {
  duration: number;
  categoryId: number;
  onTimeExpired: () => void;
  onTimeUpdate: (remainingTime: number) => void;
  onShowModal: (show: boolean) => void;
}

function Timer({ duration, categoryId, onTimeExpired, onTimeUpdate, onShowModal }: TimerProps) {
  const [currentTime, setCurrentTime] = useState(duration);
  const [progress, setProgress] = useState(100);
  const intervalId = useRef<number | null>(null);
  const isRunning = useRef(false);

  useEffect(() => {
    startTimer();
    return () => stopTimer();
  }, [duration]);

  const startTimer = () => {
    if (isRunning.current) return;
    isRunning.current = true;
    setCurrentTime(duration);

    intervalId.current = window.setInterval(() => {
      setCurrentTime((prevTime) => {
        const newTime = prevTime - 1;
        onTimeUpdate(newTime);

        if (newTime <= 0) {
          stopTimer();
          onTimeExpired();
          onShowModal(true);
          return 0;
        }
        return newTime;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (intervalId.current !== null) {
      window.clearInterval(intervalId.current);
      intervalId.current = null;
      isRunning.current = false;
    }
  };

  useEffect(() => {
    setProgress((currentTime / duration) * 100);
  }, [currentTime, duration]);

  return (
    <div className="timer-container">
      <div className={`countdown-display time-value${categoryId % 6}`}>
        {formatTime(currentTime)}
      </div>
      <ProgressBar
        value={progress}
        className={`category-${categoryId % 6}`}
        showValue={false}
      />
    </div>
  );
}

export default Timer;
import { useState, useEffect, useRef } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
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

  // simula ngOnInit per avviare il timer all'inizializzazione del componente
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

  const resetTimer = () => {
    setProgress(100);
    stopTimer();
    startTimer();
  };

  useEffect(() => {
    const newProgress = (currentTime / duration) * 100;
    setProgress(newProgress);
  }, [currentTime, duration]);

  const getRemainingTime = () => {
    return currentTime;
  };

  return (
    <div className="timer-container">
      <div className={`countdown-display time-value${categoryId % 6}`}>
        {formatTime(currentTime)}
      </div>

      <ProgressBar
        value={progress}
        className={`category-${categoryId % 6}`}
        showValue={false}
      ></ProgressBar>
    </div>
  );
}

export default Timer;
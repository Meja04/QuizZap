import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./Paginator.css";

interface PaginatorProps {
  total: number;
  current: number;
  categoryId: number;
  answeredQuestions: number[];
  onChange: (pageIndex: number) => void;
}

function Paginator({
  total,
  current,
  categoryId,
  answeredQuestions,
  onChange,
}: PaginatorProps) {
  const [isMobile, setIsMobile] = useState(false);

  // Hook per rilevare la dimensione dello schermo
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 840);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []); // eseguo effect solo alla nascita del componente

  useEffect(() => {
    setTimeout(() => {
      const buttons = document.querySelectorAll(
        `.custom-paginator.category-${categoryId % 6} button`
      );
      buttons.forEach((btn) => {
        const label = btn.textContent?.trim();
        const pageNumber = parseInt(label || "0", 10);
        const questionIndex = pageNumber - 1;

        btn.classList.remove("answered");
        if (answeredQuestions.includes(questionIndex)) {
          btn.classList.add("answered");
        }
      });
    }, 100);
  }, [current, total, answeredQuestions, categoryId]);
  // eseguo effect al cambiamento delle dependencies

const pagClass = `custom-paginator category-${categoryId % 6}`

  return (
    <div
      className={pagClass}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Stack spacing={2}>
        <Pagination
          count={total}
          page={current + 1}
          onChange={(_, page) => onChange(page - 1)}
          showFirstButton={!isMobile}
          showLastButton={!isMobile}
          boundaryCount={isMobile ? 0 : 3}
          siblingCount={isMobile ? 1 : 2}
        />
      </Stack>
    </div>
  );
}

export default Paginator;
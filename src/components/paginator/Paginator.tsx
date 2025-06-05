import { useEffect } from "react";
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

  return (
    <>
    <div
      className={`custom-paginator category-${categoryId % 6}`}
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Stack spacing={2}>
        <Pagination
          count={total}
          page={current + 1}
          onChange={(_, page) => onChange(page - 1)}
          showFirstButton
          showLastButton
          boundaryCount={3}
        />
      </Stack>
    </div>
    </>
  );
}

export default Paginator;

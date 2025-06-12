import { useNavigate } from "react-router-dom";
import { formatTitleCase } from "../../utils/format";
import type { Category as CategoryType } from "../../interfaces/category.interface";
import "./Category.css";

interface CategoryProps {
  category: CategoryType;
}

function Category({ category }: CategoryProps) {
  const navigate = useNavigate();

  const onSelect = () => {
    navigate(`/quiz/${category.name}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect();
    }
  };

  const cardClass = `card category-card category-card${category.id % 6}`;
  const iconClass = `material-icons mat-icon${category.id % 6}`;

  return (
    <div
      className={cardClass}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      aria-label={`Select category ${formatTitleCase(category.name)}`}
      onKeyDown={handleKeyDown}
    >
      <div className="card-body text-center">
        <i className={iconClass}>{category.icon}</i>
        <h3>{formatTitleCase(category.name)}</h3>
        <p className="description">{category.description}</p>
      </div>
    </div>
  );
}

export default Category;
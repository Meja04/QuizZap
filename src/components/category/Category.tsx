import { useNavigate } from "react-router-dom";
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

  const cardClass = `card category-card category-card${category.id % 6}`;
  const iconClass = `material-icons mat-icon${category.id % 6}`;
  
  //sostitutivo della pipe titlecase
  const formatTitleCase = (text: string) =>
    text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

  return (
    <>
      <div className={cardClass} onClick={onSelect}>
        <div className="card-body text-center">
          <i className={iconClass}>{category.icon}</i>
          <h3>{formatTitleCase(category.name)}</h3>
          <p className="description">{category.description}</p>
        </div>
      </div>
    </>
  );
}

export default Category;
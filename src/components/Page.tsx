import { useEffect } from "react";

interface PageProps {
  title: string;
  children: React.ReactNode;
}

const Page: React.FC<PageProps> = ({ title, children }) => {
  useEffect(() => {
    document.title = title;
  }, [title]);

  return <>{children}</>;
};

export default Page;

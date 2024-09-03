import Footer from "./Footer";
import { NavigationBar } from "./NavigationBar";

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = (props) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavigationBar />
      <main className="flex-grow-1">{props.children}</main>
      <Footer />
    </div>
  );
};

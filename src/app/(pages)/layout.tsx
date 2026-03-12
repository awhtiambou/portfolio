import { Header, Footer } from "@/components/layout";
import { ScrollProgress } from "@/components/scroll";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="overflow-x-hidden">
      <ScrollProgress 
        position="top" 
        size={3} 
        className="bg-accent-yellow" 
      />
      <Header />
      {children}
      <Footer />
    </div>
  );
}

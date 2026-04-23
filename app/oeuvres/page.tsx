import Navbar from "../src/components/Navbar";
import Footer from "../src/components/Footer";
import OeuvresIntroSection from "../src/components/OeuvresIntroSection";
import OeuvresGallerySection from "../src/components/OeuvresGallerySection";
import OeuvresQuoteSection from "../src/components/OeuvresQuoteSection";


export default function OeuvresPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f7f5f1] text-[#1a1a1a]">
        <OeuvresIntroSection />
        <OeuvresGallerySection />
        <OeuvresQuoteSection />
      </main>

      <Footer />
    </>
  );
  
}
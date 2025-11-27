
interface SEOTextBlockProps {
  seoText: string;
}

const SEOTextBlock = ({ seoText }: SEOTextBlockProps) => {
  return (
    <section className="py-8 bg-white" aria-labelledby="seo-content">
      <div className="container mx-auto px-4">
        <p className="max-w-3xl mx-auto text-center text-lg text-professional-medium font-inter leading-relaxed">
          {seoText}
        </p>
      </div>
    </section>
  );
};

export default SEOTextBlock;

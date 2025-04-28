import Tag from "../../components/Tag/Tag";
import FAQSection from "../../layouts/FAQSection";
import Navigation from "../../layouts/Navigation";


const Home = () => {

    const faqData = [
        {
          question: 'What is Troott?',
          answer: 'Troott is a platform for accessing and sharing sermons.',
        },
        {
          question: 'How do I get started?',
          answer: 'You can create an account and start browsing sermons.',
        },
        {
          question: 'Is there a free trial?',
          answer: 'Yes, we offer a free trial for new users.',
        },
      ];
    
  return (
    <>

      <Navigation />
      <Tag text="SEE HOW IT WORKS" textColor="#ffffff" bgColor="#000000" />

      <FAQSection 
      faqData={faqData}
      
      />

      {/* <Header
        title="With Troott, accessing sermons is effortless"
        subtitle="Seamless sermon access for individuals, and meaningful solutions for building stronger spiritual communities"
      /> */}
    </>
  );
};

export default Home;

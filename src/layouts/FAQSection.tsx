import React, { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPlusCircle, FaMinusCircle } from 'react-icons/fa';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Card className="faq-item">
      <Card.Header className="faq-header" onClick={toggleOpen}>
        <div className="faq-toggle">
          {isOpen ? ` < ${FaMinusCircle} />` : ` <${FaPlusCircle }/> `}
          <span>{question}</span>
        </div>
      </Card.Header>
      {isOpen && <Card.Body className="faq-body">{answer}</Card.Body>}
    </Card>
  );
};

interface FAQSectionProps {
  faqData: { question: string; answer: string }[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ faqData }) => {
  return (
    <div className="faq-section">
      <Container>
        <Row>
          <Col md={12}>
            <h2>Frequently asked questions</h2>
            {faqData.map((item, index) => (
              <FAQItem key={index} question={item.question} answer={item.answer} />
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQSection;
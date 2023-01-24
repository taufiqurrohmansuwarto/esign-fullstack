import PageContainer from "@/components/pro/PageContainer";
import UserLayout from "@/components/UserLayout";
import { Card, Collapse } from "antd";

const { Panel } = Collapse;

const faqs = [
  {
    id: 1,
    question: "What is an electronic signature?",
    answer:
      "An electronic signature, also known as an e-signature, is a digital version of a traditional, handwritten signature. It is used to sign documents and agreements electronically, typically through a website or mobile application.",
  },
  {
    id: 2,
    question: "How do electronic signatures work?",
    answer:
      "Electronic signatures work by using a combination of technologies, such as encryption and digital certificates, to ensure the authenticity and integrity of the signature. The signer typically signs a document by typing their name, drawing their signature with a mouse or finger, or using a signature pad.",
  },
  {
    id: 3,
    question: "Are electronic signatures legally binding?",
    answer:
      "Yes, electronic signatures are legally binding in many countries, including the United States and the European Union. However, it's important to check the laws and regulations in your specific country or jurisdiction to ensure that electronic signatures are valid.",
  },
  {
    id: 4,
    question: "Can I use an electronic signature for any type of document?",
    answer:
      "Most types of documents can be signed electronically, including contracts, agreements, and legal forms. However, some documents, such as wills and trusts, may require a wet signature (handwritten signature) in order to be legally binding.",
  },
  {
    id: 5,
    question: "How can I ensure the security of my electronic signature?",
    answer:
      "To ensure the security of your electronic signature, it's important to use a reputable electronic signature service that uses strong encryption and digital certificates. Also, keep your computer and mobile device updated with the latest security patches and use a password manager to create unique and strong passwords.",
  },
  {
    id: 6,
    question:
      "Can I use an electronic signature to sign a document if I'm not physically present?",
    answer:
      "Yes, electronic signatures can be used to sign documents regardless of the signer's physical location. This makes electronic signatures especially useful for remote work and international business.",
  },
  {
    id: 7,
    question: "Are electronic signatures cost-effective?",
    answer:
      "Yes, electronic signatures can be more cost-effective than traditional, paper-based signatures. Electronic signatures can save time, reduce paper and printing costs, and improve document security.",
  },
];

const Faq = () => {
  return (
    <PageContainer title="Frequently Asked Question">
      <Card title="List F.A.Q">
        <Collapse accordion>
          {faqs?.map((faq) => (
            <Panel header={faq.question} key={faq.id}>
              <p>{faq.answer}</p>
            </Panel>
          ))}
        </Collapse>
      </Card>
    </PageContainer>
  );
};

Faq.Auth = {
  role: "USER",
};

Faq.getLayout = (page) => {
  return (
    <UserLayout active="/user/settings/digital-certificate">{page}</UserLayout>
  );
};

export default Faq;

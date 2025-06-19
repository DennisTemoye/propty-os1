
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      question: "Can I manage both land and houses?",
      answer: "Yes! ProptyOS supports all property types including residential houses, commercial buildings, land plots, apartments, and mixed-use developments. You can manage your entire portfolio from one dashboard."
    },
    {
      question: "How secure are documents stored?",
      answer: "We use enterprise-grade encryption for all documents stored on our platform. Your data is backed up across multiple secure data centers with 99.9% uptime guarantee. We're also GDPR compliant and follow strict data protection protocols."
    },
    {
      question: "Can I invite team members?",
      answer: "Absolutely! You can invite unlimited team members with role-based access control. Assign specific permissions for agents, managers, accountants, and other staff members to ensure everyone has access to what they need."
    },
    {
      question: "Do you support offline property markets?",
      answer: "Yes, ProptyOS is built specifically for African markets and works both online and offline. You can sync data when internet connectivity is available, making it perfect for rural and emerging market operations."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept various payment methods including bank transfers, mobile money (M-Pesa, Airtel Money, etc.), and major credit/debit cards. We also provide virtual payment accounts for each property to streamline rent and sales collections."
    },
    {
      question: "Is there a free trial available?",
      answer: "Yes! We offer a 14-day free trial for all our paid plans. No credit card required to start. You can explore all features and see how ProptyOS fits your property management needs before making a commitment."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about ProptyOS. Can't find the answer you're looking for? 
              <span className="text-purple-600"> Contact our support team.</span>
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gray-50 rounded-2xl border border-gray-200 px-6"
              >
                <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-purple-600 transition-colors duration-200">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;

"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/landing/faqInfo";
import { useInViewCustom } from "@/hooks/inView/useInViewCustom";

export default function LandingFAQ() {
  const { ref, inView } = useInViewCustom();

  return (
    <div
      ref={ref}
      className={`w-full flex flex-col items-center space-y-8 mt-34 ${
        inView && "slide-in-left"
      }`}
    >
      <h2 className="text-black font-semibold text-3xl text-center">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-[90%] lg:w-[900px]"
        defaultValue="item-1"
      >
        {faqs.map((item) => (
          <AccordionItem
            key={item.value}
            value={item.value}
            className="bg-[#eee] rounded-3xl p-6 my-4"
          >
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
              {item.answer.map((answer) => (
                <p key={answer}>{answer}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

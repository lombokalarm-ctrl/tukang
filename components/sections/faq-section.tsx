import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import type { FAQItem } from "@/lib/types";

export function FAQSection({ title, description, items }: { title: string; description: string; items: FAQItem[] }) {
  return (
    <section className="space-y-8">
      <SectionHeading align="center" description={description} eyebrow="FAQ" title={title} />
      <Accordion className="space-y-4" collapsible type="single">
        {items.map((item, index) => (
          <AccordionItem key={item.question} value={`faq-${index}`}>
            <AccordionTrigger>{item.question}</AccordionTrigger>
            <AccordionContent>{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

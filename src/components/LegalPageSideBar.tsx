import { useState } from 'react';
import { ChevronDown, ChevronRight, HelpCircle, List } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface NavLink {
  id: string;
  label: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface LegalPageSidebarProps {
  title: string;
  navLinks: NavLink[];
  faqItems: FAQItem[];
  faqTitle?: string;
}

export const LegalPageSidebar = ({
  title,
  navLinks,
  faqItems,
  faqTitle = 'Perguntas Frequentes',
}: LegalPageSidebarProps) => {
  const [activeSection, setActiveSection] = useState<string>('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <div className="lg:hidden mb-8">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="nav" className="border rounded-lg bg-card">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <List className="h-4 w-4" />
                <span className="font-roboto-medium">Navegação Rápida</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={cn(
                      'block w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                      'hover:bg-muted hover:text-primary',
                      activeSection === link.id
                        ? 'bg-primary/10 text-primary font-roboto-medium'
                        : 'text-muted-foreground',
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="faq" className="border rounded-lg bg-card mt-2">
            <AccordionTrigger className="px-4 py-3 hover:no-underline">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="font-roboto-medium">{faqTitle}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4 pb-4">
              <Accordion type="single" collapsible className="w-full">
                {faqItems.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b last:border-0"
                  >
                    <AccordionTrigger className="py-3 text-sm text-left hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-muted-foreground pb-3">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <aside className="hidden lg:block w-72 shrink-0">
        <div className="sticky top-24 space-y-6">
          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-roboto-semibold mb-4 flex items-center gap-2">
              <List className="h-4 w-4" />
              {title}
            </h3>
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={cn(
                    'flex items-center gap-2 w-full text-left px-3 py-2 text-sm rounded-md transition-colors',
                    'hover:bg-muted hover:text-primary',
                    activeSection === link.id
                      ? 'bg-primary/10 text-primary font-roboto-medium'
                      : 'text-muted-foreground',
                  )}
                >
                  <ChevronRight className="h-3 w-3" />
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="bg-card rounded-xl border p-5">
            <h3 className="font-roboto-semibold mb-4 flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              {faqTitle}
            </h3>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`faq-${index}`}
                  className="border-b last:border-0"
                >
                  <AccordionTrigger className="py-3 text-sm text-left hover:no-underline">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-3">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </aside>
    </>
  );
};

export default LegalPageSidebar;

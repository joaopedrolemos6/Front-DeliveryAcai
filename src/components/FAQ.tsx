import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Phone } from 'lucide-react';

const faqData = [
  {
    id: 'delivery-area',
    question: 'Qual é a área de entrega?',
    answer: 'Entregamos em toda a região metropolitana. O tempo de entrega é de até 45 minutos e a taxa de entrega é fixa de R$ 5,00.'
  },
  {
    id: 'delivery-time',
    question: 'Quanto tempo demora a entrega?',
    answer: 'Nosso tempo médio de entrega é de 30 a 45 minutos. Você receberá atualizações em tempo real sobre o status do seu pedido.'
  },
  {
    id: 'payment',
    question: 'Quais formas de pagamento vocês aceitam?',
    answer: 'Atualmente aceitamos pagamento em dinheiro na entrega. Em breve teremos outras opções como PIX e cartão.'
  },
  {
    id: 'ingredients',
    question: 'Os ingredientes são frescos?',
    answer: 'Sim! Utilizamos apenas açaí natural e frutas frescas selecionadas diariamente. Nosso açaí é batido na hora do pedido.'
  },
  {
    id: 'customization',
    question: 'Posso personalizar meu açaí?',
    answer: 'Claro! Você pode escolher entre diferentes tamanhos, bases de açaí e mais de 10 tipos de coberturas, incluindo frutas, castanhas e doces.'
  },
  {
    id: 'minimum-order',
    question: 'Há pedido mínimo?',
    answer: 'Não temos valor mínimo de pedido. Você pode pedir apenas um açaí se desejar!'
  },
  {
    id: 'operating-hours',
    question: 'Qual é o horário de funcionamento?',
    answer: 'Funcionamos de segunda a domingo, das 10h às 22h. Pedidos feitos após às 21h30 serão entregues no dia seguinte.'
  },
  {
    id: 'allergens',
    question: 'Vocês têm opções para pessoas com alergias?',
    answer: 'Informamos todos os ingredientes e possíveis alérgenos. Nosso açaí natural não contém glúten, mas algumas coberturas podem conter. Entre em contato para mais informações.'
  },
  {
    id: 'cancel-order',
    question: 'Posso cancelar meu pedido?',
    answer: 'Pedidos podem ser cancelados até 5 minutos após a confirmação. Após esse período, entre em contato conosco pelo telefone.'
  },
  {
    id: 'contact',
    question: 'Como entro em contato?',
    answer: 'Você pode nos contatar pelo telefone (11) 99999-9999 ou através do WhatsApp. Estamos sempre prontos para ajudar!'
  }
];

export const FAQ = () => {
  return (
    <section className="container mx-auto px-4 py-20" id="faq">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-foreground mb-4">Perguntas Frequentes</h2>
        <p className="text-lg text-muted-foreground">
          Tire suas dúvidas sobre nossos açaís e entregas
        </p>
      </div>

      <Card className="glass max-w-4xl mx-auto p-6">
        <Accordion type="single" collapsible className="w-full">
          {faqData.map((faq, index) => (
            <AccordionItem key={faq.id} value={faq.id}>
              <AccordionTrigger className="text-left text-foreground hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Card>

      <div className="text-center mt-8">
        <p className="text-muted-foreground mb-4">
          Não encontrou sua resposta? Entre em contato conosco!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+5511999999999"
            className="btn-glass inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <Phone className="w-4 h-4" />
            (11) 99999-9999
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
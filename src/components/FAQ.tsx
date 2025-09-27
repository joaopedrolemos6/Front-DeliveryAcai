import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';

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
            className="btn-glass inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            📞 (11) 99999-9999
          </a>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium transition-all duration-200 hover:scale-105"
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
import { Button } from '@/components/ui/button';
import { ArrowRight, Star } from 'lucide-react';

interface HeroSectionProps {
  onStartOrder: () => void;
}

export const HeroSection = ({ onStartOrder }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-hero opacity-80" />
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-primary/20 animate-float" />
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-primary/10 animate-float" style={{animationDelay: '2s'}} />
      <div className="absolute bottom-32 left-20 w-16 h-16 rounded-full bg-primary/15 animate-float" style={{animationDelay: '4s'}} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="glass-card max-w-4xl mx-auto animate-slide-up">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-primary text-primary" />
              ))}
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            Açaí
            <span className="bg-gradient-primary bg-clip-text text-transparent"> Fresquinho</span>
            <br />
            Na Sua Casa
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Monte seu açaí personalizado com ingredientes frescos e receba com entrega própria. 
            Sem taxas de terceiros, direto da nossa açaíteria para você.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onStartOrder}
              size="lg"
              className="btn-primary text-lg px-8 py-4 group"
            >
              Monte Seu Açaí
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            <div className="glass rounded-xl px-6 py-4">
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="text-center">
                  <div className="font-bold text-primary text-xl">45min</div>
                  <div>Entrega</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-bold text-primary text-xl">R$ 5</div>
                  <div>Taxa fixa</div>
                </div>
                <div className="w-px h-8 bg-border" />
                <div className="text-center">
                  <div className="font-bold text-primary text-xl">100%</div>
                  <div>Natural</div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍇</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ingredientes Frescos</h3>
              <p className="text-sm text-muted-foreground">Açaí natural e frutas selecionadas diariamente</p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Entrega Própria</h3>
              <p className="text-sm text-muted-foreground">Sem intermediários, direto para sua casa</p>
            </div>

            <div className="glass rounded-xl p-6 text-center">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-semibold text-foreground mb-2">Super Rápido</h3>
              <p className="text-sm text-muted-foreground">Preparamos e entregamos em até 45 minutos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
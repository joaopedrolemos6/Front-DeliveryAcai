import { Button } from '@/components/ui/button';
import { ArrowRight, Star, Leaf, Clock, Heart, Sparkles } from 'lucide-react';
import acaiHero from '@/assets/acai-hero.jpg';

interface HeroSectionProps {
  onStartOrder: () => void;
}

export const HeroSection = ({ onStartOrder }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with hero image overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5"
          style={{ backgroundImage: `url(${acaiHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-hero" />
      </div>
      
      {/* Floating elements with açaí theme */}
      <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-primary/5 animate-float flex items-center justify-center">
        <Leaf className="w-8 h-8 text-primary/40" />
      </div>
      <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-accent/20 animate-float" style={{animationDelay: '2s'}}>
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-accent/40" />
        </div>
      </div>
      <div className="absolute bottom-32 left-20 w-20 h-20 rounded-full bg-primary/10 animate-float" style={{animationDelay: '4s'}}>
        <div className="w-full h-full rounded-full flex items-center justify-center">
          <Heart className="w-6 h-6 text-primary/60" />
        </div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="glass-card max-w-5xl mx-auto animate-slide-up">
          {/* Rating stars */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-accent/20 rounded-full px-6 py-3">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground ml-2">5.0 • 2,847 avaliações</span>
            </div>
          </div>

          {/* Main heading */}
          <div className="mb-8">
            <h1 className="heading-display text-foreground mb-4 leading-none">
              Açaí
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Artesanal
              </span>
              <span className="block text-muted-foreground">Na Sua Casa</span>
            </h1>
          </div>

          <p className="text-elegant text-muted-foreground mb-12 max-w-3xl mx-auto">
            Experiência gastronômica premium com açaí natural da Amazônia, 
            ingredientes selecionados e entrega própria. Sem intermediários, 
            direto da nossa açaíteria artesanal para você.
          </p>

          {/* CTA Section */}
          <div className="flex flex-col items-center gap-8 mb-16">
            <Button 
              onClick={onStartOrder}
              size="lg"
              className="btn-primary text-lg px-12 py-6 group shadow-glow"
            >
              Criar Meu Açaí
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-8 glass rounded-3xl px-8 py-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-2">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div className="font-display font-medium text-2xl text-primary">30min</div>
                <div className="text-sm text-muted-foreground">Entrega média</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-accent/20 mx-auto mb-2">
                  <span className="text-xl">🌿</span>
                </div>
                <div className="font-display font-medium text-2xl text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Natural</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mx-auto mb-2">
                  <span className="text-xl">🚚</span>
                </div>
                <div className="font-display font-medium text-2xl text-primary">R$ 5</div>
                <div className="text-sm text-muted-foreground">Taxa única</div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="acai-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-3">Açaí Premium</h3>
              <p className="text-muted-foreground leading-relaxed">
                Açaí natural da Amazônia, batido na consistência perfeita, 
                sem conservantes ou aditivos artificiais
              </p>
            </div>

            <div className="acai-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-secondary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-8 h-8 text-accent-vibrant" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-3">Ingredientes Frescos</h3>
              <p className="text-muted-foreground leading-relaxed">
                Frutas selecionadas diariamente, granolas artesanais 
                e coberturas premium para uma experiência única
              </p>
            </div>

            <div className="acai-card p-8 text-center group">
              <div className="w-16 h-16 bg-gradient-primary rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-display text-xl font-medium text-foreground mb-3">Entrega Própria</h3>
              <p className="text-muted-foreground leading-relaxed">
                Sem intermediários, controle total da qualidade 
                desde o preparo até a sua mesa
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
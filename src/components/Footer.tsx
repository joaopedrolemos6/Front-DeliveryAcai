import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Clock, Instagram, Facebook, Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="glass-card mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-display font-medium text-foreground">AçaiPro</h3>
                <p className="text-sm text-muted-foreground">Açaíteria Artesanal</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Açaí fresquinho direto da nossa açaíteria para sua casa, 
              sem intermediários e com entrega própria.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary" />
                <a href="tel:+5511999999999" className="text-sm text-muted-foreground hover:text-primary">
                  (11) 99999-9999
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  São Paulo, SP
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Seg-Dom: 10h às 22h
                </span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Links Úteis</h4>
            <div className="space-y-2">
              <a href="#faq" className="block text-sm text-muted-foreground hover:text-primary">
                Perguntas Frequentes
              </a>
              <a href="#privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Política de Privacidade
              </a>
              <a href="#terms" className="block text-sm text-muted-foreground hover:text-primary">
                Termos de Uso
              </a>
              <a href="#about" className="block text-sm text-muted-foreground hover:text-primary">
                Sobre Nós
              </a>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Redes Sociais</h4>
            <div className="flex space-x-3">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://wa.me/5511999999999" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl glass flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-200"
              >
                <span className="text-sm">💬</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © 2024 AçaiPro. Todos os direitos reservados.
          </p>
          <p className="text-sm text-muted-foreground">
            Feito com 💜 para os amantes de açaí
          </p>
        </div>
      </div>
    </footer>
  );
};
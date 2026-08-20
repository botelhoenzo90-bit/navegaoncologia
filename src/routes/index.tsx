import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Menu, X, ChevronRight, CheckCircle2, Heart, Shield, Calendar, Activity, Users, ArrowRight, Star, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Navega Onco | Tecnologia e Cuidado Oncológico" },
      { name: "description", content: "Acompanhamento humanizado, navegação oncológica e telemonitoramento para trazer mais segurança durante todo o tratamento do câncer." },
      { property: "og:title", content: "Navega Onco | Tecnologia e Cuidado Oncológico" },
      { property: "og:description", content: "Acompanhamento humanizado e tecnologia para pacientes oncológicos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappLink = "https://wa.me/5500000000000"; // Placeholder

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground font-sans">
      {/* Header */}
      <header 
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-white/80 py-3 shadow-sm backdrop-blur-md" : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
              <Activity className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-primary">Navega Onco</span>
          </div>

          <nav className="hidden items-center gap-8 md:flex">
            {["Sobre", "Serviços", "Como Funciona", "Para Quem", "FAQ"].map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item}
              </button>
            ))}
            <Button 
              className="rounded-full bg-primary px-6 font-semibold shadow-md transition-all hover:scale-105"
              onClick={() => window.open(whatsappLink, "_blank")}
            >
              WhatsApp
            </Button>
          </nav>

          <button className="md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-0 z-[60] flex flex-col bg-white p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-primary">Navega Onco</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="h-8 w-8" />
              </button>
            </div>
            <div className="mt-12 flex flex-col gap-6">
              {["Sobre", "Serviços", "Como Funciona", "Para Quem", "FAQ"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase().replace(" ", "-"))}
                  className="text-left text-2xl font-semibold"
                >
                  {item}
                </button>
              ))}
              <Button 
                size="lg" 
                className="mt-4 rounded-xl"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Agendar pelo WhatsApp
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
          <div className="absolute top-0 right-0 -z-10 h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 -z-10 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl" />
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Badge className="mb-6 border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary hover:bg-primary/20">
                  Saúde Digital & Humanizada
                </Badge>
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-6xl">
                  Tecnologia que conecta, cuida e transforma a <span className="text-primary">jornada do paciente oncológico.</span>
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground md:text-xl">
                  Acompanhamento humanizado, navegação oncológica e telemonitoramento para trazer mais segurança, organização e tranquilidade durante todo o tratamento.
                </p>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-primary px-8 text-lg font-semibold shadow-lg shadow-primary/20 transition-transform hover:scale-105"
                    onClick={() => window.open(whatsappLink, "_blank")}
                  >
                    Agendar pelo WhatsApp
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="rounded-full border-primary/20 px-8 text-lg font-semibold hover:bg-primary/5"
                    onClick={() => scrollTo("serviços")}
                  >
                    Conheça nossa solução
                  </Button>
                </div>
                <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-slate-200" />
                    ))}
                  </div>
                  <span>Join 500+ families already navigating together</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" 
                    alt="Profissional de saúde cuidando de paciente" 
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                <div className="absolute -right-8 -bottom-8 z-20 w-64 rounded-2xl bg-white p-6 shadow-xl shadow-black/5 ring-1 ring-black/5">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 text-accent">
                      <Heart className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Cuidado 24/7</p>
                      <p className="text-xs text-muted-foreground">Sempre ao seu lado</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="bg-slate-50 py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">Sobre a Navega Onco</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                A Navega Onco nasceu para garantir que pacientes e familiares tenham orientação durante todas as etapas do tratamento, reduzindo dúvidas, barreiras e inseguranças.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Acompanhamento contínuo", icon: Calendar },
                { title: "Atendimento humanizado", icon: Heart },
                { title: "Segurança nas decisões", icon: Shield },
                { title: "Organização da jornada", icon: Activity },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Problemas Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-foreground">O que resolvemos</h2>
              <p className="mt-4 text-muted-foreground">Superando os desafios do tratamento oncológico</p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {[
                "Falta de orientação",
                "Ansiedade pós-diagnóstico",
                "Dificuldade de acesso",
                "Informações desencontradas",
                "Falta de acompanhamento"
              ].map((prob, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="rounded-2xl border border-destructive/10 bg-destructive/[0.02] p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                    <X className="h-6 w-6 text-destructive" />
                  </div>
                  <p className="font-semibold text-foreground">{prob}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Solução & Serviços */}
        <section id="serviços" className="bg-primary py-20 text-white lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                  Mais do que uma consulta, caminhamos ao seu lado.
                </h2>
                <p className="mt-8 text-xl text-white/80">
                  Nossa solução integra tecnologia e cuidado humano para monitorar cada passo da sua jornada.
                </p>
                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                  {[
                    "Navegação Oncológica",
                    "Telemonitoramento",
                    "Enfermagem Online",
                    "Educação em Saúde",
                    "Gestão de Sintomas",
                    "Acompanhamento Familiar"
                  ].map((service, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <span className="font-medium">{service}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  size="lg" 
                  variant="secondary" 
                  className="mt-12 rounded-full px-8 text-primary shadow-xl"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  Saiba mais no WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                {[
                  { title: "Telemonitoramento", desc: "Monitoramento constante de dor, náuseas e outros sintomas." },
                  { title: "Protocolos Digitais", desc: "Automação e organização para clínicas e hospitais." },
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="rounded-3xl bg-white/10 p-8 backdrop-blur-lg"
                  >
                    <h4 className="text-xl font-bold">{card.title}</h4>
                    <p className="mt-4 text-white/70">{card.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Para Quem é Section */}
        <section id="para-quem" className="bg-slate-50 py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Para quem é a Navega Onco?</h2>
              <p className="mt-4 text-muted-foreground">Soluções completas para todo o ecossistema de saúde oncológica</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Pacientes e Familiares", desc: "Suporte contínuo e navegação para reduzir a ansiedade e organizar a jornada." },
                { title: "Clínicas Oncológicas", desc: "Otimização de processos e melhoria do desfecho clínico dos pacientes." },
                { title: "Hospitais", desc: "Redução de reinternações e gestão eficiente de sintomas pós-alta." },
                { title: "Centros de Infusão", desc: "Acompanhamento remoto entre as sessões de tratamento." },
                { title: "Profissionais da Saúde", desc: "Dados estruturados para melhores decisões clínicas." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="rounded-2xl bg-white p-8 shadow-sm transition-all hover:shadow-md"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Nossa Equipe Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Nossa Equipe</h2>
              <p className="mt-4 text-muted-foreground">Especialistas dedicados ao seu cuidado</p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Dra. Ana Silva", role: "Navegadora Oncológica", desc: "Especialista em gestão de sintomas e suporte emocional." },
                { name: "Dr. Roberto Santos", role: "Coordenação de Telemonitoramento", desc: "Expert em tecnologia aplicada ao cuidado remoto." },
                { name: "Enf. Carla Oliveira", role: "Educação em Saúde", desc: "Focada em empoderar pacientes através do conhecimento." },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-slate-200/50"
                >
                  <div className="aspect-[4/3] bg-slate-200" />
                  <div className="p-8 text-center">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm font-medium text-primary uppercase tracking-wider">{member.role}</p>
                    <p className="mt-4 text-muted-foreground">{member.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Depoimentos Section */}
        <section className="bg-primary/5 py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Depoimentos</h2>
              <p className="mt-4 text-muted-foreground">O que dizem sobre nossa jornada juntos</p>
            </div>
            
            <Carousel className="mx-auto w-full max-w-4xl">
              <CarouselContent>
                {[
                  { name: "Maria Oliveira", text: "A Navega Onco trouxe a paz que eu precisava. Não me senti sozinha em nenhum momento do tratamento.", stars: 5 },
                  { name: "João Pereira", text: "O telemonitoramento foi essencial para ajustar minhas medicações rapidamente.", stars: 5 },
                  { name: "Ana Costa", text: "Equipe maravilhosa e suporte técnico impecável.", stars: 5 },
                ].map((dep, idx) => (
                  <CarouselItem key={idx}>
                    <div className="p-2">
                      <Card className="border-none shadow-none bg-transparent">
                        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                          <div className="flex mb-4 gap-1">
                            {[...Array(dep.stars)].map((_, i) => <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />)}
                          </div>
                          <p className="text-2xl italic text-foreground/80">"{dep.text}"</p>
                          <div className="mt-8 flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-slate-300" />
                            <div className="text-left">
                              <p className="font-bold">{dep.name}</p>
                              <p className="text-sm text-muted-foreground">Paciente</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-8 gap-4">
                <CarouselPrevious className="static translate-y-0" />
                <CarouselNext className="static translate-y-0" />
              </div>
            </Carousel>
          </div>
        </section>

        {/* Blog Section */}
        <section id="blog" className="py-20 lg:py-32">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 flex flex-col items-end justify-between gap-6 md:flex-row md:items-center">
              <div>
                <h2 className="text-3xl font-bold text-foreground md:text-4xl">Conteúdo & Educação</h2>
                <p className="mt-4 text-muted-foreground">Informações de qualidade para sua jornada</p>
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary/80">
                Ver todos os artigos <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {[
                { title: "Cuidados durante o tratamento", category: "Educação" },
                { title: "Direitos dos pacientes oncológicos", category: "Legislação" },
                { title: "Qualidade de vida e nutrição", category: "Bem-estar" },
              ].map((post, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="group cursor-pointer overflow-hidden rounded-2xl bg-white transition-all hover:-translate-y-2"
                >
                  <div className="aspect-video bg-slate-100" />
                  <div className="p-6">
                    <Badge variant="secondary" className="mb-3">{post.category}</Badge>
                    <h3 className="text-xl font-bold transition-colors group-hover:text-primary">{post.title}</h3>
                    <p className="mt-3 text-sm text-muted-foreground">Leia mais sobre como gerenciar sua saúde e bem-estar...</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 lg:py-32">
          <div className="container mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Perguntas Frequentes</h2>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {[
                { q: "Como funciona o acompanhamento?", a: "Nossa equipe utiliza tecnologia de ponta para monitorar seus sintomas em tempo real e fornecer orientações personalizadas através da nossa plataforma e contato direto." },
                { q: "Preciso sair de casa para ser atendido?", a: "Não. A Navega Onco é focada em saúde digital, oferecendo suporte remoto de alta qualidade que complementa o seu tratamento presencial." },
                { q: "A Navega Onco substitui o médico?", a: "De forma alguma. Somos um serviço de suporte e navegação que trabalha em conjunto com sua equipe médica para otimizar os resultados e sua qualidade de vida." },
                { q: "Quem pode utilizar o serviço?", a: "Pacientes oncológicos em qualquer estágio do tratamento, seus familiares, além de clínicas e hospitais que buscam melhorar o desfecho clínico." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="mb-4 border-b-0 rounded-2xl bg-slate-50 px-6">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative overflow-hidden bg-primary py-24 text-white">
          <div className="container mx-auto px-4 text-center lg:px-8">
            <motion.div {...fadeInUp}>
              <h2 className="text-4xl font-bold md:text-5xl lg:text-6xl">
                Você não precisa enfrentar essa jornada sozinho.
              </h2>
              <p className="mx-auto mt-8 max-w-2xl text-xl text-white/80">
                Conte com acompanhamento especializado para trazer mais segurança, organização e tranquilidade durante o tratamento.
              </p>
              <div className="mt-12">
                <Button 
                  size="lg" 
                  className="rounded-full bg-white px-10 py-7 text-xl font-bold text-primary shadow-2xl transition-transform hover:scale-105"
                  onClick={() => window.open(whatsappLink, "_blank")}
                >
                  <MessageSquare className="mr-3 h-6 w-6" /> Falar com um especialista
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold text-primary">Navega Onco</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Navega Onco. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              {["Privacidade", "Termos", "Contato"].map((t) => (
                <a key={t} href="#" className="text-sm text-muted-foreground hover:text-primary">{t}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => window.open(whatsappLink, "_blank")}
        className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30"
      >
        <MessageSquare className="h-8 w-8" />
      </motion.button>
    </div>
  );
}

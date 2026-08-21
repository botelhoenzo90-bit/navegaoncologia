import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Menu, X, ChevronRight, CheckCircle2, Heart, Shield, Calendar, Activity, Users, ArrowRight, Star, Plus, Stethoscope, Search, Layers, FileText, Layout } from "lucide-react";
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
import logoAsset from "@/assets/logo.asset.json";
import heroNewAsset from "@/assets/hero-new.png.asset.json";
import whatsappLogoAsset from "@/assets/whatsapp-logo.asset.json";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Navega Onco | Tecnologia e Cuidado Oncológico" },
      { name: "description", content: "Acompanhamento humanizado, navegação oncológica e telemonitoramento para trazer mais segurança durante todo o tratamento do câncer." },
      { property: "og:title", content: "Navega Onco | Tecnologia e Cuidado Oncológico" },
      { property: "og:description", content: "Acompanhamento humanizado e tecnologia para pacientes oncológicos." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200" },
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

      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-4 pb-12 lg:pt-8 lg:pb-20">
          <div className="absolute top-0 right-0 -z-10 h-[400px] w-[400px] rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 -z-10 h-[300px] w-[300px] rounded-full bg-accent/10 blur-3xl" />
          
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col items-center text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8"
              >
                <img src={logoAsset.url} alt="Navega Onco" className="h-24 w-auto mx-auto lg:h-32" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl"
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
                <div className="mt-10 flex flex-wrap justify-center gap-4">
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
                <div className="mt-12 flex flex-col items-center gap-6">
                  <div className="flex -space-x-4">
                    {[
                      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=150",
                      "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=150",
                      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=150",
                      "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&q=80&w=150"
                    ].map((url, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="h-16 w-16 rounded-full border-4 border-white shadow-md overflow-hidden bg-slate-200"
                      >
                        <img src={url} alt={`Paciente ${i+1}`} className="h-full w-full object-cover" />
                      </motion.div>
                    ))}
                  </div>
                  <p className="text-base font-medium text-slate-700">
                    Mais de <span className="text-primary font-bold">500+ famílias</span> cuidada pela nossa plataforma no Brasil
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mt-16 w-full max-w-4xl"
              >
                <div className="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src={heroNewAsset.url} 
                    alt="Profissional de saúde cuidando de paciente" 
                    className="h-full w-full object-cover aspect-video"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                </div>
                {/* Removido o card "Cuidado 24/7 Sempre ao seu lado" conforme pedido */}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Sobre Section */}
        <section id="sobre" className="bg-slate-50 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">Quem Somos Nós</h2>
              <div className="mt-4 h-1.5 w-24 bg-primary mx-auto rounded-full" />
              <p className="mt-8 text-lg leading-relaxed text-muted-foreground md:text-xl">
                A Navega Onco nasceu para garantir que pacientes e familiares tenham orientação durante todas as etapas do tratamento, reduzindo dúvidas, barreiras e inseguranças através de uma abordagem humanizada e tecnológica.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { title: "Acompanhamento contínuo", icon: Calendar, desc: "Monitoramento constante em todas as fases da sua jornada." },
                { title: "Atendimento humanizado", icon: Heart, desc: "Cuidado centrado no paciente com empatia e acolhimento." },
                { title: "Segurança nas decisões", icon: Shield, desc: "Informações confiáveis para você e sua família decidirem com clareza." },
                { title: "Organização da jornada", icon: Activity, desc: "Gestão completa de consultas, exames e etapas do tratamento." },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="group rounded-3xl bg-white p-8 shadow-md ring-1 ring-slate-100 transition-all hover:shadow-xl flex flex-col items-center text-center"
                >
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform group-hover:scale-110 shadow-inner">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                  <p className="text-muted-foreground mb-6 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button 
                size="lg" 
                className="rounded-full bg-primary px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Conheça mais sobre nós no WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* Problemas Section - Refatorada */}
        <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -z-10 skew-x-12 transform translate-x-20" />
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <Badge className="bg-destructive/10 text-destructive border-destructive/20 mb-4 px-4 py-1">Desafios Comuns</Badge>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl leading-tight">O Que Resolvemos</h2>
              <p className="mt-6 text-xl text-muted-foreground">
                Entendemos as dores da jornada oncológica e criamos soluções para superar cada obstáculo no seu caminho.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "Falta de orientação", icon: Search, desc: "Eliminamos a sensação de estar perdido no sistema de saúde." },
                { title: "Ansiedade pós-diagnóstico", icon: Heart, desc: "Apoio emocional e técnico imediato nos momentos mais difíceis." },
                { title: "Dificuldade de acesso", icon: Layout, desc: "Facilitamos a conexão com os serviços e profissionais necessários." },
                { title: "Informações desencontradas", icon: FileText, desc: "Centralizamos e organizamos todos os dados do seu tratamento." },
                { title: "Falta de acompanhamento", icon: Activity, desc: "Monitoramento contínuo, não apenas no dia da consulta." },
                { title: "Insegurança Familiar", icon: Shield, desc: "Damos suporte e clareza para que a família saiba como ajudar." }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  transition={{ delay: idx * 0.1 }}
                  className="relative group rounded-[2rem] border-2 border-red-100 bg-red-50/30 p-10 shadow-xl shadow-red-200/20 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-200 transition-all duration-300 overflow-hidden flex flex-col items-center text-center"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-bl-[4rem] group-hover:bg-red-500/10 transition-colors" />
                  <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-100 text-red-600 group-hover:scale-110 transition-transform shadow-inner">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-lg">{item.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 flex justify-center">
              <Button 
                size="lg" 
                variant="destructive"
                className="rounded-full px-10 text-lg font-bold shadow-xl hover:scale-105 transition-transform"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Quero resolver esses problemas agora
              </Button>
            </div>
          </div>
        </section>

        {/* Solução & Serviços */}
        <section id="serviços" className="bg-primary py-16 text-white lg:py-24">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto flex flex-col items-center">
              <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
                Mais do que uma consulta, caminhamos ao seu lado.
              </h2>
              <p className="mt-8 text-xl text-white/80">
                Nossa solução integra tecnologia e cuidado humano para monitorar cada passo da sua jornada.
              </p>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 w-full">
                {[
                  "Navegação Oncológica",
                  "Telemonitoramento",
                  "Enfermagem Online",
                  "Educação em Saúde",
                  "Gestão de Sintomas",
                  "Acompanhamento Familiar"
                ].map((service, idx) => (
                  <div key={idx} className="flex items-center justify-center gap-3 bg-white/10 rounded-xl p-4">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 shrink-0">
                      <CheckCircle2 className="h-5 w-5" />
                    </div>
                    <span className="font-medium">{service}</span>
                  </div>
                ))}
              </div>
              <Button 
                size="lg" 
                variant="secondary" 
                className="mt-12 rounded-full px-10 text-primary shadow-xl font-bold hover:scale-105 transition-transform"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Solicitar atendimento no WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
            
            <div className="mt-20 grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              {[
                { title: "Telemonitoramento", desc: "Monitoramento constante de dor, náuseas e outros sintomas.", icon: Activity },
                { title: "Protocolos Digitais", desc: "Automação e organização para clínicas e hospitais.", icon: Shield },
              ].map((card, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="rounded-3xl bg-white/10 p-8 backdrop-blur-lg flex flex-col items-center"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white">
                    <card.icon className="h-7 w-7" />
                  </div>
                  <h4 className="text-xl font-bold">{card.title}</h4>
                  <p className="mt-4 text-white/70">{card.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 flex justify-center">
              <Button 
                size="lg" 
                variant="secondary" 
                className="rounded-full px-10 text-primary shadow-xl font-bold hover:scale-105 transition-transform"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Solicitar atendimento no WhatsApp <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Como Funciona Section */}
        <section id="como-funciona" className="py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Como Funciona</h2>
              <p className="mt-4 text-muted-foreground">Um processo estruturado para o seu bem-estar</p>
            </div>
            <div className="mt-16 relative">
              <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5 relative z-10">
                {[
                  { title: "Primeiro contato", desc: "Conexão inicial para entender sua necessidade através do WhatsApp.", icon: MessageSquare },
                  { title: "Avaliação inicial", desc: "Análise profunda do seu histórico com nossa equipe especializada.", icon: Search },
                  { title: "Plano individualizado", desc: "Construção da sua rota de navegação personalizada.", icon: Layers },
                  { title: "Acompanhamento", desc: "Monitoramento contínuo e suporte humanizado 24h.", icon: Activity },
                  { title: "Orientações", desc: "Suporte completo durante cada ciclo do tratamento.", icon: Heart },
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    {...fadeInUp}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="relative mb-8">
                        <div className="h-20 w-20 rounded-3xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30 group-hover:scale-110 transition-transform rotate-3 group-hover:rotate-0">
                          <step.icon className="h-10 w-10" />
                        </div>
                        <div className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-accent flex items-center justify-center text-white font-bold text-sm border-4 border-white">
                          {idx + 1}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                    </div>
                    {idx < 4 && (
                      <div className="hidden lg:block absolute top-10 left-[70%] w-full h-[2px] bg-gradient-to-r from-primary/30 to-transparent -z-10" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Serviços Premium Section - Refatorada */}
        <section className="bg-slate-950 py-16 text-white lg:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(124,58,237,0.1),transparent)]" />
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <Badge className="bg-primary/20 text-primary border-primary/30 mb-6 px-6 py-2">Experiência Exclusiva</Badge>
              <h2 className="text-4xl font-extrabold md:text-5xl leading-tight">Serviços Premium</h2>
              <p className="mt-6 text-xl text-white/60">
                A excelência no cuidado oncológico através de soluções avançadas e personalizadas para pacientes exigentes e instituições de referência.
              </p>
            </div>
            <div className="relative flex overflow-hidden -mx-4 lg:-mx-8">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 25, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex gap-8 pr-8"
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    {[
                      { title: "Navegação Oncológica", items: ["Plano individualizado", "Monitoramento ativo", "Educação do paciente"] },
                      { title: "Telemonitoramento Inteligente", items: ["Dor e Náuseas", "Febre e Fadiga", "Sintomas do tratamento"] },
                      { title: "Consultoria Institucional", items: ["Implantação de navegação", "Protocolos digitais", "Capacitação de equipe"] },
                    ].map((service, idx) => (
                      <div
                        key={idx}
                        className="w-[300px] md:w-[350px] shrink-0 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm flex flex-col"
                      >
                        <h3 className="text-2xl font-bold text-primary">{service.title}</h3>
                        <ul className="mt-6 space-y-4">
                          {service.items.map((item, i) => (
                            <li key={i} className="flex items-center gap-3 text-white/80">
                              <CheckCircle2 className="h-5 w-5 text-primary" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Para Quem é Section */}
        <section id="para-quem" className="bg-slate-50 py-12 lg:py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center">
              <h2 className="text-3xl font-bold text-foreground md:text-4xl">Para quem é a Navega Onco?</h2>
              <p className="mt-4 text-muted-foreground">Soluções completas para todo o ecossistema de saúde oncológica</p>
            </div>
            <div className="relative flex overflow-hidden -mx-4 lg:-mx-8">
              <motion.div 
                animate={{ x: ["0%", "-50%"] }}
                transition={{ 
                  duration: 35, 
                  repeat: Infinity, 
                  ease: "linear" 
                }}
                className="flex gap-8 pr-8"
              >
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-8">
                    {[
                      { title: "Pacientes e Familiares", desc: "Suporte contínuo e navegação para reduzir a ansiedade.", icon: Users },
                      { title: "Clínicas Oncológicas", desc: "Otimização de processos e melhoria do desfecho clínico.", icon: Activity },
                      { title: "Hospitais", desc: "Redução de reinternações e gestão eficiente pós-alta.", icon: Shield },
                      { title: "Centros de Infusão", desc: "Acompanhamento remoto entre as sessões de tratamento.", icon: Calendar },
                      { title: "Profissionais da Saúde", desc: "Dados estruturados para melhores decisões clínicas.", icon: Stethoscope },
                      { title: "Ecossistema de Saúde", desc: "Soluções completas para operadoras e gestores.", icon: Layout },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="w-[280px] md:w-[320px] shrink-0 group rounded-[2rem] bg-white p-10 shadow-lg shadow-slate-200/50 flex flex-col items-center text-center border border-slate-50"
                      >
                        <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-primary shadow-inner">
                          <item.icon className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </motion.div>
            </div>
            <div className="mt-16 flex justify-center">
              <Button 
                size="lg" 
                className="rounded-full bg-primary px-10 text-lg font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                onClick={() => window.open(whatsappLink, "_blank")}
              >
                Entrar em contato com nossa equipe
              </Button>
            </div>
          </div>
        </section>

        {/* Nossa Equipe Section - Refatorada */}
        <section className="py-24 lg:py-36 bg-white relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-20 text-center max-w-3xl mx-auto">
              <Badge className="bg-accent/10 text-accent border-accent/20 mb-4 px-6 py-1">Especialistas</Badge>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">Corpo Clínico Especializado</h2>
              <p className="mt-6 text-xl text-muted-foreground">
                Conheça os profissionais dedicados que caminham ao seu lado, combinando alta tecnologia e profundo acolhimento humano.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {[
                { name: "Dra. Ana Silva", role: "Navegadora Oncológica", desc: "Especialista em gestão de sintomas e suporte emocional com 10+ anos de experiência.", img: "https://images.unsplash.com/photo-1559839734-2b71f1536b8e?auto=format&fit=crop&q=80&w=600" },
                { name: "Dr. Roberto Santos", role: "Coordenação Médica", desc: "Expert em tecnologia aplicada ao cuidado remoto e oncologia de precisão.", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=600" },
                { name: "Enf. Carla Oliveira", role: "Educação em Saúde", desc: "Focada em empoderar pacientes através do conhecimento e protocolos digitais.", img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=600" },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  {...fadeInUp}
                  className="group relative overflow-hidden rounded-[2.5rem] bg-slate-50 shadow-xl transition-all hover:shadow-2xl flex flex-col items-center"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden relative">
                    <img src={member.img} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="p-10 text-center flex flex-col items-center bg-white w-full -mt-12 relative z-10 rounded-[2.5rem] shadow-2xl">
                    <Badge className="bg-primary/10 text-primary border-none mb-4">{member.role}</Badge>
                    <h3 className="text-2xl font-bold mb-3">{member.name}</h3>
                    <p className="text-muted-foreground leading-relaxed mb-8">{member.desc}</p>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-primary/20 text-primary hover:bg-primary hover:text-white transition-all font-bold w-full py-6"
                      onClick={() => window.open(whatsappLink, "_blank")}
                    >
                      Agendar Consulta
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        {/* Depoimentos Section - Esteira Infinita */}
        <section className="bg-slate-50 py-24 lg:py-36 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8 mb-16">
            <div className="text-center max-w-3xl mx-auto">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-4 px-6 py-1">Depoimentos</Badge>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">O Que Dizem Nossos Pacientes</h2>
              <p className="mt-6 text-xl text-muted-foreground">
                Histórias reais de quem transformou a jornada oncológica com o nosso apoio.
              </p>
            </div>
          </div>
          
          <div className="relative flex overflow-hidden">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }}
              transition={{ 
                duration: 25, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="flex gap-8 pr-8"
            >
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8">
                  {[
                    { name: "Maria Oliveira", text: "A Navega Onco trouxe a paz que eu precisava. Não me senti sozinha em nenhum momento do tratamento.", stars: 5, img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100" },
                    { name: "João Pereira", text: "O telemonitoramento foi essencial para ajustar minhas medicações rapidamente.", stars: 5, img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" },
                    { name: "Ana Costa", text: "Equipe maravilhosa e suporte técnico impecável. Super recomendo a Navega.", stars: 5, img: "https://images.unsplash.com/photo-1554151228-14d9def656e4?auto=format&fit=crop&q=80&w=100" },
                    { name: "Carlos Melo", text: "A segurança que a plataforma nos passa durante a quimioterapia é indescritível.", stars: 5, img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=100" },
                  ].map((dep, idx) => (
                    <div key={idx} className="w-[350px] md:w-[450px] shrink-0 rounded-[2.5rem] bg-white p-10 shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-center text-center">
                      <div className="flex mb-6 gap-1">
                        {[...Array(dep.stars)].map((_, i) => <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />)}
                      </div>
                      <p className="text-xl md:text-2xl italic text-foreground/80 leading-relaxed mb-10">"{dep.text}"</p>
                      <div className="flex items-center gap-4 mt-auto">
                        <img src={dep.img} alt={dep.name} className="h-16 w-16 rounded-full border-4 border-primary/10 object-cover" />
                        <div className="text-left">
                          <p className="font-bold text-lg">{dep.name}</p>
                          <Badge variant="secondary" className="text-xs">Paciente</Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Patrocinadores Section (Substituindo Blog/Conteúdo) */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <Badge className="bg-slate-100 text-slate-500 border-none mb-4 px-6 py-1">Nossa Rede</Badge>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Instituições e Parceiros que Confiam</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Colaboramos com os principais centros oncológicos e operadoras de saúde para garantir o melhor desfecho para cada paciente. Nossa rede de parceiros fortalece a entrega de um cuidado de alta performance.
              </p>
            </div>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
              {/* Placeholder Logos para Patrocinadores */}
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-20 px-8 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-xl text-slate-300 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all cursor-pointer">
                  LOGO {i}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section - Refatorada */}
        <section id="faq" className="py-24 lg:py-36 bg-slate-50">
          <div className="container mx-auto max-w-4xl px-4 lg:px-8">
            <div className="mb-20 text-center">
              <Badge className="bg-primary/10 text-primary border-none mb-4 px-6 py-1">Dúvidas</Badge>
              <h2 className="text-4xl font-extrabold text-foreground md:text-5xl">Perguntas Frequentes</h2>
              <p className="mt-4 text-xl text-muted-foreground">Tudo o que você precisa saber sobre o nosso acompanhamento.</p>
            </div>
            <Accordion type="single" collapsible className="w-full space-y-4">
              {[
                { q: "Como funciona o acompanhamento?", a: "Nossa equipe utiliza tecnologia de ponta para monitorar seus sintomas em tempo real e fornecer orientações personalizadas através da nossa plataforma e contato direto." },
                { q: "Preciso sair de casa para ser atendido?", a: "Não. A Navega Onco é focada em saúde digital, oferecendo suporte remoto de alta qualidade que complementa o seu tratamento presencial." },
                { q: "A Navega Onco substitui o médico?", a: "De forma alguma. Somos um serviço de suporte e navegação que trabalha em conjunto com sua equipe médica para otimizar os resultados e sua qualidade de vida." },
                { q: "Quem pode utilizar o serviço?", a: "Pacientes oncológicos em qualquer estágio do tratamento, seus familiares, além de clínicas e hospitais que buscam melhorar o desfecho clínico." },
              ].map((item, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`} className="border-none rounded-3xl bg-white px-8 shadow-sm hover:shadow-md transition-shadow">
                  <AccordionTrigger className="text-left text-xl font-bold py-8 hover:no-underline [&[data-state=open]>svg]:rotate-180">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground text-lg leading-relaxed pb-8">
                    <p className="mb-6">{item.a}</p>
                    <Button 
                      variant="outline" 
                      className="rounded-full border-primary/20 text-primary font-bold hover:bg-primary/5 px-8"
                      onClick={() => window.open(whatsappLink, "_blank")}
                    >
                      Falar com especialista <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
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
              <img src={logoAsset.url} alt="Navega Onco" className="h-6 w-auto" />
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
        className="fixed bottom-8 right-8 z-[100] flex h-16 w-16 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30 overflow-hidden"
      >
        <img src={whatsappLogoAsset.url} alt="WhatsApp" className="h-full w-full object-cover" />
      </motion.button>
    </div>
  );
}

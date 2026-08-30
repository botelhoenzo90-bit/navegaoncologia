import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Activity, ArrowRight, Calendar, CheckCircle2, ChevronRight, Heart, Layout,
  Menu, MessageSquare, Play, Search, Shield, Stethoscope, Users, X, Mail,
  MapPin, Phone, Accessibility, Volume2, Eye, Building2, UserRound, Clock,
  ClipboardList, GraduationCap, Bell, LifeBuoy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import logoAsset from "@/assets/logo.asset.json";
import logoSharingAsset from "@/assets/logo-sharing.png.asset.json";
import heroNewAsset from "@/assets/hero-new.png.asset.json";
import whatsappLogoAsset from "@/assets/whatsapp-logo.asset.json";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      { title: "Navega Onco | Cuidado Oncológico Digital e Humanizado" },
      { name: "description", content: "Navegação oncológica, telemonitoramento, educação em saúde e acompanhamento humanizado para pacientes, famílias e instituições." },
      { property: "og:title", content: "Navega Onco | Cuidado Oncológico Digital e Humanizado" },
      { property: "og:description", content: "Tecnologia e cuidado para tornar a jornada oncológica mais organizada, segura e humanizada." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: logoSharingAsset.url },
    ],
  }),
});

type Audience = "patient" | "company" | null;

const SUPPORT_PHONE = "(00) 00000-0000";
const WHATSAPP_LINK = "https://wa.me/5500000000000";

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [audience, setAudience] = useState<Audience>(null);
  const [submitted, setSubmitted] = useState(false);
  const [largeText, setLargeText] = useState(false);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const openForm = (type: Exclude<Audience, null>) => {
    setSubmitted(false);
    setAudience(type);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6 },
  };

  const problems = [
    { title: "Falta de orientação", icon: Search, desc: "Organizamos a jornada e facilitamos o acesso às informações que você precisa." },
    { title: "Dúvidas pós Diagnóstico", icon: Heart, desc: "Acolhemos dúvidas e orientamos os próximos passos com cuidado e clareza." },
    { title: "Facilitamos o seu contato com profissionais qualificados", icon: Layout, desc: "Aproximamos você de profissionais qualificados para um cuidado mais acessível." },
    { title: "Informações desencontradas", icon: ClipboardList, desc: "Ajudamos a organizar informações e etapas para tornar a jornada mais compreensível." },
    { title: "Falta de acompanhamento", icon: Activity, desc: "Acompanhamento à distância para que o cuidado não termine depois da consulta." },
    { title: "Orientamos familiares para executar o cuidado seguro", icon: Shield, desc: "Orientação prática para que familiares se sintam mais preparados para participar do cuidado." },
  ];

  const services = [
    { title: "Telemonitoramento contínuo", icon: Activity, desc: "Acompanhamento à distância com atenção às necessidades relatadas ao longo da jornada." },
    { title: "Educação em Saúde", icon: GraduationCap, desc: "Conteúdo e orientação para ampliar a compreensão sobre o cuidado e o tratamento." },
    { title: "Gestão de Sintomas", icon: Heart, desc: "Personalizamos o acompanhamento e apoiamos a organização das informações sobre sintomas." },
    { title: "Consulta de Enfermagem Especializada Online", icon: Stethoscope, desc: "Atendimento online especializado, com escuta e orientação individualizada." },
    { title: "Suporte Familiar & Pós-Alta", icon: Users, desc: "Orientação familiar mesmo após a alta, com suporte para continuidade do cuidado." },
    { title: "Notificações e lembretes", icon: Bell, desc: "Lembretes e comunicações para ajudar a manter a jornada organizada via canais disponíveis." },
  ];

  const audiences = [
    { title: "Pacientes e familiares", desc: "Acompanhamento humanizado, orientação e navegação durante diferentes momentos da jornada.", icon: Users },
    { title: "Clínicas", desc: "Apoio à jornada do paciente e organização do cuidado oncológico.", icon: Activity },
    { title: "Hospitais e infusão", desc: "Suporte à continuidade do cuidado e acompanhamento após atendimentos.", icon: Building2 },
    { title: "Home Care", desc: "Integração do acompanhamento à distância à rotina de cuidado domiciliar.", icon: Heart },
    { title: "Operadoras", desc: "Soluções de acompanhamento e educação em saúde para beneficiários.", icon: Shield },
    { title: "Empresas do setor", desc: "Soluções personalizadas para diferentes operações de saúde.", icon: Layout },
  ];

  const faq = [
    ["O que é a Navega Onco?", "É uma solução de enfermagem e navegação oncológica que combina cuidado humanizado, acompanhamento à distância e educação em saúde."],
    ["Quem pode utilizar os serviços?", "Pacientes e familiares podem buscar acompanhamento. Também existem soluções direcionadas a clínicas, hospitais, infusão, home care, operadoras e empresas do setor."],
    ["O atendimento é online?", "A Navega Onco oferece serviços digitais e consultas de enfermagem especializada online, conforme a solução adequada para cada necessidade."],
    ["Como funciona o acompanhamento?", "Começamos pela avaliação inicial, entendemos as necessidades, construímos um plano individualizado e realizamos acompanhamento contínuo e orientação."],
    ["A Navega Onco substitui o médico?", "Não. O serviço é complementar e voltado à navegação, enfermagem, educação e organização do cuidado. Não substitui avaliação ou acompanhamento médico."],
  ];

  return (
    <div className={`min-h-screen overflow-x-hidden bg-background text-foreground font-sans ${largeText ? "text-[105%]" : ""} ${highContrast ? "contrast-125" : ""}`}>
      {/* Accessibility bar */}
      <div className="border-b border-primary/10 bg-slate-950 text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-end gap-3 px-4 py-2 text-xs lg:px-8">
          <span className="mr-auto hidden items-center gap-2 sm:flex"><Accessibility className="h-4 w-4" /> Acessibilidade</span>
          <button onClick={() => setLargeText(v => !v)} className="rounded-md px-2 py-1 hover:bg-white/10" aria-label="Aumentar texto"><Eye className="mr-1 inline h-3.5 w-3.5" /> Texto {largeText ? "normal" : "+"}</button>
          <button onClick={() => setHighContrast(v => !v)} className="rounded-md px-2 py-1 hover:bg-white/10" aria-label="Alternar alto contraste">Alto contraste</button>
          <button className="rounded-md px-2 py-1 hover:bg-white/10" aria-label="Informações para pessoas com deficiência auditiva"><Volume2 className="mr-1 inline h-3.5 w-3.5" /> Libras/áudio</button>
        </div>
      </div>

      {/* Header / Home */}
      <header className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl transition-shadow ${isScrolled ? "shadow-lg" : "shadow-sm"}`}>
        <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
          <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary" aria-label="Navega Onco - início">
            <img src={logoAsset.url} alt="Navega Onco" className="h-12 w-auto object-contain" />
            <span className="hidden border-l border-slate-200 pl-3 text-left text-sm font-semibold leading-tight text-primary sm:block">Navega<br />Onco</span>
          </button>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navegação principal">
            <button onClick={() => scrollTo("sobre")} className="text-sm font-semibold text-slate-700 hover:text-primary">Quem Somos</button>
            <button onClick={() => scrollTo("servicos")} className="text-sm font-semibold text-slate-700 hover:text-primary">Nossos Serviços</button>
            <button onClick={() => scrollTo("publicos")} className="text-sm font-semibold text-slate-700 hover:text-primary">Para Quem Somos</button>
            <button onClick={() => scrollTo("como-funciona")} className="text-sm font-semibold text-slate-700 hover:text-primary">Como Funciona</button>
            <button onClick={() => scrollTo("contato")} className="text-sm font-semibold text-slate-700 hover:text-primary">Contato</button>
            <Button onClick={() => openForm("patient")} className="rounded-full px-6">Falar com a Navega Onco</Button>
          </nav>
          <button className="rounded-xl p-2 lg:hidden" onClick={() => setMobileMenuOpen(v => !v)} aria-label="Abrir menu">{mobileMenuOpen ? <X /> : <Menu />}</button>
        </div>
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="border-t bg-white px-5 py-5 lg:hidden">
              {["sobre", "servicos", "publicos", "como-funciona", "contato"].map((id, i) => {
                const labels = ["Quem Somos", "Nossos Serviços", "Para Quem Somos", "Como Funciona", "Contato"];
                return <button key={id} onClick={() => scrollTo(id)} className="block w-full border-b py-3 text-left font-semibold text-slate-700">{labels[i]}</button>;
              })}
              <div className="grid grid-cols-2 gap-3 pt-4"><Button onClick={() => openForm("patient")}>Paciente</Button><Button variant="outline" onClick={() => openForm("company")}>Empresa</Button></div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-primary/5 py-14 lg:py-24">
          <div className="absolute -right-24 top-0 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />
          <div className="container relative z-10 mx-auto px-4 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
              <motion.div {...fadeInUp} className="text-center lg:text-left">
                <Badge className="mb-6 border-primary/20 bg-primary/10 px-4 py-1.5 text-primary">Saúde Digital & Humanizada</Badge>
                <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">Cuidado oncológico mais <span className="text-primary">próximo, organizado e humano.</span></h1>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">A Navega Onco entende a jornada de cada pessoa e cria caminhos de cuidado individualizados, conectando orientação, enfermagem especializada e acompanhamento à distância.</p>
                <div className="mt-9 grid gap-4 sm:grid-cols-2">
                  <Button size="lg" className="h-14 rounded-2xl text-base font-bold shadow-xl shadow-primary/20" onClick={() => openForm("patient")}><UserRound className="mr-2" /> Sou Paciente / Família</Button>
                  <Button size="lg" variant="outline" className="h-14 rounded-2xl border-primary/20 text-base font-bold" onClick={() => openForm("company")}><Building2 className="mr-2" /> Sou Empresa</Button>
                </div>
                <p className="mt-5 text-sm text-muted-foreground">Escolha seu perfil e conte à nossa equipe como podemos ajudar.</p>
              </motion.div>
              <motion.div {...fadeInUp} transition={{ delay: .15 }} className="relative">
                <div className="overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-slate-200">
                  <img src={heroNewAsset.url} alt="Profissional de saúde em atendimento" className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-5 shadow-xl backdrop-blur">
                    <div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary"><Heart className="h-5 w-5" /></div><div><p className="font-bold">Cuidado que acompanha a jornada</p><p className="text-sm text-muted-foreground">Do diagnóstico ao pós-alta</p></div></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Who we are + founders */}
        <section id="sobre" className="bg-slate-50 py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeInUp} className="mx-auto max-w-4xl text-center">
              <Badge className="mb-4 bg-primary/10 text-primary">Quem Somos</Badge>
              <h2 className="text-4xl font-bold md:text-5xl">Cuidado especializado com uma visão mais próxima da pessoa</h2>
              <div className="mx-auto mt-5 h-1.5 w-20 rounded-full bg-primary" />
              <p className="mt-7 text-lg leading-relaxed text-muted-foreground md:text-xl">A Navega Onco é um consultório de enfermagem digital especializado em tornar a jornada do paciente com câncer mais organizada, segura e humanizada, oferecendo acompanhamento contínuo desde o diagnóstico até o pós-tratamento.</p>
            </motion.div>
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {[{ title: "Acompanhamento contínuo", icon: Calendar, desc: "Monitoramento em diferentes fases da jornada." }, { title: "Atendimento humanizado", icon: Heart, desc: "Escuta, acolhimento e cuidado centrado na pessoa." }, { title: "Segurança e orientação", icon: Shield, desc: "Informações organizadas para apoiar decisões conscientes." }, { title: "Jornada organizada", icon: Activity, desc: "Apoio para conectar etapas e necessidades do cuidado." }].map((item, i) => <motion.div {...fadeInUp} transition={{ delay: i * .08 }} key={item.title} className="rounded-3xl bg-white p-7 text-center shadow-md ring-1 ring-slate-100"><div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><item.icon /></div><h3 className="text-lg font-bold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.desc}</p></motion.div>)}
            </div>
            <div className="mt-16 grid items-stretch gap-8 lg:grid-cols-2">
              <Card className="overflow-hidden rounded-[2rem] border-0 shadow-xl"><CardContent className="p-0"><img src={heroNewAsset.url} alt="Atendimento de enfermagem digital" className="h-full min-h-[320px] w-full object-cover" /></CardContent></Card>
              <motion.div {...fadeInUp} className="rounded-[2rem] bg-white p-8 shadow-xl lg:p-12"><Badge className="mb-4 bg-accent/20 text-primary">Nossa história</Badge><h3 className="text-3xl font-bold">Conheça os fundadores</h3><p className="mt-5 leading-relaxed text-muted-foreground">Um espaço reservado para os fundadores apresentarem brevemente sua trajetória profissional, experiência e a motivação que deu origem à Navega Onco.</p><div className="mt-7 grid gap-4 sm:grid-cols-2"><div className="rounded-2xl bg-slate-50 p-5"><Stethoscope className="mb-3 text-primary" /><p className="font-bold">Experiência profissional</p><p className="mt-1 text-sm text-muted-foreground">Trajetória, formação e atuação.</p></div><div className="rounded-2xl bg-slate-50 p-5"><Heart className="mb-3 text-primary" /><p className="font-bold">Propósito</p><p className="mt-1 text-sm text-muted-foreground">Por que escolhemos cuidar dessa jornada.</p></div></div></motion.div>
            </div>
          </div>
        </section>

        {/* Audience forms */}
        <section className="bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center"><Badge className="mb-4 bg-primary/10 text-primary">Comece por aqui</Badge><h2 className="text-4xl font-bold md:text-5xl">Como podemos ajudar?</h2><p className="mt-5 text-lg text-muted-foreground">Escolha seu perfil. Assim conseguimos entender melhor sua necessidade antes do primeiro contato.</p></motion.div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-7 md:grid-cols-2">
              <motion.button {...fadeInUp} onClick={() => openForm("patient")} className="group rounded-[2rem] border border-primary/15 bg-gradient-to-br from-primary/5 to-white p-9 text-left shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"><div className="flex items-center justify-between"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white"><UserRound /></div><ArrowRight className="text-primary transition-transform group-hover:translate-x-1" /></div><h3 className="mt-7 text-2xl font-bold">Sou Paciente ou Familiar</h3><p className="mt-3 leading-relaxed text-muted-foreground">Conte um pouco sobre sua jornada para receber uma orientação mais adequada.</p><span className="mt-6 inline-flex font-bold text-primary">Preencher formulário <ChevronRight className="ml-1" /></span></motion.button>
              <motion.button {...fadeInUp} transition={{ delay: .1 }} onClick={() => openForm("company")} className="group rounded-[2rem] border border-primary/15 bg-gradient-to-br from-slate-50 to-white p-9 text-left shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"><div className="flex items-center justify-between"><div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white"><Building2 /></div><ArrowRight className="text-primary transition-transform group-hover:translate-x-1" /></div><h3 className="mt-7 text-2xl font-bold">Sou Empresa</h3><p className="mt-3 leading-relaxed text-muted-foreground">Apresente sua operação e descubra soluções Navega Onco para o seu contexto.</p><span className="mt-6 inline-flex font-bold text-primary">Preencher formulário <ChevronRight className="ml-1" /></span></motion.button>
            </div>
          </div>
        </section>

        {/* What we solve */}
        <section className="relative overflow-hidden bg-white py-16 lg:py-24">
          <div className="container mx-auto px-4 lg:px-8"><motion.div {...fadeInUp} className="mx-auto mb-14 max-w-3xl text-center"><Badge className="mb-4 bg-primary/10 text-primary">Nossa proposta</Badge><h2 className="text-4xl font-bold md:text-5xl">O que resolvemos</h2><p className="mt-6 text-xl leading-relaxed text-muted-foreground">Entendemos a dor do cliente, criamos plano de cuidados individualizados de acordo com suas necessidades da jornada de cuidado.</p></motion.div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{problems.map((item, i) => <motion.div {...fadeInUp} transition={{ delay: i * .06 }} key={item.title} className="group rounded-[2rem] border border-slate-100 bg-slate-50/70 p-8 shadow-sm transition-all hover:-translate-y-1 hover:bg-white hover:shadow-xl"><div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:scale-105"><item.icon /></div><h3 className="text-xl font-bold leading-snug">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.desc}</p></motion.div>)}</div></div>
        </section>

        {/* Video */}
        <section className="bg-slate-950 py-16 text-white lg:py-24"><div className="container mx-auto px-4 lg:px-8"><div className="grid items-center gap-10 lg:grid-cols-2"><motion.div {...fadeInUp}><Badge className="mb-5 border-white/15 bg-white/10 text-white">Conheça a Navega Onco</Badge><h2 className="text-4xl font-bold md:text-5xl">Uma apresentação para entender como cuidamos</h2><p className="mt-6 text-lg leading-relaxed text-white/70">Este espaço está preparado para o vídeo institucional da Navega Onco, com apresentação da equipe, propósito e forma de atuação.</p><Button size="lg" className="mt-8 rounded-full bg-white px-8 font-bold text-primary" onClick={() => scrollTo("contato")}><Play className="mr-2 h-5 w-5" /> Quero conhecer</Button></motion.div><motion.div {...fadeInUp} className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl"><img src={heroNewAsset.url} alt="Apresentação Navega Onco" className="aspect-video w-full object-cover opacity-70" /><div className="absolute inset-0 flex items-center justify-center bg-slate-950/20"><button onClick={() => scrollTo("contato")} className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-2xl transition-transform hover:scale-110" aria-label="Conhecer a Navega Onco"><Play className="ml-1 h-8 w-8 fill-current" /></button></div><div className="absolute bottom-5 left-5 right-5 rounded-xl bg-black/50 p-4 backdrop-blur"><p className="font-semibold">Vídeo institucional Navega Onco</p><p className="text-xs text-white/70">Apresentação • Propósito • Cuidado</p></div></motion.div></div></div></section>

        {/* Services */}
        <section id="servicos" className="bg-primary py-16 text-white lg:py-24"><div className="container mx-auto px-4 lg:px-8"><motion.div {...fadeInUp} className="mx-auto max-w-4xl text-center"><h2 className="text-4xl font-bold md:text-5xl">Mais do que uma consulta, caminhamos ao seu lado.</h2><p className="mt-6 text-xl text-white/80">Um cuidado contínuo que combina enfermagem especializada, educação e tecnologia.</p></motion.div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service, i) => <motion.div {...fadeInUp} transition={{ delay: i * .06 }} key={service.title} className="rounded-3xl bg-white/10 p-7 backdrop-blur-sm transition-colors hover:bg-white/15"><div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15"><service.icon /></div><h3 className="text-xl font-bold">{service.title}</h3><p className="mt-3 text-sm leading-relaxed text-white/75">{service.desc}</p>{service.title === "Gestão de Sintomas" && <p className="mt-4 text-sm font-semibold text-white">Personalizamos o seu tratamento • Notificações e lembretes via e-mail e WhatsApp</p>}{service.title === "Suporte Familiar & Pós-Alta" && <p className="mt-4 text-sm font-semibold text-white">Orientação familiar mesmo após alta • Damos suporte</p>}</motion.div>)}</div></div></section>

        {/* How it works */}
        <section id="como-funciona" className="py-16 lg:py-24"><div className="container mx-auto px-4 lg:px-8"><motion.div {...fadeInUp} className="mb-14 text-center"><Badge className="mb-4 bg-primary/10 text-primary">Jornada de cuidado</Badge><h2 className="text-4xl font-bold md:text-5xl">Como funciona</h2><p className="mt-5 text-lg text-muted-foreground">Uma sequência clara, individualizada e próxima.</p></motion.div><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">{[{n:"01",t:"Avaliação inicial",d:"Consulta com profissionais especializados para entender necessidades e contexto."},{n:"02",t:"Plano individualizado",d:"Plano construído de acordo com cada diagnóstico e jornada do paciente."},{n:"03",t:"Acompanhamento",d:"Acompanhamento à distância contínuo, respeitando a evolução de cada pessoa."},{n:"04",t:"Orientação",d:"Orientação familiar e suporte para tornar o cuidado mais seguro."}].map((step,i)=><motion.div {...fadeInUp} transition={{delay:i*.08}} key={step.n} className="relative rounded-3xl border bg-white p-7 shadow-lg"><span className="text-sm font-extrabold text-primary">{step.n}</span><div className="my-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">{i===0?<Search/>:i===1?<ClipboardList/>:i===2?<Activity/>:<Heart/>}</div><h3 className="text-xl font-bold">{step.t}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{step.d}</p></motion.div>)}</div></div></section>

        {/* Business premium */}
        <section id="publicos" className="bg-slate-50 py-16 lg:py-24"><div className="container mx-auto px-4 lg:px-8"><motion.div {...fadeInUp} className="mx-auto max-w-3xl text-center"><Badge className="mb-4 bg-primary/10 text-primary">Soluções por público</Badge><h2 className="text-4xl font-bold md:text-5xl">Serviço Premium Navega Onco para empresas</h2><p className="mt-5 text-lg text-muted-foreground">Diferenciamos o público para que cada parceiro encontre uma solução adequada à sua realidade.</p></motion.div><div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{audiences.map((item,i)=><motion.div {...fadeInUp} transition={{delay:i*.05}} key={item.title} className="rounded-3xl bg-white p-7 shadow-md ring-1 ring-slate-100"><div className="flex items-start justify-between"><div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><item.icon/></div><Badge variant="outline">Navega Onco</Badge></div><h3 className="mt-6 text-xl font-bold">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.desc}</p></motion.div>)}</div><div className="mt-10 rounded-[2rem] bg-slate-950 p-8 text-white shadow-2xl lg:p-10"><div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><Badge className="mb-4 bg-primary/20 text-primary">Para empresas e instituições</Badge><h3 className="text-3xl font-bold">Vamos entender o seu cenário?</h3><p className="mt-3 max-w-2xl text-white/70">Informe número de pacientes, diagnóstico, localização e telefone de contato. Nossa equipe poderá compreender melhor a demanda.</p></div><Button size="lg" className="rounded-full bg-white px-8 font-bold text-primary" onClick={() => openForm("company")}>Falar com a equipe <ArrowRight className="ml-2"/></Button></div></div></div></section>

        {/* Accessibility / support */}
        <section className="py-14"><div className="container mx-auto px-4 lg:px-8"><div className="rounded-[2rem] border border-primary/10 bg-primary/5 p-8 lg:p-10"><div className="grid gap-8 lg:grid-cols-3"><div><Accessibility className="h-8 w-8 text-primary"/><h3 className="mt-4 text-2xl font-bold">Acessibilidade faz parte do cuidado</h3><p className="mt-3 text-muted-foreground">Recursos de texto ampliado, contraste e orientação para diferentes necessidades de acesso ao conteúdo.</p></div><div className="rounded-2xl bg-white p-6"><Eye className="text-primary"/><h4 className="mt-3 font-bold">Para deficiência visual</h4><p className="mt-2 text-sm text-muted-foreground">Hierarquia visual, foco de teclado, textos alternativos e opção de ampliar o conteúdo.</p></div><div className="rounded-2xl bg-white p-6"><Volume2 className="text-primary"/><h4 className="mt-3 font-bold">Para deficiência auditiva</h4><p className="mt-2 text-sm text-muted-foreground">Conteúdos preparados para receber legendas e recursos de acessibilidade em materiais audiovisuais.</p></div></div></div></div></section>

        {/* FAQ */}
        <section className="bg-slate-50 py-16 lg:py-24"><div className="container mx-auto max-w-4xl px-4 lg:px-8"><motion.div {...fadeInUp} className="mb-10 text-center"><Badge className="mb-4 bg-primary/10 text-primary">Dúvidas frequentes</Badge><h2 className="text-4xl font-bold">Perguntas frequentes</h2></motion.div><Accordion type="single" collapsible className="space-y-3">{faq.map(([q,a],i)=><AccordionItem key={i} value={`faq-${i}`} className="rounded-2xl border bg-white px-6 shadow-sm"><AccordionTrigger className="text-left font-bold">{q}</AccordionTrigger><AccordionContent className="leading-relaxed text-muted-foreground">{a}</AccordionContent></AccordionItem>)}</Accordion></div></section>

        {/* Contact */}
        <section id="contato" className="relative overflow-hidden bg-primary py-16 text-white lg:py-24"><div className="container mx-auto px-4 lg:px-8"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><motion.div {...fadeInUp}><Badge className="mb-5 bg-white/10 text-white">Entre em contato conosco</Badge><h2 className="text-4xl font-bold md:text-5xl">Estamos aqui para caminhar com você.</h2><p className="mt-6 text-lg leading-relaxed text-white/80">Fale com a equipe Navega Onco pelo WhatsApp ou telefone de suporte da empresa.</p><div className="mt-8 space-y-4"><a href={`tel:${SUPPORT_PHONE.replace(/\D/g, "")}`} className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 hover:bg-white/15"><Phone/><span><small className="block text-white/60">Telefone de suporte</small><strong>{SUPPORT_PHONE}</strong></span></a><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 hover:bg-white/15"><MessageSquare/><span><small className="block text-white/60">WhatsApp</small><strong>Falar com nossa equipe</strong></span></a></div></motion.div><motion.div {...fadeInUp} className="rounded-[2rem] bg-white p-8 text-slate-900 shadow-2xl lg:p-10"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"><LifeBuoy/></div><h3 className="mt-6 text-2xl font-bold">Precisa de ajuda para escolher?</h3><p className="mt-3 text-muted-foreground">Conte se você é paciente/familiar ou empresa e nossa equipe orientará o melhor caminho.</p><div className="mt-7 grid gap-3 sm:grid-cols-2"><Button className="h-12 rounded-xl" onClick={() => openForm("patient")}>Paciente / Família</Button><Button variant="outline" className="h-12 rounded-xl" onClick={() => openForm("company")}>Empresa</Button></div><p className="mt-5 text-xs leading-relaxed text-muted-foreground">Este site apresenta serviços educacionais e de enfermagem. As informações não substituem avaliação médica ou acompanhamento profissional individualizado.</p></motion.div></div></div></section>
      </main>

      <footer className="border-t bg-white py-10"><div className="container mx-auto flex flex-col gap-7 px-4 lg:px-8"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-center"><button onClick={() => window.scrollTo({top:0,behavior:"smooth"})} className="flex items-center gap-3"><img src={logoAsset.url} alt="Navega Onco" className="h-10 w-auto"/><span className="font-bold text-primary">Navega Onco</span></button><div className="flex flex-wrap gap-5 text-sm text-muted-foreground"><button onClick={() => scrollTo("sobre")} className="hover:text-primary">Quem Somos</button><button onClick={() => scrollTo("servicos")} className="hover:text-primary">Serviços</button><button onClick={() => scrollTo("publicos")} className="hover:text-primary">Públicos</button><button onClick={() => scrollTo("contato")} className="hover:text-primary">Contato</button></div></div><div className="flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} Navega Onco. Todos os direitos reservados.</p><p className="flex items-center gap-2"><MapPin className="h-4 w-4"/> Atendimento digital e humanizado</p></div></div></footer>

      <motion.a initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} whileHover={{ scale: 1.08 }} href={WHATSAPP_LINK} target="_blank" rel="noreferrer" className="fixed bottom-7 right-7 z-[80] flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-green-500 text-white shadow-2xl shadow-green-500/30" aria-label="Falar pelo WhatsApp"><img src={whatsappLogoAsset.url} alt="WhatsApp" className="h-full w-full object-cover"/></motion.a>

      {/* Profile forms */}
      <AnimatePresence>
        {audience && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm" onMouseDown={() => setAudience(null)}>
          <motion.div initial={{ opacity: 0, y: 25, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 25, scale: .97 }} onMouseDown={e => e.stopPropagation()} className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-[2rem] bg-white p-7 shadow-2xl lg:p-10">
            <div className="flex items-start justify-between gap-4"><div><Badge className="mb-3 bg-primary/10 text-primary">{audience === "patient" ? "Paciente e Família" : "Empresa"}</Badge><h2 className="text-3xl font-bold">{audience === "patient" ? "Conte um pouco sobre sua jornada" : "Fale sobre sua empresa"}</h2><p className="mt-2 text-sm text-muted-foreground">Preencha os campos abaixo. Nossa equipe usará essas informações para entender sua necessidade.</p></div><button onClick={() => setAudience(null)} className="rounded-xl p-2 hover:bg-slate-100" aria-label="Fechar formulário"><X/></button></div>
            {submitted ? <div className="py-14 text-center"><div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600"><CheckCircle2 className="h-9 w-9"/></div><h3 className="mt-5 text-2xl font-bold">Formulário recebido</h3><p className="mx-auto mt-3 max-w-md text-muted-foreground">Obrigado. Suas informações foram registradas nesta sessão. Para falar imediatamente com a equipe, use o WhatsApp.</p><div className="mt-7 flex justify-center gap-3"><Button variant="outline" onClick={() => setAudience(null)}>Fechar</Button><Button onClick={() => window.open(WHATSAPP_LINK, "_blank")}>Abrir WhatsApp</Button></div></div> : <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="mt-8 space-y-5">{audience === "patient" ? <><label className="block"><span className="mb-2 block text-sm font-semibold">Nome</span><input required name="nome" className="h-12 w-full rounded-xl border bg-white px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Seu nome"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Telefone</span><input required name="telefone" type="tel" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="(00) 00000-0000"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Diagnóstico</span><input required name="diagnostico" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Informe o diagnóstico"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Tempo do diagnóstico</span><input required name="tempo" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Ex.: 3 meses"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Suporte familiar</span><select required name="suporte" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary"><option value="">Selecione</option><option>Tenho suporte familiar</option><option>Tenho pouco suporte familiar</option><option>Não tenho suporte familiar</option></select></label></> : <><label className="block"><span className="mb-2 block text-sm font-semibold">Número de pacientes</span><input required name="pacientes" type="number" min="0" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Ex.: 500"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Diagnóstico / perfil atendido</span><input required name="diagnostico" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Informe o perfil ou diagnóstico principal"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Localização da empresa</span><input required name="localizacao" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="Cidade / Estado"/></label><label className="block"><span className="mb-2 block text-sm font-semibold">Telefone de contato</span><input required name="telefone" type="tel" className="h-12 w-full rounded-xl border px-4 outline-none focus:ring-2 focus:ring-primary" placeholder="(00) 00000-0000"/></label></>}<div className="rounded-xl bg-slate-50 p-4 text-xs leading-relaxed text-muted-foreground">Ao enviar, você concorda em fornecer essas informações para que a equipe possa entrar em contato. Não envie informações clínicas além do necessário neste formulário.</div><Button type="submit" size="lg" className="h-13 w-full rounded-xl text-base font-bold">Enviar informações <ArrowRight className="ml-2 h-5 w-5"/></Button></form>}
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

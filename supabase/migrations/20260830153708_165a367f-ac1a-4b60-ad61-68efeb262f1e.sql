CREATE TABLE public.form_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  type TEXT NOT NULL CHECK (type IN ('patient','company')),
  nome TEXT,
  telefone TEXT,
  diagnostico TEXT,
  tempo TEXT,
  suporte TEXT,
  pacientes TEXT,
  localizacao TEXT,
  data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.form_submissions TO anon;
GRANT INSERT ON public.form_submissions TO authenticated;
GRANT ALL ON public.form_submissions TO service_role;

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a form" ON public.form_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX form_submissions_created_at_idx ON public.form_submissions (created_at DESC);
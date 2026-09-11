"use client";

import { Mail, Linkedin, Phone, MessageCircle } from 'lucide-react';
import { PersonalInfo } from '@/data/portfolio';
import { AnimatedSection } from '@/components/ui/AnimatedSection';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ContactForm } from '@/components/ui/ContactForm';

interface ContactProps {
  data: PersonalInfo;
}

export function Contact({ data }: ContactProps) {
  return (
    <section id="contact" className="py-24 bg-[#111118]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading
            title="Get In Touch"
            subtitle="Have a project or opportunity in mind? Let's talk."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left — Contact Form */}
          <AnimatedSection delay={0.1}>
            <div className="p-6 rounded-xl border border-[#1e1e2e] bg-[#1a1a24]">
              <h3 className="text-lg font-semibold text-slate-100 mb-6">Send a Message</h3>
              <ContactForm />
            </div>
          </AnimatedSection>

          {/* Right — Contact Info */}
          <AnimatedSection delay={0.2}>
            <div className="flex flex-col gap-6">
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Contact Information</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Feel free to reach out through any of the channels below. I&apos;ll get back to you as soon as possible.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href={`mailto:${data.contact.email}`}
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#1a1a24] hover:border-indigo-500/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 transition-colors">
                      {data.contact.email}
                    </p>
                  </div>
                </a>

                {/* LinkedIn */}
                <a
                  href={data.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#1a1a24] hover:border-indigo-500/30 transition-colors duration-200 group"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/20 transition-colors">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">LinkedIn</p>
                    <p className="text-sm font-medium text-slate-300 group-hover:text-indigo-400 transition-colors break-all">
                      {data.contact.linkedin}
                    </p>
                  </div>
                </a>

                {/* Phone (conditional) */}
                {data.contact.phone && (
                  <div className="flex items-center gap-4 p-4 rounded-xl border border-[#1e1e2e] bg-[#1a1a24]">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-500 uppercase tracking-wider mb-0.5">Phone</p>
                      <p className="text-sm font-medium text-slate-300">{data.contact.phone}</p>
                    </div>
                  </div>
                )}

                {/* Open to opportunities */}
                <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20">
                  <MessageCircle size={18} className="text-indigo-400 shrink-0" />
                  <p className="text-sm text-slate-400">
                    Open to full-time opportunities, freelance projects, and collaborations.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

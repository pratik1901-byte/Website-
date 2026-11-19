import { Mail, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { site } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { RequestSecurityButton } from "@/components/ui/RequestSecurityButton";

export default function CallToAction({
  title = "Tell us what you need protected.",
  body = "Send the site, the hours and the concern. We will come back with a survey slot and a written deployment plan — not a quote pulled out of the air.",
  eyebrow = "Get in touch",
  showContacts = true,
}: {
  title?: string;
  body?: string;
  eyebrow?: string;
  /** The three-column call / WhatsApp / email strip below the buttons. */
  showContacts?: boolean;
}) {
  return (
    <section
      aria-label="Contact BSM"
      className="relative overflow-hidden border-t border-line bg-void py-28 md:py-36 lg:py-44"
    >
      {/* Section divider: a brass hairline that fades across the top edge, so
          one section visibly ends before the next begins. */}
      <span
        className="section-divider pointer-events-none absolute inset-x-0 top-0"
        aria-hidden="true"
      />
      <span className="grain-layer" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_100%,rgba(200,164,92,0.10)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <div className="shell relative">
        <div className="flex items-center gap-4" data-reveal="up">
          <span className="h-1.5 w-1.5 bg-brass" />
          <span className="eyebrow">{eyebrow}</span>
        </div>

        <h2 data-split className="mt-10 max-w-4xl text-hero font-semibold text-bone">
          {title}
        </h2>

        <p data-reveal="up" className="mt-8 max-w-xl text-lead text-mist">
          {body}
        </p>

        <div className="mt-12 flex flex-wrap gap-4" data-reveal="up" data-delay="0.1">
          <RequestSecurityButton />
          <Button href={site.contact.whatsappHref} variant="outline">
            WhatsApp
          </Button>
        </div>

        {showContacts && (
          <div className="mt-20 grid gap-px border border-line bg-line md:grid-cols-3" data-stagger>
            <div data-stagger-item className="group relative bg-void p-8">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <Phone className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">Call</p>
              <ul className="mt-3 space-y-2">
                {site.contact.phones.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                    >
                      {line.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div data-stagger-item className="group relative bg-void p-8">
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <WhatsAppIcon className="h-5 w-5 text-brass" />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                WhatsApp
              </p>
              <ul className="mt-3 space-y-2">
                {site.contact.whatsapps.map((line) => (
                  <li key={line.href}>
                    <a
                      href={line.href}
                      target="_blank"
                      rel="noreferrer"
                      className="link-wipe font-display text-lg font-semibold tracking-[-0.01em] text-bone transition-colors duration-300 hover:text-brass"
                    >
                      {line.display}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href={site.contact.emailHref}
              data-stagger-item
              className="group relative bg-void p-8 transition-colors duration-500 hover:bg-raise"
            >
              <span className="ticks pointer-events-none absolute inset-0" aria-hidden="true" />
              <Mail className="h-5 w-5 text-brass" strokeWidth={1.25} />
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-dim">
                Email
              </p>
              <p className="mt-3 font-display text-lg font-semibold tracking-[-0.01em] text-bone">
                {site.contact.email}
              </p>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

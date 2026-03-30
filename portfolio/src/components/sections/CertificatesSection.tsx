import { Award, ExternalLink, Calendar } from "lucide-react";
import type { Certificate } from "@/lib/supabase/types";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

export function CertificatesSection({ certificates }: CertificatesSectionProps) {
  if (certificates.length === 0) return null;

  return (
    <section id="certificates" className="py-24 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-primary-400">
            Credentials
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Certificates & <span className="gradient-text">Awards</span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <div key={cert.id} className="glass group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-yellow-500/30">
              <div className="mb-4 flex items-start justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                  <Award className="h-5 w-5 text-yellow-400" />
                </div>
                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-primary-400 transition-colors"
                    aria-label="View credential"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>

              <h3 className="mb-1 font-semibold text-white group-hover:text-yellow-300 transition-colors">
                {cert.title}
              </h3>
              <p className="mb-3 text-sm text-primary-400">{cert.issuer}</p>

              {cert.description && (
                <p className="mb-3 text-xs leading-relaxed text-gray-400">{cert.description}</p>
              )}

              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>
                  Issued {new Date(cert.issue_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                  {cert.expiry_date && ` · Expires ${new Date(cert.expiry_date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

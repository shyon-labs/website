import { useEffect } from 'react'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as any

const sections = [
  {
    title: 'Information we collect',
    content: (
      <p>
        ShyonLabs apps are designed to collect only the information needed to provide and improve their
        features. Depending on the app, this may include information you provide directly, such as an
        email address, and technical information such as device type, operating system, app version,
        and anonymous diagnostics. We do not collect sensitive personal information unless an app
        clearly explains why it is needed and obtains the appropriate permission.
      </p>
    ),
  },
  {
    title: 'How we use information',
    content: (
      <p>
        We use information to operate, maintain, secure, and improve our apps and website; respond to
        support requests; diagnose technical issues; and comply with applicable legal obligations. We
        do not use personal information for unrelated purposes without providing appropriate notice.
      </p>
    ),
  },
  {
    title: 'Sharing and selling data',
    content: (
      <p>
        ShyonLabs does not sell, rent, or trade personal information. We do not share personal
        information with third parties for their own advertising or marketing. Information may be
        disclosed to service providers that help us operate an app or website, only as needed for
        those services and subject to appropriate confidentiality and security obligations, or when
        required by law.
      </p>
    ),
  },
  {
    title: 'Data retention and security',
    content: (
      <p>
        We retain information only for as long as it is reasonably needed for the purposes described
        in this policy or to meet legal requirements. We use reasonable administrative and technical
        safeguards to protect information, but no internet transmission or storage system can be
        guaranteed to be completely secure.
      </p>
    ),
  },
  {
    title: 'Children’s privacy',
    content: (
      <p>
        Our apps and website are not directed to children under 13. We do not knowingly collect
        personal information from children under 13. If you believe a child has provided personal
        information to us, please contact us so we can take appropriate action.
      </p>
    ),
  },
  {
    title: 'Your choices and requests',
    content: (
      <p>
        You may contact us to ask about personal information associated with your use of a ShyonLabs
        app, request correction or deletion where applicable, or ask questions about this policy.
        Some information may need to be retained when required by law or for legitimate security
        purposes.
      </p>
    ),
  },
]

export default function PrivacyPolicyPage() {
  useEffect(() => {
    const previousTitle = document.title
    document.title = 'Privacy Policy — ShyonLabs'
    return () => {
      document.title = previousTitle
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease }}
      className="pt-16 md:pt-20"
    >
      <main className="section-pad" aria-labelledby="privacy-policy-title">
        <div className="container-xl max-w-4xl">
          <div className="mb-12 md:mb-16">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-10 bg-accent" />
              <span className="label-sm">Legal</span>
            </div>
            <h1 id="privacy-policy-title" className="text-section font-bold tracking-tight mb-5">
              Privacy Policy
            </h1>
            <p className="text-text-muted text-base leading-relaxed max-w-2xl">
              ShyonLabs respects your privacy and is committed to handling information responsibly
              across our apps and website.
            </p>
            <p className="text-text-dim text-xs mt-5">Last updated: October 28, 2026</p>
          </div>

          <div className="space-y-8 md:space-y-10">
            {sections.map((section, index) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, delay: index * 0.04, ease }}
                className="border-t border-border pt-6 md:pt-7"
              >
                <h2 className="text-lg font-semibold text-text-primary mb-3">{section.title}</h2>
                <div className="text-text-muted text-sm leading-7">{section.content}</div>
              </motion.section>
            ))}
          </div>

          <section className="border-t border-border pt-6 md:pt-7 mt-8 md:mt-10">
            <h2 className="text-lg font-semibold text-text-primary mb-3">Contact us</h2>
            <p className="text-text-muted text-sm leading-7">
              For privacy questions or requests, email{' '}
              <a className="text-accent hover:underline" href="mailto:shyonlabs@gmail.com">
                shyonlabs@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </main>
    </motion.div>
  )
}

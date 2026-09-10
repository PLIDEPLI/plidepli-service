import { useState, type FormEvent } from 'react'

type FormStatus = 'idle' | 'submitting' | 'done' | 'error'

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID as string | undefined
const BASE = import.meta.env.BASE_URL

function WifiMark() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M6 16.5a14 14 0 0 1 20 0"
        stroke="#38BDF8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M10 20.5a8 8 0 0 1 12 0"
        stroke="#38BDF8"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="16" cy="24.5" r="2.2" fill="#38BDF8" />
    </svg>
  )
}

function Wordmark() {
  return (
    <span className="wordmark">
      <span className="wordmark__mark">
        <WifiMark />
      </span>
      PLIDEPLI
    </span>
  )
}

const PLANS = [
  {
    id: 'essential',
    name: 'Essential',
    data: '50 GB',
    price: '$39/mo',
    speed: 'Up to 100 Mbps',
    desc: 'For email, browsing, and the occasional show.',
    featured: false,
  },
  {
    id: 'plus',
    name: 'Plus',
    data: '200 GB',
    price: '$69/mo',
    speed: 'Up to 150 Mbps',
    desc: 'For working from home and regular streaming.',
    featured: true,
  },
  {
    id: 'unlimited',
    name: 'Unlimited',
    data: 'Unlimited',
    price: '$99/mo',
    speed: 'Up to 200 Mbps',
    desc: 'For everything, all month, with no overage.',
    featured: false,
  },
]

function SignupForm() {
  const [status, setStatus] = useState<FormStatus>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!FORMSPREE_ID) {
      setStatus('error')
      return
    }
    const data = new FormData(e.currentTarget)
    setStatus('submitting')
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      })
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="form form__done">
        Thanks — we got your details. We'll check coverage at your address and
        get back to you within one business day.
      </div>
    )
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form__row">
        <div className="form__field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required placeholder="Your name" />
        </div>
        <div className="form__field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required placeholder="you@example.com" />
        </div>
      </div>
      <div className="form__row">
        <div className="form__field">
          <label htmlFor="plan">Plan</label>
          <select id="plan" name="plan" defaultValue="plus">
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.data} / {p.price}
              </option>
            ))}
          </select>
        </div>
        <div className="form__field">
          <label htmlFor="address">Service address</label>
          <input id="address" name="address" type="text" placeholder="City, State, ZIP" />
        </div>
      </div>
      <div className="form__field">
        <label htmlFor="message">Message (optional)</label>
        <textarea id="message" name="message" placeholder="Anything we should know?" />
      </div>
      <button type="submit" className="btn btn--primary" disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending…' : 'Get connected'}
      </button>
      {status === 'error' && (
        <p className="form__error">
          {FORMSPREE_ID
            ? 'Something went wrong. Please email us directly at lightfolding1@gmail.com.'
            : 'Signup is not wired up yet.'}
        </p>
      )}
    </form>
  )
}

function App() {
  return (
    <>
      <header className="header">
        <div className="container header__inner">
          <a href="#top" aria-label="PLIDEPLI home">
            <Wordmark />
          </a>
          <nav className="nav" aria-label="Primary">
            <a href="#service">Internet</a>
            <a href="#plans">Plans</a>
            <a href="#coverage">Coverage</a>
            <a href="#contact">Contact</a>
            <a href="#contact" className="btn btn--primary">
              Get connected
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <div className="container">
            <span className="hero__eyebrow">Wireless internet access · California</span>
            <h1 className="hero__title">
              Internet for everywhere <em>the cables skip.</em>
            </h1>
            <p className="hero__sub">
              PLIDEPLI provides high-speed wireless internet access to homes,
              RVs, and remote locations across California. One
              subscription. One antenna. Reliable Wi-Fi everywhere on your
              property.
            </p>
            <div className="hero__cta">
              <a href="#plans" className="btn btn--primary">
                View plans
              </a>
              <a href="#coverage" className="btn btn--ghost">
                Check coverage
              </a>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <div className="num">Statewide</div>
                <div className="lbl">across California</div>
              </div>
              <div className="hero__stat">
                <div className="num">200 Mbps</div>
                <div className="lbl">download speeds</div>
              </div>
              <div className="hero__stat">
                <div className="num">100%</div>
                <div className="lbl">wireless, no cables</div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- service ---------- */}
        <section className="section section--alt" id="service">
          <div className="container service">
            <div>
              <span className="section__label">The service</span>
              <h2 className="section__title">What PLIDEPLI actually is.</h2>
              <p className="section__lede">
                PLIDEPLI is a wireless internet access service. We deliver
                broadband over existing cellular networks to a fixed antenna at
                your home or site, then turn it into a private Wi-Fi network for
                your whole property. You subscribe to internet access — we
                handle the network, the hardware, and the support.
              </p>
              <div className="service__points">
                <div className="service__point">
                  <span className="dot" aria-hidden="true" />
                  <div>
                    <h3>Internet access, not a gadget</h3>
                    <p>
                      A managed service: network, hardware, and support included
                      in one subscription.
                    </p>
                  </div>
                </div>
                <div className="service__point">
                  <span className="dot" aria-hidden="true" />
                  <div>
                    <h3>Built for the gaps</h3>
                    <p>
                      Rural homes, RVs, and remote sites where cable and fiber
                      never reached.
                    </p>
                  </div>
                </div>
                <div className="service__point">
                  <span className="dot" aria-hidden="true" />
                  <div>
                    <h3>One connection, everywhere</h3>
                    <p>
                      A private Wi-Fi network for every device on your property.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="service__card">
              <img
                className="service__img"
                src={`${BASE}hardware.jpg`}
                alt="PLIDEPLI fixed wireless antenna"
                loading="lazy"
              />
              <h3>How it's delivered</h3>
              <p>
                A compact fixed-wireless antenna is installed at your location
                and connects to nearby cellular towers. We manage the connection
                over the air and deliver it to you as a private, secure Wi-Fi
                network — no buried cable, no technician visit, no construction.
              </p>
              <p className="note">
                Fixed wireless · cellular backhaul · managed by PLIDEPLI
              </p>
            </div>
          </div>
        </section>

        {/* ---------- how it works ---------- */}
        <section className="section">
          <div className="container">
            <span className="section__label">Getting connected</span>
            <h2 className="section__title">Three steps to online.</h2>
            <div className="steps">
              <div className="step">
                <span className="step__num">01</span>
                <h3>Order online</h3>
                <p>
                  Pick a plan and tell us your address. We ship a PLIDEPLI
                  antenna to your door.
                </p>
              </div>
              <div className="step">
                <span className="step__num">02</span>
                <h3>We activate remotely</h3>
                <p>
                  Install the antenna in minutes — no technician required. We
                  provision your service over the air.
                </p>
              </div>
              <div className="step">
                <span className="step__num">03</span>
                <h3>Connect everything</h3>
                <p>
                  Your private Wi-Fi is live. Phones, laptops, TVs, smart
                  devices — all online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- coverage ---------- */}
        <section className="section section--alt" id="coverage">
          <div className="container coverage">
            <div>
              <span className="section__label">Coverage</span>
              <h2 className="section__title">Statewide, rural first.</h2>
              <p className="section__lede">
                A PLIDEPLI connection works wherever there's a cellular signal
                to work with — which is why we reach the places cable and fiber
                don't.
              </p>
              <div className="coverage__list">
                <div className="coverage__item">
                  <strong>Statewide</strong> — all of California
                </div>
                <div className="coverage__item">
                  <strong>Rural &amp; remote</strong> — underserved areas
                </div>
                <div className="coverage__item">
                  <strong>Homes</strong> — single-family and off-grid
                </div>
                <div className="coverage__item">
                  <strong>RVs &amp; campsites</strong> — fixed and seasonal sites
                </div>
              </div>
              <p className="coverage__soon">
                More regions coming soon — join the waitlist above to be first
                when we expand.
              </p>
            </div>
            <div className="coverage__map" aria-label="Coverage area illustration">
              <span className="pin" style={{ left: '28%', top: '38%' }} />
              <span className="pin" style={{ left: '48%', top: '55%' }} />
              <span className="pin" style={{ left: '66%', top: '32%' }} />
              <span className="pin" style={{ left: '72%', top: '62%' }} />
              <span className="pin" style={{ left: '40%', top: '70%' }} />
              <span className="label">Coverage across the state of California</span>
            </div>
          </div>
        </section>

        {/* ---------- plans ---------- */}
        <section className="section" id="plans">
          <div className="container">
            <span className="section__label">Plans &amp; pricing</span>
            <h2 className="section__title">Pick your data.</h2>
            <p className="section__lede">
              Simple monthly data plans. No contracts, no overage fees, cancel
              anytime.
            </p>
            <div className="plans">
              {PLANS.map((plan) => (
                <div
                  key={plan.id}
                  className={`plan ${plan.featured ? 'plan--featured' : ''}`}
                >
                  <span className="plan__name">{plan.name}</span>
                  <div className="plan__data">
                    {plan.data}
                    {plan.id !== 'unlimited' && <span> /month</span>}
                  </div>
                  <div className="plan__price">{plan.price}</div>
                  <div className="plan__speed">{plan.speed}</div>
                  <p className="plan__desc">{plan.desc}</p>
                  <a href="#contact" className="btn btn--primary">
                    Get {plan.name}
                  </a>
                </div>
              ))}
            </div>
            <p className="plans__note">
              Equipment included · No contract · Cancel anytime · Taxes may apply
            </p>
          </div>
        </section>

        {/* ---------- contact / signup ---------- */}
        <section className="section section--alt" id="contact">
          <div className="container signup">
            <div>
              <span className="section__label">Get connected</span>
              <h2 className="section__title">Tell us where you are.</h2>
              <p className="section__lede">
                Share your address and the plan you're after. We'll confirm
                coverage and get your service set up.
              </p>
              <div className="signup__contact">
                <div>
                  <span className="lbl">Email</span>
                  <br />
                  <a href="mailto:lightfolding1@gmail.com">lightfolding1@gmail.com</a>
                </div>
                <div>
                  <span className="lbl">Hours</span>
                  <br />
                  Mon–Fri, 9am–6pm ET
                </div>
              </div>
            </div>
            <SignupForm />
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__grid">
          <div className="footer__brand">
            <Wordmark />
            <p>
              PLIDEPLI provides wireless internet access services to homes, RVs,
              and remote locations across California.
            </p>
          </div>
          <div className="footer__meta">
            <div>
              <a href="mailto:lightfolding1@gmail.com">lightfolding1@gmail.com</a>
            </div>
            <div>Wireless internet access · California</div>
            <div>&copy; {new Date().getFullYear()} PLIDEPLI</div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App

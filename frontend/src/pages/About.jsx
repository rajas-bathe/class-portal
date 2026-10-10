import React from 'react';

const creator = {
  name: 'Rajas Bathe',
  github: 'https://github.com/rajas-bathe',
  linkedin: 'https://www.linkedin.com/in/rajasbathe/',
  email: 'rajasbathe911@gmail.com',
};

const contributors = [
  {
    name: 'Arman Bilakhiya',
    initials: 'AB',
    branch: 'Computer Engineering',
    role: 'UX & Testing',
    linkedin: 'https://www.linkedin.com/in/arman-bilakhiya-a77020383/',
  },
  {
    name: 'Mohit Wagh',
    initials: 'MW',
    branch: 'Cyber Security',
    role: 'UX & Testing',
    linkedin: 'https://www.linkedin.com/in/mohit-wagh-6b1909245/',
  },
];

const features = [
  { icon: '📅', title: 'Schedules', text: 'Lectures, labs & exams' },
  { icon: '📁', title: 'Resources', text: 'Notes, manuals & papers' },
  { icon: '📢', title: 'Updates', text: 'Announcements & notices' },
  { icon: '📸', title: 'Memories', text: 'Class photos & events' },
];

const techGroups = [
  {
    label: 'Frontend & Core',
    items: ['React 19', 'Vite', 'React Router v7'],
  },
  {
    label: 'Styling & UI',
    items: ['Tailwind CSS v4', 'Lucide React'],
  },
  {
    label: 'APIs & Services',
    items: [
      'Airtable API',
      'Google Drive API',
      'Imgur API',
      'JSONBin',
      'Vercel Analytics',
    ],
  },
  {
    label: 'Deployment & Hosting',
    items: ['Vercel'],
  },
];

const card = 'bg-white border-2 border-gray-800 rounded-xl';

const button =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-800 focus-visible:ring-offset-2';

function ExternalLink({ href, children, dark = false }) {
  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${button} ${
        dark
          ? 'bg-gray-800 text-white hover:bg-gray-900'
          : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
      }`}
    >
      {children}
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeading({ id, icon, children }) {
  return (
    <h2
      id={id}
      className="flex items-center gap-2 border-b-2 border-gray-800 pb-2 text-lg md:text-xl font-bold text-gray-900"
    >
      <span aria-hidden="true">{icon}</span>
      {children}
    </h2>
  );
}

function About() {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-7 text-gray-900">
      <header>
        <h1 className="flex items-center gap-3 text-2xl md:text-3xl font-bold tracking-tight">
          <span aria-hidden="true">⚙️</span>
          About
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          The portal, the people, and what powers it.
        </p>
      </header>

      <section
        aria-label="About ClassPost"
        className="grid grid-cols-1 lg:grid-cols-3 gap-4"
      >
        <div className={`${card} lg:col-span-2 p-6 md:p-7`}>
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-50 p-3">
              <img
                src="/classpost-logo.svg"
                alt="ClassPost logo"
                className="h-full w-full object-contain"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Class Post
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Your class, in one place.
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-gray-600">
            Timetables, study materials, announcements, and class memories.
            Everything you keep coming back for, brought together.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              🎓 Student-built
            </span>
            <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
              🤝 Made for classmates
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-xl border-2 border-gray-800 bg-gray-800 p-6 text-white">
          <span aria-hidden="true" className="text-3xl">
            💡
          </span>
          <h2 className="mt-4 text-xl font-bold">Why ClassPost?</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-300">
            Because finding a timetable shouldn’t mean scrolling through
            hundreds of messages.
          </p>
          <p className="mt-4 text-sm font-medium">
            Less searching. More getting things done.
          </p>
        </div>
      </section>

      <section
        aria-label="What ClassPost brings together"
        className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4"
      >
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`${card} flex flex-col sm:flex-row sm:items-center gap-3 p-4`}
          >
            <span aria-hidden="true" className="text-3xl">
              {feature.icon}
            </span>
            <div>
              <h2 className="text-sm font-bold">{feature.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-gray-500">
                {feature.text}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section aria-labelledby="people-heading" className="space-y-4">
        <SectionHeading id="people-heading" icon="👥">
          Behind the Portal
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <article className={`${card} p-5 md:p-6`}>
            <div className="flex items-center gap-4">
              <div
                aria-hidden="true"
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-xl bg-gray-800 text-xl font-bold text-white"
              >
                RB
              </div>

              <div>
                <p className="text-xs font-medium text-gray-500">
                  Creator & Developer
                </p>
                <h3 className="mt-1 text-xl font-bold">{creator.name}</h3>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {[
                'SY B.Tech',
                'Computer Engineering',
                'Class Representative',
              ].map((label) => (
                <span
                  key={label}
                  className="rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-600"
                >
                  {label}
                </span>
              ))}
            </div>

            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              Built ClassPost to make everyday class information easier to
              find, organise, and share.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <ExternalLink href={creator.github} dark>
                GitHub
              </ExternalLink>
              <ExternalLink href={creator.linkedin}>
                LinkedIn
              </ExternalLink>
            </div>
          </article>

          <div className={`${card} overflow-hidden`}>
            <div className="border-b border-gray-200 bg-gray-50 px-5 py-3">
              <h3 className="text-sm font-bold">
                🙌 A little help goes a long way
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Thanks for testing things and helping them work better.
              </p>
            </div>

            <div className="divide-y divide-gray-200">
              {contributors.map((person) => (
                <article
                  key={person.name}
                  className="flex flex-wrap items-center gap-3 p-5"
                >
                  <div
                    aria-hidden="true"
                    className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-gray-100 text-sm font-bold text-gray-700"
                  >
                    {person.initials}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold">{person.name}</h4>
                    <p className="mt-1 text-xs text-gray-500">
                      {person.branch}
                    </p>
                    <p className="mt-1 text-xs font-medium text-gray-600">
                      {person.role}
                    </p>
                  </div>

                  <ExternalLink href={person.linkedin}>
                    LinkedIn
                  </ExternalLink>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <section
          aria-labelledby="stack-heading"
          className={`${card} lg:col-span-2 overflow-hidden`}
        >
          <div className="border-b-2 border-gray-800 bg-gray-50 px-5 py-3">
            <h2 id="stack-heading" className="font-bold">
              🛠️ Under the Hood
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-5">
            {techGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mb-2 text-xs font-semibold text-gray-500">
                  {group.label}
                </h3>

                <div className="flex flex-wrap gap-2">
                  {group.items.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs font-medium text-gray-700"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="contact-heading"
          className={`${card} flex flex-col items-start p-5`}
        >
          <h2 id="contact-heading" className="font-bold">
            💬 Get in Touch
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            Have a suggestion, spotted an incorrect detail, or want to help
            improve ClassPost? Reach out.
          </p>

          <div className="mt-4 w-full border-t border-gray-200 pt-4">
            <p className="text-xs font-medium text-gray-500">Email</p>
            <p className="mt-1 break-all text-sm font-medium text-gray-800">
              {creator.email}
            </p>
          </div>
        </section>
      </div>

      <aside className="rounded-xl border border-gray-300 bg-gray-100 p-4 md:p-5">
        <div className="flex items-start gap-3">
          <span aria-hidden="true" className="text-lg">
            ℹ️
          </span>
          <div>
            <h2 className="text-sm font-bold">
              An independent student project
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-gray-600">
              ClassPost is a student initiative, not an official college
              platform. It is not affiliated with, endorsed by, or authorised
              to represent any college, department, club, or organisation.
              Information is shared for convenience; please verify important
              notices, schedules, and academic decisions through official
              channels.
            </p>
          </div>
        </div>
      </aside>

      <footer className="flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-gray-300 pt-4 pb-2 text-xs text-gray-500">
        <span>© {new Date().getFullYear()} Class Post</span>
        <span>Built with care, for the class.</span>
      </footer>
    </div>
  );
}

export default About;
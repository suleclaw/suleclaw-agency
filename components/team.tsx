const teamMembers = [
  {
    icon: "👤",
    name: "Damilola",
    role: "Founder & Lead Engineer",
    description: "Edinburgh-based engineer. Builds in public, ships fast.",
  },
  {
    icon: "🦊",
    name: "Sule (Orchestrator)",
    role: "Coordinates the team",
    description: "Manages workflow, assigns tasks, keeps everything on track.",
  },
  {
    icon: "💻",
    name: "Frontend Dev",
    role: "UI & Component Specialist",
    description: "React, Next.js, animations. Makes interfaces feel alive.",
  },
  {
    icon: "⚙️",
    name: "Backend Dev",
    role: "API & Service Specialist",
    description: "Node, Python, Go, Rust. Whatever the job needs.",
  },
  {
    icon: "🔍",
    name: "QA Agent",
    role: "Browser Testing & Bug Reporting",
    description: "Catches what slips through. Writes it up clearly.",
  },
  {
    icon: "🏗️",
    name: "Architect",
    role: "System Design",
    description: "Thinks three steps ahead. Keeps systems coherent.",
  },
];

export function Team() {
  return (
    <section className="py-24 px-6 border-t border-[#27272A]" id="team">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-headline font-bold text-3xl sm:text-4xl md:text-5xl text-[#FAFAFA] leading-tight">
            The team behind SuleClaw
          </h2>
          <p className="mt-4 text-lg text-[#A1A1AA] max-w-lg mx-auto">
            Humans and agents, working together. No silos, no hierarchy.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-[#111113] border border-[#27272A] rounded-xl p-6 text-center card-hover group"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{member.icon}</div>

              {/* Name */}
              <h3 className="font-semibold text-base text-[#FAFAFA] mb-1">
                {member.name}
              </h3>

              {/* Role */}
              <p className="font-mono text-xs uppercase tracking-widest text-[#52525B] mb-3">
                {member.role}
              </p>

              {/* Description */}
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                {member.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

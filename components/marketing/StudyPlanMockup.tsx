const COMPETENCIES = [
  { label: "Medical Nutrition Therapy", value: 72 },
  { label: "Food Service Management", value: 58 },
  { label: "Community Nutrition", value: 84 },
];

const FORMATS = ["Text notes", "Video", "Audio", "Flashcards", "AI tutor"];

function PlanPanel() {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-heading text-sm font-bold text-charcoal">
        This week&rsquo;s sessions
      </p>
      {[
        { label: "MNT Module 1", meta: "Completed", state: "done" },
        { label: "Community Nutrition", meta: "In progress", state: "active" },
        { label: "Food Safety Review", meta: "Locked", state: "upcoming" },
      ].map((row) => (
        <div
          key={row.label}
          className="flex items-center justify-between rounded-xl bg-offwhite px-4 py-3"
        >
          <span className="font-body text-sm text-charcoal">{row.label}</span>
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              row.state === "done"
                ? "bg-bright text-white"
                : row.state === "active"
                ? "bg-primary text-white"
                : "bg-white text-mid"
            }`}
          >
            {row.meta}
          </span>
        </div>
      ))}
    </div>
  );
}

function FormatPanel() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {FORMATS.map((format) => (
        <div
          key={format}
          className="flex items-center gap-2 rounded-xl bg-offwhite px-4 py-3.5"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          <span className="font-body text-sm text-charcoal">{format}</span>
        </div>
      ))}
    </div>
  );
}

function CompetencyPanel() {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-heading text-sm font-bold text-charcoal">
        Your competency map
      </p>
      {COMPETENCIES.map((row) => (
        <div key={row.label}>
          <div className="mb-1.5 flex items-center justify-between font-body text-sm text-charcoal">
            <span>{row.label}</span>
            <span className="font-semibold text-primary">{row.value}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-offwhite">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${row.value}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function MockExamPanel() {
  return (
    <div className="flex flex-col items-center gap-3 py-2 text-center">
      <p className="font-heading text-sm font-bold text-charcoal">
        Full-length CDRE mock exam
      </p>
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-[6px] border-primary">
        <span className="font-heading text-2xl font-extrabold text-charcoal">
          76%
        </span>
      </div>
      <p className="font-body text-sm text-mid">Timed · 180 questions · scored</p>
    </div>
  );
}

const PANELS = [PlanPanel, FormatPanel, CompetencyPanel, MockExamPanel];

export default function StudyPlanMockup({ activeIndex }: { activeIndex: number }) {
  const Panel = PANELS[activeIndex] ?? PlanPanel;

  return (
    <div className="rounded-3xl bg-sage p-4 shadow-xl sm:p-6">
      <div className="overflow-hidden rounded-2xl bg-white">
        <div className="flex items-center gap-1.5 border-b border-[#E5E7E0] bg-offwhite px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7E0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7E0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E5E7E0]" />
          <span className="ml-3 font-body text-xs text-mid">
            app.nutripath.ca/study-plan
          </span>
        </div>
        <div key={activeIndex} className="panel-fade min-h-[260px] p-6">
          <Panel />
        </div>
      </div>
    </div>
  );
}

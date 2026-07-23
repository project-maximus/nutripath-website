"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import { TrophyIcon } from "@/components/ui/icons";

type QuizOption = { key: "A" | "B" | "C" | "D"; text: string };

type Competency = { code: string; label: string; explanation: string };

type QuizQuestion = {
  domain: string;
  question: string;
  options: QuizOption[];
  correct: "A" | "B" | "C" | "D";
  rationale: string;
  competencies: Competency[];
};

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    domain: "Food & Nutrition Expertise",
    question:
      "A 28-year-old vegan client, 12 weeks pregnant, has fatigue and glossitis. Bloodwork: hemoglobin 95 g/L (low), MCV 110 fL (elevated), B12 180 pmol/L (low), folate 25 nmol/L (normal). Which finding BEST differentiates the cause of her megaloblastic anemia?",
    options: [
      { key: "A", text: "Elevated MCV indicating macrocytic anemia" },
      { key: "B", text: "Low hemoglobin confirming iron deficiency anemia" },
      {
        key: "C",
        text: "Elevated methylmalonic acid (MMA), specific to B12 deficiency",
      },
      { key: "D", text: "Elevated homocysteine, indicating folate deficiency" },
    ],
    correct: "C",
    rationale:
      "Both B12 and folate deficiency raise MCV and homocysteine — but only B12 deficiency raises MMA, making it the differentiating marker here.",
    competencies: [
      {
        code: "1.03a",
        label: "Nutrient Metabolism",
        explanation:
          "Covers understanding the metabolic pathways nutrients move through. This question requires knowing that B12 deficiency specifically impairs the methylmalonyl-CoA mutase pathway, elevating MMA in a way folate deficiency does not.",
      },
      {
        code: "5.01b",
        label: "Nutrition Assessment",
        explanation:
          "Covers interpreting biochemical data as part of a client assessment. Here, four lab values have to be read together to correctly pin the anemia on B12 rather than folate or iron.",
      },
    ],
  },
  {
    domain: "Food Provision",
    question:
      "A hospital is switching from cook-serve to cook-chill production. What is the PRIMARY food safety concern with this transition?",
    options: [
      {
        key: "A",
        text: "Increased risk of Clostridium perfringens if cooling isn't rapid enough",
      },
      { key: "B", text: "Higher sodium content in pre-prepared chilled meals" },
      { key: "C", text: "Loss of nutrient density during chilling and reheating" },
      { key: "D", text: "Increased allergen cross-contamination during batch cooking" },
    ],
    correct: "A",
    rationale:
      "Cook-chill requires rapid cooling (60°C to 4°C within 4 hours) — the critical control point that prevents C. perfringens spores from germinating in the temperature danger zone.",
    competencies: [
      {
        code: "1.02e",
        label: "Food Safety",
        explanation:
          "Covers foundational food safety principles, including microbial risk. This question tests recognition that slow cooling lets Clostridium perfringens spores germinate in the temperature danger zone.",
      },
      {
        code: "4.02a",
        label: "Assess Practice Situations",
        explanation:
          "Covers evaluating a real operational scenario for risk before acting. Demonstrated here by weighing the food safety implications of switching production systems, not just the efficiency gains.",
      },
      {
        code: "6.02c",
        label: "Food Safety Systems",
        explanation:
          "Covers HACCP-based systems specific to food service operations. This question isolates the critical control point — rapid cooling — that is unique to cook-chill production.",
      },
    ],
  },
  {
    domain: "Communication & Collaboration",
    question:
      "A stroke patient's family is upset that the SLP recommends a pureed, extremely thick diet, saying it “takes away her dignity.” What is the MOST appropriate initial response?",
    options: [
      { key: "A", text: "Explain the recommendation must be followed without exception" },
      {
        key: "B",
        text: "Acknowledge their concern about dignity, explain the aspiration risk, and collaboratively explore visually appealing modified-texture options",
      },
      { key: "C", text: "Agree to the family's request to avoid conflict" },
      { key: "D", text: "Refer the decision to the physician, since this is outside your scope" },
    ],
    correct: "B",
    rationale:
      "This balances safety with dignity — acknowledging emotion, explaining risk, and collaborating on options respects both the SLP's expertise and the family's autonomy.",
    competencies: [
      {
        code: "3.01b",
        label: "Communication Approaches",
        explanation:
          "Covers using appropriate communication techniques in emotionally charged situations. The correct answer acknowledges the family's emotion before moving to education, rather than leading with a directive.",
      },
      {
        code: "2.04c/d",
        label: "Client-Centered, Collaborative Decision-Making",
        explanation:
          "Covers involving clients and families as partners in care decisions. Demonstrated by collaboratively exploring visually appealing texture options rather than issuing a one-sided ruling.",
      },
      {
        code: "3.05c",
        label: "Empathy",
        explanation:
          "Covers responding to distress with genuine acknowledgment rather than moving straight past it. The response explicitly validates the family's concern about dignity before addressing safety.",
      },
    ],
  },
];

export default function KcatQuiz() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const total = QUIZ_QUESTIONS.length;
  const done = step >= total;
  const question = !done ? QUIZ_QUESTIONS[step] : null;

  function handleSelect(key: string) {
    if (selected) return;
    setSelected(key);
    if (question && key === question.correct) setScore((s) => s + 1);
  }

  function handleNext() {
    setSelected(null);
    setStep((s) => s + 1);
  }

  function handleRestart() {
    setStep(0);
    setSelected(null);
    setScore(0);
  }

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-[#E5E7E0] bg-white p-6 shadow-sm sm:p-10">
      {!done && question ? (
        <>
          <div className="flex items-center gap-2">
            {QUIZ_QUESTIONS.map((_, index) => (
              <div
                key={index}
                className="h-1.5 flex-1 overflow-hidden rounded-full bg-offwhite"
              >
                <div
                  className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: index <= step ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 font-body text-xs font-semibold uppercase tracking-wide text-primary">
            Question {step + 1} of {total} &middot; {question.domain}
          </p>

          <div key={step} className="animate-bento-fade-in">
            <h3 className="mt-2 font-heading text-lg font-bold leading-snug text-charcoal sm:text-xl">
              {question.question}
            </h3>

            <div className="mt-6 flex flex-col gap-3">
              {question.options.map((option) => {
                const isSelected = selected === option.key;
                const isCorrectOption = option.key === question.correct;
                const revealed = selected !== null;

                const stateClass = !revealed
                  ? "border-[#E5E7E0] hover:border-primary/40 hover:bg-offwhite"
                  : isCorrectOption
                  ? "border-primary bg-sage"
                  : isSelected
                  ? "border-red-300 bg-red-50"
                  : "border-[#E5E7E0] opacity-60";

                const badgeClass = !revealed
                  ? "bg-offwhite text-mid"
                  : isCorrectOption
                  ? "bg-primary text-white"
                  : isSelected
                  ? "bg-red-400 text-white"
                  : "bg-offwhite text-mid";

                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleSelect(option.key)}
                    disabled={revealed}
                    className={`flex items-start gap-3 rounded-2xl border-2 px-4 py-3.5 text-left transition-all duration-300 ${stateClass} ${
                      revealed ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full font-body text-xs font-bold transition-colors duration-300 ${badgeClass}`}
                    >
                      {option.key}
                    </span>
                    <span className="font-body text-sm leading-relaxed text-charcoal">
                      {option.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {selected && (
              <div className="mt-5 animate-bento-fade-in rounded-2xl bg-offwhite p-4">
                <p className="font-body text-sm font-semibold text-charcoal">
                  {selected === question.correct
                    ? "Correct!"
                    : `Not quite — the answer is ${question.correct}.`}
                </p>
                <p className="mt-1.5 font-body text-sm leading-relaxed text-mid">
                  {question.rationale}
                </p>

                <p className="mt-4 font-body text-xs font-semibold uppercase tracking-wide text-primary">
                  ICDEP Competencies
                </p>
                <div className="mt-2 flex flex-col gap-2.5">
                  {question.competencies.map((competency) => (
                    <p
                      key={competency.code}
                      className="font-body text-sm leading-relaxed text-mid"
                    >
                      <span className="font-semibold text-charcoal">
                        {competency.code} ({competency.label}):
                      </span>{" "}
                      {competency.explanation}
                    </p>
                  ))}
                </div>
              </div>
            )}
          </div>

          {selected && (
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 font-body text-sm font-semibold text-white transition-colors hover:bg-forest"
              >
                {step + 1 < total ? "Next question" : "See your results"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="animate-bento-fade-in text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage text-primary">
            <TrophyIcon className="h-7 w-7" />
          </span>
          <h3 className="mt-4 font-heading text-2xl font-bold text-charcoal">
            Quiz complete!
          </h3>
          <p className="mt-2 font-body text-lg text-mid">
            You got{" "}
            <span className="font-semibold text-primary">
              {score}/{total}
            </span>{" "}
            correct.
          </p>
          <p className="mx-auto mt-3 max-w-md font-body text-sm leading-relaxed text-mid">
            This is exactly the kind of case-based question the KCAT Bootcamp
            walks through live — competency by competency, with a registered
            dietitian explaining the reasoning behind every answer.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-4">

            <Button href="/coming-soon">Join the KCAT Bootcamp waitlist</Button>
            <button
              type="button"
              onClick={handleRestart}
              className="font-body text-sm font-semibold text-primary underline underline-offset-4 hover:text-forest"
            >
              Try the quiz again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

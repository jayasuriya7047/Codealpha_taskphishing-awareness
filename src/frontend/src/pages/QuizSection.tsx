import { CheckCircle, RotateCcw, Shield, Trophy, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question:
      "You receive an email from 'support@paypa1.com' asking you to verify your account. What is the most suspicious indicator?",
    options: [
      "The email asks for your password",
      "The domain 'paypa1.com' uses a digit instead of the letter 'l'",
      "The email has a PayPal logo",
      "The email was sent at night",
    ],
    correct: 1,
    explanation:
      "'paypa1.com' uses the digit '1' to replace the letter 'l' in PayPal — this is called typosquatting. Always check the full domain spelling carefully.",
  },
  {
    id: 2,
    question:
      "A website URL shows a green padlock (HTTPS). Does this mean the website is safe?",
    options: [
      "Yes — HTTPS means the site is verified and legitimate",
      "No — HTTPS only encrypts the connection; attackers can also get SSL certificates",
      "Only if the site has a .com extension",
      "Yes, as long as there is no HTTP warning",
    ],
    correct: 1,
    explanation:
      "HTTPS only encrypts the data in transit. Phishing sites routinely obtain free SSL certificates (e.g., from Let's Encrypt) to appear trustworthy. Always verify the domain itself.",
  },
  {
    id: 3,
    question:
      "You get an SMS: 'Your parcel is held. Update address within 24 hours: bit.ly/parcel-fix'. What should you do?",
    options: [
      "Click the link — it's from a legitimate carrier",
      "Reply STOP to unsubscribe",
      "Do not click — go directly to the carrier's official website to track your parcel",
      "Forward it to contacts to warn them",
    ],
    correct: 2,
    explanation:
      "This is smishing (SMS phishing). Shortened URLs hide the real destination. Always navigate directly to the carrier's official website rather than clicking links in unsolicited texts.",
  },
  {
    id: 4,
    question:
      "Which of these is the STRONGEST form of two-factor authentication?",
    options: [
      "SMS one-time password (OTP)",
      "Security questions",
      "Hardware security key (e.g., YubiKey)",
      "Email-based OTP",
    ],
    correct: 2,
    explanation:
      "Hardware security keys are phishing-resistant because they cryptographically verify the website domain. SMS and email OTPs can be intercepted or SIM-swapped.",
  },
  {
    id: 5,
    question:
      "An email says your boss needs an urgent wire transfer of $8,500 and asks you to keep it confidential. What type of attack is this?",
    options: [
      "Smishing",
      "Business Email Compromise (BEC) / Spear Phishing",
      "Vishing",
      "Malware distribution",
    ],
    correct: 1,
    explanation:
      "Business Email Compromise targets employees with fake urgent wire transfer requests, often impersonating executives. The confidentiality request is designed to prevent verification.",
  },
  {
    id: 6,
    question:
      "You receive a call from 'Microsoft Support' saying your PC has a virus and they need remote access to fix it. What should you do?",
    options: [
      "Give them remote access — Microsoft is trustworthy",
      "Ask for a callback number and verify it on Microsoft's website",
      "Hang up immediately — Microsoft never makes unsolicited support calls",
      "Install the software they suggest to fix the virus",
    ],
    correct: 2,
    explanation:
      "Microsoft (and other major tech companies) never make unsolicited calls about viruses. This is a vishing (voice phishing) scam. Hang up immediately.",
  },
  {
    id: 7,
    question:
      "Which URL is MOST likely legitimate for Chase Bank online banking?",
    options: [
      "http://chase-bank-secure.com/login",
      "https://www.chase.com/online-banking",
      "https://chase.secure-banking.net",
      "https://chasee.com/signin",
    ],
    correct: 1,
    explanation:
      "Only 'chase.com' is the real Chase domain. 'chase-bank-secure.com' and 'chase.secure-banking.net' are phishing domains. 'chasee.com' has an extra 'e' — typosquatting.",
  },
];

const PASS_SCORE = 5;

export function QuizSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(
    Array(QUESTIONS.length).fill(null),
  );

  const question = QUESTIONS[currentQ];
  const passed = score >= PASS_SCORE;
  const pct = Math.round((score / QUESTIONS.length) * 100);

  const handleSelect = (idx: number) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null || confirmed) return;
    const isCorrect = selected === question.correct;
    const newAnswers = [...answers];
    newAnswers[currentQ] = selected;
    setAnswers(newAnswers);
    setConfirmed(true);
    if (isCorrect) setScore((s) => s + 1);
  };

  const handleNext = () => {
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQ(0);
    setSelected(null);
    setConfirmed(false);
    setScore(0);
    setFinished(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
  };

  return (
    <section id="quiz" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-primary border border-primary/30 rounded-full px-3 py-1 mb-3 bg-primary/5">
            MODULE_07 — CERTIFICATION QUIZ
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold neon-glow-cyan mb-3">
            Security Quiz
          </h2>
          <p className="text-muted-foreground max-w-xl">
            Test your knowledge. Score {PASS_SCORE}/{QUESTIONS.length} or higher
            to earn your awareness certificate.
          </p>
        </motion.div>

        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            {!finished ? (
              <motion.div
                key={currentQ}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card p-6"
                data-ocid="quiz.question_panel"
              >
                {/* Progress */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-muted-foreground">
                    Question {currentQ + 1} / {QUESTIONS.length}
                  </span>
                  <span className="text-xs font-mono text-primary">
                    Score: {score}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-muted/40 rounded-full mb-5 overflow-hidden">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    animate={{
                      width: `${(currentQ / QUESTIONS.length) * 100}%`,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                </div>

                <h3 className="font-display font-semibold text-foreground mb-5 leading-snug">
                  {question.question}
                </h3>

                <div className="space-y-3 mb-5">
                  {question.options.map((opt, i) => {
                    let style =
                      "border-border text-foreground hover:border-primary/40 hover:bg-primary/5";
                    if (confirmed) {
                      if (i === question.correct)
                        style =
                          "border-secondary/60 bg-secondary/10 text-secondary";
                      else if (i === selected && i !== question.correct)
                        style =
                          "border-destructive/60 bg-destructive/10 text-destructive";
                      else
                        style =
                          "border-border/40 text-muted-foreground opacity-60";
                    } else if (selected === i) {
                      style = "border-primary/60 bg-primary/10 text-primary";
                    }
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelect(i)}
                        className={`w-full text-left text-sm font-mono p-3 rounded-lg border transition-smooth ${style}`}
                        data-ocid={`quiz.option.${i + 1}`}
                      >
                        <span className="text-muted-foreground mr-2">
                          {String.fromCharCode(65 + i)}.
                        </span>
                        {opt}
                        {confirmed && i === question.correct && (
                          <CheckCircle className="inline w-3.5 h-3.5 ml-2 text-secondary" />
                        )}
                        {confirmed &&
                          i === selected &&
                          i !== question.correct && (
                            <XCircle className="inline w-3.5 h-3.5 ml-2 text-destructive" />
                          )}
                      </button>
                    );
                  })}
                </div>

                {confirmed && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs font-mono text-muted-foreground bg-muted/20 border border-border/50 rounded-md p-3 mb-4"
                    data-ocid="quiz.explanation_panel"
                  >
                    <span className="text-primary font-semibold">
                      EXPLANATION:{" "}
                    </span>
                    {question.explanation}
                  </motion.div>
                )}

                <div className="flex gap-3">
                  {!confirmed ? (
                    <button
                      type="button"
                      onClick={handleConfirm}
                      disabled={selected === null}
                      className="flex-1 bg-primary/20 border border-primary/50 text-primary font-mono text-sm py-2.5 rounded-lg hover:bg-primary/30 transition-smooth disabled:opacity-50"
                      data-ocid="quiz.confirm_button"
                    >
                      Confirm Answer
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 bg-primary/20 border border-primary/50 text-primary font-mono text-sm py-2.5 rounded-lg hover:bg-primary/30 transition-smooth"
                      data-ocid="quiz.next_button"
                    >
                      {currentQ < QUESTIONS.length - 1
                        ? "Next Question →"
                        : "View Results"}
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 text-center"
                data-ocid="quiz.results_panel"
              >
                {passed ? (
                  <>
                    <Trophy className="w-14 h-14 text-chart-3 mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold neon-glow-cyan mb-2">
                      Congratulations!
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      You passed the Phishing Awareness Certification quiz.
                    </p>

                    {/* Certificate */}
                    <div
                      className="border-2 border-primary/40 rounded-xl p-6 mb-6 relative overflow-hidden scan-line-overlay"
                      data-ocid="quiz.certificate"
                    >
                      <div className="absolute inset-0 bg-primary/3 pointer-events-none" />
                      <div className="relative">
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <Shield className="w-6 h-6 text-primary" />
                          <span className="font-display font-bold text-primary tracking-widest text-xs uppercase">
                            Certificate of Completion
                          </span>
                        </div>
                        <p className="font-display font-bold text-xl text-foreground mb-1">
                          Phishing Awareness Training
                        </p>
                        <p className="text-xs text-muted-foreground font-mono mb-3">
                          Advanced Phishing Awareness Training System — 2026
                        </p>
                        <div className="text-3xl font-display font-bold neon-glow-cyan">
                          {score}/{QUESTIONS.length}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {pct}% Score — CERTIFIED
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-14 h-14 text-destructive mx-auto mb-4" />
                    <h3 className="text-2xl font-display font-bold text-destructive mb-2">
                      Keep Learning
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      You scored {score}/{QUESTIONS.length}. You need at least{" "}
                      {PASS_SCORE} to pass. Review the training modules and try
                      again.
                    </p>
                    <div className="text-3xl font-display font-bold text-destructive mb-6">
                      {score}/{QUESTIONS.length} — {pct}%
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-2 mx-auto bg-muted/40 border border-border text-muted-foreground font-mono text-sm px-5 py-2.5 rounded-lg hover:bg-muted/60 hover:text-foreground transition-smooth"
                  data-ocid="quiz.retry_button"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Quiz
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

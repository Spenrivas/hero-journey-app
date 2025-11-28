export interface Stage {
  number: number;
  title: string;
  description: string;
  questions: string[];
}

export const heroJourneyStages: Stage[] = [
  {
    number: 1,
    title: 'The Ordinary World',
    description: 'The hero begins in a normal, mundane world, often unaware of the adventure that awaits.',
    questions: [
      'If you had to describe your current life as a story, what is the setting (the physical and social environment) and what is the central, repeating conflict or challenge that keeps presenting itself?',
      'In what specific areas of your life (e.g., career, identity, purpose, relationships) do you feel fundamentally stuck right now?',
      'If you continue on the trajectory you are on right now, what is the negative outcome that you are most motivated to avoid?',
    ],
  },
  {
    number: 2,
    title: 'The Call to Adventure',
    description: 'Something shakes up the situation; the hero faces the beginnings of change.',
    questions: [
      'What specific event, decision, or piece of information is the "Call" that is forcing you to face the beginnings of change right now?',
      'If you choose not to accept this journey, what is the negative outcome you are most motivated to avoid, or the "pit" you are trying to fill?',
      'How does accepting this invitation create a shift from a "forgettable experience" to the start of a "transformational quest"?',
    ],
  },
  {
    number: 3,
    title: 'Refusal of the Call',
    description: 'The hero initially hesitates or refuses the call, often due to fear or a sense of inadequacy.',
    questions: [
      'What is the greatest fear of the unknown or sense of inadequacy that makes you want to hesitate or try to turn away from this adventure?',
      'What is the story or belief about yourself that you must abandon now if you are truly going to commit to leaving the Ordinary World?',
      'If you risk failure and proceed anyway, what profound realization about your capability could you potentially gain (Self-Insight)?',
    ],
  },
  {
    number: 4,
    title: 'Meeting the Mentor',
    description: 'The hero encounters a mentor or guide who provides guidance, advice, or tools for the journey.',
    questions: [
      'What specific training, tools, or advice do you believe you need from the "seasoned traveler" that will enable you to continue the journey?',
      'What is the core concern you need to share with your mentor so you can feel understood and validated (Responsiveness), fueling your motivation?',
      'If your mentor could instantly provide you with clarity on the path forward, what is the first step you would be most motivated (Elevation) to take?',
    ],
  },
  {
    number: 5,
    title: 'Crossing the First Threshold',
    description: 'The hero commits to the adventure and crosses into the unknown, leaving their ordinary world behind.',
    questions: [
      'What specific behaviors, habits, or roles must you consciously leave behind in the "Ordinary World" to fully commit to the new rules and values of the Special World?',
      'How does committing to this step break the script of your old, stuck self, and how do you feel about defying those old expectations?',
      'What single, visible action can you take today to mark the transition into the commitment phase of your journey?',
    ],
  },
  {
    number: 6,
    title: 'Tests, Allies, and Enemies',
    description: 'The hero faces a series of challenges, makes new friends, and encounters adversaries on the journey.',
    questions: [
      'What specific situations or circumstances are likely to test your resolve or abilities in this new environment?',
      'Who among your peers are true allies with whom you can share a struggle toward a meaningful goal?',
      'What healing message do you need to communicate to (or receive from) your allies to reinforce the bond that "You\'re not alone"?',
    ],
  },
  {
    number: 7,
    title: 'Approach to the Inmost Cave',
    description: 'The hero approaches a critical point in the journey, often facing their greatest fear or confronting a powerful enemy.',
    questions: [
      'What is the ultimate challenge or fear that you are preparing to face that, if conquered, would deliver the most profound change?',
      'What "wicked problem" must you define and prepare for in the next few weeks, ensuring you spend 59 minutes defining the problem before one minute resolving it?',
      'How must you mentally and emotionally stretch yourself now to prepare for the inevitable risk of failure involved in the Ordeal ahead?',
    ],
  },
  {
    number: 8,
    title: 'The Ordeal',
    description: 'The hero undergoes a significant trial or ordeal that tests their abilities and resolve.',
    questions: [
      'In what way must you raise the stakes for this challenge to ensure it is a moment of Elevation—an experience that rises above the routine?',
      'How will you practice courage during this moment, knowing that this act of daring will serve as a moment of "death and new life"?',
      'What profound realization about yourself do you hope to achieve during this ordeal, one that delivers Insight compressed in time?',
    ],
  },
  {
    number: 9,
    title: 'The Reward (Seizing the Sword)',
    description: 'After overcoming the ordeal, the hero earns a reward or gains a valuable insight that propels them forward.',
    questions: [
      'What profound self-insight is the "treasure" you have earned—the realization that allows you to say, "I can endure" or "I am capable of more than I thought"?',
      'How will you commemorate this accomplishment to generate immense pride, ensuring the recognition feels personal and authentic rather than programmatic?',
      'What tangible "symbolic Elixir" or memorabilia will you take possession of to represent this achievement and boost its sensory appeal?',
    ],
  },
  {
    number: 10,
    title: 'The Road Back',
    description: 'The hero begins the journey back to their ordinary world, often pursued by enemies or facing additional challenges.',
    questions: [
      'What specific lessons or skills acquired in the Special World must you apply immediately as you encounter the first signs of resistance on the Road Back?',
      'What is the implementation intention ("If X happens, I will do Y") you can set now to ensure you stick to your transformed path and do not lose the treasure you have won?',
      'How can you ensure this phase is not a forgettable plateau, but instead a period where you multiply milestones by finding new accomplishments to celebrate?',
    ],
  },
  {
    number: 11,
    title: 'Resurrection',
    description: 'The hero faces a final, often life-threatening challenge that transforms them and solidifies their hero status.',
    questions: [
      'What is the final, severe test—a last moment of purification or rebirth—that must be successfully faced to solidify your lasting identity as a leader and contributor?',
      'How does conquering this final hurdle provide a defining moment that proves, beyond a doubt, that you are fundamentally changed?',
      'What is the specific wisdom you gained that will prevent you from making the same mistakes as your "Old Me"?',
    ],
  },
  {
    number: 12,
    title: 'Return with the Elixir',
    description: 'The hero returns to their ordinary world with newfound knowledge, a treasure, or a boon that benefits themselves and others.',
    questions: [
      'What is the specific "elixir" (knowledge or boon) you carry that has the power to transform the world just as you have been transformed?',
      'How will you use your experience to teach an incoming mentee a key concept or skill and thereby solidify your purpose and sense of meaning?',
      'By sharing your hard-earned wisdom, how will you strengthen social bonds and adopt a lasting identity as a contributor?',
    ],
  },
];








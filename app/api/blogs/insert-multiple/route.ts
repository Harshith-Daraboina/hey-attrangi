import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const blogs = [
  {
    title: "Is It Depression or Detachment?",
    tumblineQuestion: "Is this just sadness … or something different?",
    tumblineLine: "Emotional blunting isn't simply withdrawal — it's emotional dampening at scale.",
    mainContent: `While emotional blunting often appears in those with Major Depressive Disorder (MDD) or Post‑Traumatic Stress Disorder (PTSD), it differs from classic depression in key ways. Depression drains energy, interest and motivation. Emotional blunting, by contrast, dampens the intensity of emotions — you might no longer feel excited about things you once loved, nor deeply sad about losses. According to research, around 56% of patients with depression and emotional blunting believe it's caused by the depression itself, while around 45% attribute it to their antidepressant medication. Recognising the difference is important in choosing the right approach.`,
    disorderRelation: "Emotional blunting often appears in those with Major Depressive Disorder (MDD) or Post‑Traumatic Stress Disorder (PTSD), but differs from classic depression in key ways.",
    question: "Have I lost interest and emotional intensity?",
    subquestions: [
      "Have I lost interest and emotional intensity?",
      "Do I feel numb rather than simply low?",
      "Has the numbness continued even when I'm not actively depressed?"
    ],
    summary: "Emotional blunting differs from classic depression - it dampens emotional intensity rather than draining energy. Understanding this distinction is crucial for choosing the right treatment approach.",
    sourceLink: "https://www.biomedcentral.com",
    excerpt: "While emotional blunting often appears in those with Major Depressive Disorder (MDD) or Post‑Traumatic Stress Disorder (PTSD), it differs from classic depression in key ways.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "Medication and the Mind: When Antidepressants Dull the Feelings",
    tumblineQuestion: "Could your medication be muting your emotions?",
    tumblineLine: "Some antidepressants calm pain — but they may also mute joy.",
    mainContent: `Certain antidepressants — especially Selective Serotonin Reuptake Inhibitors (SSRIs) and SNRIs — can cause emotional flattening as a side-effect. One study noted prevalence rates of emotional blunting of ~43-47% in SSRI-treated participants. Another found that even in remission from depression, emotional blunting can persist due to medication. This doesn't mean medication is bad; in many cases it's lifesaving. But it does mean that if you feel "fine but not alive", it may be time to talk with your doctor about adjusting medication or adding therapy aimed at emotional reconnection.`,
    disorderRelation: "Certain antidepressants, especially SSRIs and SNRIs, can cause emotional flattening as a side-effect, with prevalence rates of ~43-47% in SSRI-treated participants.",
    question: "Did my numbness begin after starting or increasing an antidepressant?",
    subquestions: [
      "Did my numbness begin after starting or increasing an antidepressant?",
      "Do I feel better mood-wise but still emotionally detached?",
      "Have I discussed blunting with my psychiatrist or physician?"
    ],
    summary: "SSRIs and SNRIs can cause emotional flattening in 43-47% of patients. If you feel 'fine but not alive', it may be time to discuss medication adjustment with your doctor.",
    sourceLink: "https://academic.oup.com",
    excerpt: "Certain antidepressants — especially SSRIs and SNRIs — can cause emotional flattening as a side-effect, affecting 43-47% of patients.",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "The Cost of Emotional Protection",
    tumblineQuestion: "Could your brain be doing too much to protect itself?",
    tumblineLine: "Emotional numbness may start as protection — but over time it becomes a barrier.",
    mainContent: `For many survivors of trauma, emotional numbing is a survival response: the mind temporarily disconnects from overwhelming feelings to protect the self. Yet, when this state becomes prolonged, it hinders healing, blocks authentic living and disconnects us from meaningful relationships. In fact, studies on emotional blunting show that its impact on functioning and quality of life can be very serious. Recognising that the numbness once helped — and now hurts — can be a turning point.`,
    disorderRelation: "For many survivors of trauma, emotional numbing is a survival response that temporarily disconnects from overwhelming feelings to protect the self.",
    question: "Was there a point when emotions became 'too much', leading me to shut them down?",
    subquestions: [
      "Was there a point when emotions became 'too much', leading me to shut them down?",
      "Which parts of my life feel disconnected or unreal?",
      "What would reconnecting with feeling look like for me (slowly, gently)?"
    ],
    summary: "Emotional numbing starts as a survival response to trauma but can become a barrier to healing and authentic living when prolonged.",
    sourceLink: "https://www.biomedcentral.com",
    excerpt: "For many survivors of trauma, emotional numbing is a survival response that can hinder healing when prolonged.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "Emotional Blunting vs Anhedonia: What's the Difference?",
    tumblineQuestion: "Are you unable to feel anything, or just unable to enjoy things?",
    tumblineLine: "Emotional blunting blocks the full spectrum of feeling; anhedonia blocks pleasure only.",
    mainContent: `While related, emotional blunting and Anhedonia are not identical. Anhedonia specifically refers to the inability to anticipate or enjoy pleasure from things once liked. Emotional blunting goes further: difficulty experiencing both positive and negative emotions. Studies indicate that emotional blunting is reported by many with MDD, and may persist even when other symptoms have improved. Recognising the nuance helps tailor therapy: one approach might be behavioural activation (for anhedonia) versus emotional reconnection (for blunting).`,
    disorderRelation: "Emotional blunting and anhedonia are related but different - anhedonia blocks pleasure, while blunting affects the full spectrum of emotions.",
    question: "Do I feel indifferent to happy events and sad events alike?",
    subquestions: [
      "Do I feel indifferent to happy events and sad events alike?",
      "Do I notice a narrowed emotional range rather than simply 'no fun'?",
      "What feelings do I still remember clearly, and what feels distant?"
    ],
    summary: "Anhedonia blocks pleasure; emotional blunting affects both positive and negative emotions. Understanding this difference helps tailor appropriate therapy.",
    sourceLink: "https://www.ncbi.nlm.nih.gov/pmc",
    excerpt: "Emotional blunting and anhedonia are related but different - anhedonia blocks pleasure, while blunting affects the full emotional spectrum.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "The Brain Under the Shield: What Happens Inside?",
    tumblineQuestion: "How does the brain hush our feelings?",
    tumblineLine: "Emotional blunting isn't just metaphorical — there are measurable changes in the brain.",
    mainContent: `Research shows that emotional blunting may arise due to changes in how the brain processes reinforcement learning, especially under antidepressant influence. For example, a study found that SSRIs affected the ability to learn from positive or negative feedback, which may help explain why feelings of joy or sadness become muted. Further, the brain networks responsible for emotion-processing and self-referential thoughts show altered connectivity in those with persistent blunting. Understanding this helps reduce self-blame: it's not "just you", it's a brain process.`,
    disorderRelation: "Emotional blunting arises from changes in how the brain processes reinforcement learning, especially under antidepressant influence.",
    question: "Am I aware of a dampening of emotional reaction even if I logically understand an event is moving?",
    subquestions: [
      "Am I aware of a dampening of emotional reaction even if I logically understand an event is moving?",
      "Have I felt a sense of 'watching life rather than living it'?",
      "What small physical or sensory cues might still register emotion in me?"
    ],
    summary: "Emotional blunting involves measurable brain changes in reinforcement learning and emotion-processing networks. It's a brain process, not a personal failing.",
    sourceLink: "https://www.cam.ac.uk",
    excerpt: "Research shows emotional blunting involves changes in brain reinforcement learning and emotion-processing networks.",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "When It's Not Just Mood: Blunting in Other Conditions",
    tumblineQuestion: "Could emotional flatness signal more than depression?",
    tumblineLine: "Emotional blunting can emerge in trauma-related, psychotic, and medical conditions — not just depression.",
    mainContent: `While most commonly discussed in the context of MDD and medication, emotional blunting is also seen in other disorders: in Schizophrenia spectrum disorders as "flattened affect", in trauma-related conditions as emotional numbing, and even in neurological or substance use contexts. Recognising co-occurring factors is crucial: treatment for trauma-induced blunting may differ markedly from that which arises solely from medication.`,
    disorderRelation: "Emotional blunting appears in Schizophrenia spectrum disorders as 'flattened affect', in trauma-related conditions as emotional numbing, and in neurological or substance use contexts.",
    question: "Have I experienced trauma or other diagnoses (beyond depression) that may relate?",
    subquestions: [
      "Have I experienced trauma or other diagnoses (beyond depression) that may relate?",
      "Do I notice a difference between how I feel in social situations vs alone?",
      "What style of help feels relevant to my context (trauma-informed, medication review, therapy)?"
    ],
    summary: "Emotional blunting appears in various conditions beyond depression - from schizophrenia to trauma to neurological disorders. Treatment must address the underlying cause.",
    sourceLink: "https://www.biomedcentral.com",
    excerpt: "Emotional blunting appears in various conditions beyond depression, requiring different treatment approaches based on the underlying cause.",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "Steps Toward Feeling Again: Practical Therapy & Medication Strategies",
    tumblineQuestion: "What can you do when you want to reconnect with feeling?",
    tumblineLine: "Emotional blunting isn't permanent — with tailored care, you can begin to feel again.",
    mainContent: `Helping someone move out of emotional blunting often involves a combination of psychotherapy (e.g., trauma-focused CBT, EMDR), medication review, and behavioural strategies. For instance, one study found that switching to the antidepressant Vortioxetine significantly improved emotional blunting in patients with inadequate response to SSRIs/SNRIs. Other non-medication approaches include: deliberate sensory re-engagement, journaling feelings, reconnecting with meaningful relationships, and mindful practice of noticing small emotions rather than big ones.`,
    disorderRelation: "Treatment for emotional blunting involves psychotherapy, medication review, and behavioural strategies tailored to the individual.",
    question: "Have I discussed emotional blunting with my doctor/therapist?",
    subquestions: [
      "Have I discussed emotional blunting with my doctor/therapist?",
      "What small sensory or emotional moments (a breeze, a taste, a sound) can I practise noticing?",
      "How comfortable am I in gradually letting myself feel — even if that means feeling pain, too?"
    ],
    summary: "Emotional blunting can be treated with psychotherapy, medication adjustments, and behavioural strategies. Recovery is possible with tailored care.",
    sourceLink: "https://www.dovepress.com",
    excerpt: "Treatment for emotional blunting involves psychotherapy, medication review, and behavioural strategies for gradual reconnection.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "Reconnecting with Others: When the Inner World Feels Empty",
    tumblineQuestion: "Why does feeling numb make relationships harder?",
    tumblineLine: "Emotional blunting may isolate you — even in a crowd.",
    mainContent: `When you're emotionally blunted, even close relationships can feel distant. You might nod along, listen, and respond — but inside there's a flatness, a sense that you're "going through the motions." This can lead to guilt ("why don't I feel happy for them?"), shame, or withdrawal. The gap between how you should feel and how you do feel can be painful. Addressing this starts with honest communication: telling a trusted person, or a clinician, that you feel disconnected rather than indifferent. Group therapy or peer support can also help reduce isolation and rebuild emotional resonance.`,
    disorderRelation: "Emotional blunting creates distance in relationships, leading to guilt, shame, or withdrawal when you can't feel what you 'should' feel.",
    question: "Do I feel more like an observer than a participant in my relationships?",
    subquestions: [
      "Do I feel more like an observer than a participant in my relationships?",
      "Which relationship currently feels hardest because of my lack of feeling?",
      "What is one small step I could take this week to express even a simple emotion (gratitude, curiosity, regret)?"
    ],
    summary: "Emotional blunting makes relationships feel distant. Honest communication and peer support can help rebuild emotional connection.",
    sourceLink: "",
    excerpt: "When emotionally blunted, relationships feel distant. Honest communication and support can help rebuild connection.",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  },
  {
    title: "Identity, Meaning & Moving Forward",
    tumblineQuestion: "When your feelings fade, what happens to the 'you' behind them?",
    tumblineLine: "Emotional blunting steals more than feeling — it erodes meaning.",
    mainContent: `When your emotional world feels thin or muted, it can feel like you've lost a part of yourself. You may ask: "Who am I if I don't feel happy, sad, excited?" Reclaiming identity often involves reconnecting with sensations, memories, values and meaning rather than emotions alone. Slow reconnection might mean revisiting old hobbies, exploring new ones, volunteering, or simply noticing nature. Accepting that healing is gradual — not instant — is key. Remember: emotional blunting is not a sign of failure; it's a protective pause. And healing begins by gently opening the door, allowing yourself to feel again, without fear.`,
    disorderRelation: "Emotional blunting can make you feel like you've lost part of yourself, but identity can be reclaimed through reconnecting with sensations, memories, and values.",
    question: "When I close my eyes, what memory still stirs something (even slightly) in me?",
    subquestions: [
      "When I close my eyes, what memory still stirs something (even slightly) in me?",
      "What value or cause matters to me beyond how I 'feel'?",
      "How might I mark a small milestone this week toward reconnecting (e.g., a sensory walk, journalling a memory)?"
    ],
    summary: "Emotional blunting can make you feel like you've lost yourself, but identity can be reclaimed through gradual reconnection with sensations, memories, and values.",
    sourceLink: "",
    excerpt: "When feelings fade, identity can feel lost. Reclaiming yourself involves gradual reconnection with sensations, memories, and values.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
    author: "Support Team Attrangi",
    published: true,
    featured: false
  }
];

export async function POST(request: NextRequest) {
  try {
    const results = [];

    for (let i = 0; i < blogs.length; i++) {
      const blogData = blogs[i];
      const slug = createSlug(blogData.title);

      // Check if blog already exists
      const existingBlog = await prisma.blog.findUnique({
        where: { slug },
      });

      const blog = existingBlog
        ? await prisma.blog.update({
            where: { slug },
            data: {
              title: blogData.title,
              content: blogData.mainContent,
              excerpt: blogData.excerpt,
              image: blogData.image,
              tumblineQuestion: blogData.tumblineQuestion,
              tumblineLine: blogData.tumblineLine,
              mainContent: blogData.mainContent,
              disorderRelation: blogData.disorderRelation,
              question: blogData.question,
              subquestions: blogData.subquestions,
              summary: blogData.summary,
              sourceLink: blogData.sourceLink || null,
              author: blogData.author,
              published: blogData.published,
              featured: blogData.featured,
            },
          })
        : await prisma.blog.create({
            data: {
              title: blogData.title,
              slug,
              content: blogData.mainContent,
              excerpt: blogData.excerpt,
              image: blogData.image,
              tumblineQuestion: blogData.tumblineQuestion,
              tumblineLine: blogData.tumblineLine,
              mainContent: blogData.mainContent,
              disorderRelation: blogData.disorderRelation,
              question: blogData.question,
              subquestions: blogData.subquestions,
              summary: blogData.summary,
              sourceLink: blogData.sourceLink || null,
              author: blogData.author,
              published: blogData.published,
              featured: blogData.featured,
            },
          });

      results.push({
        id: blog.id,
        title: blog.title,
        slug: blog.slug,
        status: existingBlog ? 'updated' : 'created'
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully processed ${blogs.length} blog entries`,
      results
    });
  } catch (error) {
    console.error("Error inserting blogs:", error);
    return NextResponse.json(
      { error: "Failed to insert blogs", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}


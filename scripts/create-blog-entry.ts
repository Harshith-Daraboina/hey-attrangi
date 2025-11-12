import { PrismaClient } from "../app/generated/prisma";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  try {
    // Step 1: Create or update user account
    const email = "htih@yahoo.com";
    const password = "asdasd";
    
    console.log("Creating/updating user account...");
    
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (existingUser) {
      user = await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });
      console.log("User password updated!");
    } else {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: "Admin User",
          role: "admin",
        },
      });
      console.log("User created!");
    }

    console.log(`User: ${user.email}`);
    console.log(`Name: ${user.name}`);
    console.log(`Role: ${user.role}\n`);

    // Step 2: Create blog post
    console.log("Creating blog post...");

    const blogData = {
      title: "Why Do Some People Stop Feeling Even When Life Seems Fine?",
      slug: "why-do-some-people-stop-feeling-even-when-life-seems-fine",
      tumblineQuestion: "Why do some people feel emotionally numb even when life seems fine?",
      tumblineLine: "Emotional blunting isn't emptiness — it's your mind's way of shielding itself from too much feeling.",
      mainContent: `Emotional blunting refers to a reduction or absence of emotional response — both positive and negative. Many people describe life as "flat", "foggy", or "colourless". It can occur as a symptom of depression, trauma, or side-effects of medication, but is often misunderstood as coldness or detachment. 

In truth, it's a psychological defence mechanism: the brain's attempt to protect itself from emotional overload. This state can make it hard to connect with others, feel joy, or even feel sadness deeply. Over time, it may lead to feelings of alienation or identity-loss.

Understanding emotional blunting is the first step toward reconnecting with your feelings and finding pathways back to emotional wellness.`,
      disorderRelation: `Emotional blunting is commonly associated with several mental health conditions:

• **Depression**: Major depressive disorder often includes emotional numbness as a core symptom
• **PTSD and Trauma**: The mind may shut down emotions to protect from overwhelming trauma memories
• **Medication Side Effects**: Some antidepressants and mood stabilizers can cause emotional blunting
• **Burnout**: Chronic stress can lead to emotional exhaustion and numbness
• **Dissociative Disorders**: Conditions where emotional disconnection is a primary feature

It's important to recognize that emotional blunting is not a character flaw or weakness — it's a protective response that may have served a purpose but now needs attention and care.`,
      question: "How can I recognize if I'm experiencing emotional blunting, and what steps can I take to reconnect with my feelings?",
      subquestions: [
        "Am I feeling 'flat' rather than sad or angry?",
        "When did I first notice that things which used to move me no longer do?",
        "Do I feel disconnected from people or activities that once mattered?",
        "Have I noticed a change in my ability to experience joy or excitement?",
        "Is this emotional numbness affecting my relationships or daily functioning?"
      ],
      summary: `Emotional blunting is a protective psychological mechanism where the brain reduces emotional responses to shield itself from overwhelming feelings. While it can occur due to depression, trauma, medication, or burnout, it's often misunderstood. Recognizing the signs — feeling "flat" or disconnected from previously meaningful experiences — is crucial. Through understanding, professional support, and gradual reconnection strategies, it's possible to restore emotional depth and reconnect with life's richness.`,
      sourceLink: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3181767/",
      excerpt: "Emotional blunting isn't emptiness — it's your mind's way of shielding itself from too much feeling. Learn why some people stop feeling even when life seems fine.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop",
      author: "Mental Health Team",
      content: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      line-height: 1.8;
      color: #333;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
    h1 {
      color: #ea580c;
      font-size: 2.5rem;
      margin-bottom: 1rem;
      font-weight: 700;
    }
    h2 {
      color: #f97316;
      font-size: 1.8rem;
      margin-top: 2rem;
      margin-bottom: 1rem;
      border-left: 4px solid #f97316;
      padding-left: 1rem;
    }
    h3 {
      color: #fb923c;
      font-size: 1.4rem;
      margin-top: 1.5rem;
      margin-bottom: 0.8rem;
    }
    .thumbnail-section {
      background: linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%);
      padding: 2rem;
      border-radius: 12px;
      margin: 2rem 0;
      border-left: 5px solid #f97316;
    }
    .thumbnail-question {
      font-size: 1.5rem;
      font-weight: 600;
      color: #ea580c;
      margin-bottom: 0.5rem;
    }
    .thumbnail-line {
      font-size: 1.1rem;
      color: #7c2d12;
      font-style: italic;
    }
    .main-content {
      background: #fef3c7;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      border: 1px solid #fde68a;
    }
    .disorder-relation {
      background: #f0f9ff;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      border-left: 4px solid #0ea5e9;
    }
    .disorder-relation ul {
      margin: 1rem 0;
      padding-left: 1.5rem;
    }
    .disorder-relation li {
      margin: 0.5rem 0;
    }
    .question-section {
      background: #f3e8ff;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      border-left: 4px solid #a855f7;
    }
    .main-question {
      font-size: 1.3rem;
      font-weight: 600;
      color: #7c3aed;
      margin-bottom: 1rem;
    }
    .subquestions {
      margin-top: 1rem;
    }
    .subquestions h4 {
      color: #9333ea;
      font-size: 1.1rem;
      margin-top: 1rem;
      margin-bottom: 0.5rem;
    }
    .subquestions ul {
      list-style: none;
      padding-left: 0;
    }
    .subquestions li {
      background: white;
      padding: 0.8rem 1rem;
      margin: 0.5rem 0;
      border-radius: 6px;
      border-left: 3px solid #c084fc;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    .summary {
      background: #ecfdf5;
      padding: 1.5rem;
      border-radius: 8px;
      margin: 1.5rem 0;
      border-left: 4px solid #10b981;
    }
    .source-link {
      margin-top: 2rem;
      padding: 1rem;
      background: #f9fafb;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
    }
    .source-link a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    .source-link a:hover {
      text-decoration: underline;
    }
    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1.5rem 0;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }
    .image-caption {
      text-align: center;
      font-style: italic;
      color: #6b7280;
      font-size: 0.9rem;
      margin-top: -1rem;
      margin-bottom: 1.5rem;
    }
    p {
      margin: 1rem 0;
    }
    strong {
      color: #ea580c;
    }
  </style>
</head>
<body>
  <h1>Why Do Some People Stop Feeling Even When Life Seems Fine?</h1>

  <div class="thumbnail-section">
    <div class="thumbnail-question">Why do some people feel emotionally numb even when life seems fine?</div>
    <div class="thumbnail-line">Emotional blunting isn't emptiness — it's your mind's way of shielding itself from too much feeling.</div>
  </div>

  <img src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop" alt="Person looking out window, representing emotional numbness">
  <div class="image-caption">Understanding emotional blunting requires compassion and patience</div>

  <div class="main-content">
    <h2>Understanding Emotional Blunting</h2>
    <p>Emotional blunting refers to a reduction or absence of emotional response — both positive and negative. Many people describe life as "flat", "foggy", or "colourless". It can occur as a symptom of depression, trauma, or side-effects of medication, but is often misunderstood as coldness or detachment.</p>
    
    <p>In truth, it's a <strong>psychological defence mechanism</strong>: the brain's attempt to protect itself from emotional overload. This state can make it hard to connect with others, feel joy, or even feel sadness deeply. Over time, it may lead to feelings of alienation or identity-loss.</p>
    
    <p>Understanding emotional blunting is the first step toward reconnecting with your feelings and finding pathways back to emotional wellness.</p>
  </div>

  <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop" alt="Therapy and mental health support">
  <div class="image-caption">Professional support can help navigate emotional numbness</div>

  <div class="disorder-relation">
    <h2>Relation to Mental Health Conditions</h2>
    <p>Emotional blunting is commonly associated with several mental health conditions:</p>
    <ul>
      <li><strong>Depression</strong>: Major depressive disorder often includes emotional numbness as a core symptom</li>
      <li><strong>PTSD and Trauma</strong>: The mind may shut down emotions to protect from overwhelming trauma memories</li>
      <li><strong>Medication Side Effects</strong>: Some antidepressants and mood stabilizers can cause emotional blunting</li>
      <li><strong>Burnout</strong>: Chronic stress can lead to emotional exhaustion and numbness</li>
      <li><strong>Dissociative Disorders</strong>: Conditions where emotional disconnection is a primary feature</li>
    </ul>
    <p>It's important to recognize that emotional blunting is not a character flaw or weakness — it's a protective response that may have served a purpose but now needs attention and care.</p>
  </div>

  <img src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=600&fit=crop" alt="Connection and relationships">
  <div class="image-caption">Reconnecting with emotions takes time and support</div>

  <div class="question-section">
    <h2>Reflection Questions</h2>
    <div class="main-question">How can I recognize if I'm experiencing emotional blunting, and what steps can I take to reconnect with my feelings?</div>
    
    <div class="subquestions">
      <h4>Consider these reflection questions:</h4>
      <ul>
        <li>Am I feeling "flat" rather than sad or angry?</li>
        <li>When did I first notice that things which used to move me no longer do?</li>
        <li>Do I feel disconnected from people or activities that once mattered?</li>
        <li>Have I noticed a change in my ability to experience joy or excitement?</li>
        <li>Is this emotional numbness affecting my relationships or daily functioning?</li>
      </ul>
    </div>
  </div>

  <div class="summary">
    <h2>Summary</h2>
    <p>Emotional blunting is a protective psychological mechanism where the brain reduces emotional responses to shield itself from overwhelming feelings. While it can occur due to depression, trauma, medication, or burnout, it's often misunderstood. Recognizing the signs — feeling "flat" or disconnected from previously meaningful experiences — is crucial. Through understanding, professional support, and gradual reconnection strategies, it's possible to restore emotional depth and reconnect with life's richness.</p>
  </div>

  <div class="source-link">
    <p><strong>Source:</strong> <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC3181767/" target="_blank" rel="noopener noreferrer">NCBI - Emotional Blunting in Depression</a></p>
  </div>
</body>
</html>`,
      published: true,
      featured: true,
    };

    // Check if blog already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: blogData.slug },
    });

    if (existingBlog) {
      console.log("Blog already exists, updating...");
      await prisma.blog.update({
        where: { slug: blogData.slug },
        data: blogData,
      });
      console.log("Blog updated successfully!");
    } else {
      await prisma.blog.create({
        data: blogData,
      });
      console.log("Blog created successfully!");
    }

    console.log(`\nBlog Title: ${blogData.title}`);
    console.log(`Slug: ${blogData.slug}`);
    console.log(`Published: ${blogData.published}`);
    console.log(`Featured: ${blogData.featured}`);

  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();


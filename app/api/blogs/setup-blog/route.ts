import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Step 1: Create or update user account
    const email = "htih@yahoo.com";
    const password = "asdasd";
    
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
    } else {
      user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          name: "Admin User",
          role: "admin",
        },
      });
    }

    // Step 2: Create blog post
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
      content: `Why Do Some People Stop Feeling Even When Life Seems Fine?

Emotional blunting refers to a reduction or absence of emotional response — both positive and negative. Many people describe life as "flat", "foggy", or "colourless". It can occur as a symptom of depression, trauma, or side-effects of medication, but is often misunderstood as coldness or detachment.

In truth, it's a psychological defence mechanism: the brain's attempt to protect itself from emotional overload. This state can make it hard to connect with others, feel joy, or even feel sadness deeply. Over time, it may lead to feelings of alienation or identity-loss.

Understanding emotional blunting is the first step toward reconnecting with your feelings and finding pathways back to emotional wellness.`,
      published: true,
      featured: true,
    };

    // Check if blog already exists
    const existingBlog = await prisma.blog.findUnique({
      where: { slug: blogData.slug },
    });

    let blog;
    if (existingBlog) {
      blog = await prisma.blog.update({
        where: { slug: blogData.slug },
        data: blogData,
      });
    } else {
      blog = await prisma.blog.create({
        data: blogData,
      });
    }

    return NextResponse.json({
      success: true,
      message: "User account and blog post created/updated successfully",
      user: {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      blog: {
        title: blog.title,
        slug: blog.slug,
        published: blog.published,
        featured: blog.featured,
      },
    });
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Failed to setup blog", details: error.message },
      { status: 500 }
    );
  }
}


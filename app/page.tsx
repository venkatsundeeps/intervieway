import CTA from "@/components/CTA";
import ChatWidget from "@/components/ChatWidget";
import ChatExperience from "@/components/ChatExperience";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Ownership from "@/components/Ownership";
import VoiceOption from "@/components/VoiceOption";
import WhatThisDoes from "@/components/WhatThisDoes";
import WhoThisIsFor from "@/components/WhoThisIsFor";

export default function Home() {
  return (
    <main className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10 md:py-14">
      <Hero />
      <WhatThisDoes />
      <Features />
      <ChatExperience />
      <VoiceOption />
      <WhoThisIsFor />
      <Ownership />
      <CTA />
      <ChatWidget />
    </main>
  );
}

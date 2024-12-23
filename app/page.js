import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Blog from "./components/homepage/blog";
import ContactSection from "./components/homepage/contact";
import Education from "./components/homepage/education";
import Experience from "./components/homepage/experience";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

export const dynamic = 'force-dynamic'

async function getData() {
  const res = await fetch(
    `https://dev.to/api/articles?username=${personalData.devUsername}`,
    {
      next: {
        revalidate: 60 // Revalidate every hour
      },
      cache: 'force-cache'
    }
  );

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await res.json();
  const filtered = data.filter((item) => item?.cover_image).sort((b, a) => new Date(b.published_at) - new Date(a.published_at));
  return filtered;
}

export default async function Home() {
  const blogs = await getData();
  
  return (
    <>
      <HeroSection />
      <AboutSection />
      <Experience />
      <Skills />
      <Projects />
      <Education />
      <Blog blogs={blogs} />
      <ContactSection />
    </>
  )
};
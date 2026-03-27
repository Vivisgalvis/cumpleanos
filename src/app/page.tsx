import { HeroSection } from '@/components/sections/HeroSection'
import { LocationSection } from '@/components/sections/LocationSection'
import { CountdownSection } from '@/components/sections/CountdownSection'


export default function HomePage() {
  return (
    <main className="min-h-[100svh]">
      <HeroSection />
      {/* <StorySection /> */}
      <CountdownSection />
      <LocationSection />
    </main>
  )
}

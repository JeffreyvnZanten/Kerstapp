import ChristmasCountdown from "./ChristmasCountdown";

export default function Home() {
  return (
    <div className="bg-[url('/xmas1.webp')] bg-cover bg-center bg-no-repeat min-h-screen w-full fixed inset-0">
      <ChristmasCountdown />
    </div>
  )
}
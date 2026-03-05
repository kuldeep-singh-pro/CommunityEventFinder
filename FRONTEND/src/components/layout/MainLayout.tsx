import Navbar from "./Navbar"
import Footer from "./Footer"

export default function MainLayout({ children }: any) {
  return (
    <div className="min-h-screen bg-background flex flex-col w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-grow w-full min-w-0">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 min-w-0">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}
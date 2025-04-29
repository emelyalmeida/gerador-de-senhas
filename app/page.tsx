import PasswordGenerator from "@/components/password-generator"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-pink-50 to-white">
      <div className="w-full max-w-md">
        <PasswordGenerator />
        <footer className="mt-8 text-center text-xs text-pink-400">
          {/* emely */}
          Desenvolvido por Emely
        </footer>
      </div>
    </main>
  )
}

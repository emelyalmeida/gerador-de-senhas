"use client"

import { useState, useEffect } from "react"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Check, Copy, RefreshCw } from "lucide-react"

export default function PasswordGenerator() {
  // emely
  const [password, setPassword] = useState("")
  const [length, setLength] = useState(12)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [copied, setCopied] = useState(false)

  const generatePassword = () => {
    // emely
    let charset = ""
    let newPassword = ""

    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz"
    if (numbers) charset += "0123456789"
    if (symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    if (charset === "") {
      setPassword("Selecione pelo menos uma opção")
      return
    }

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      newPassword += charset[randomIndex]
    }

    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    // emely
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  useEffect(() => {
    generatePassword()
  }, [length, uppercase, lowercase, numbers, symbols])

  return (
    <Card className="border-pink-200 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-t-lg">
        <CardTitle className="text-center">
          {/* emely */}
          Gerador de Senhas
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="relative">
          <div className="flex items-center justify-between bg-pink-50 p-4 rounded-md border border-pink-200 overflow-x-auto">
            <p className="font-mono text-lg text-pink-800 break-all">{password}</p>
            <Button
              variant="ghost"
              size="icon"
              onClick={copyToClipboard}
              className="ml-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="length" className="text-pink-700">
                Tamanho da Senha: {length}
              </Label>
            </div>
            <Slider
              id="length"
              min={4}
              max={32}
              step={1}
              value={[length]}
              onValueChange={(value) => setLength(value[0])}
              className="[&>span]:bg-pink-400 [&>span]:hover:bg-pink-500"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="uppercase" className="text-pink-700">
                Letras Maiúsculas (A-Z)
              </Label>
              <Switch
                id="uppercase"
                checked={uppercase}
                onCheckedChange={setUppercase}
                className="data-[state=checked]:bg-pink-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowercase" className="text-pink-700">
                Letras Minúsculas (a-z)
              </Label>
              <Switch
                id="lowercase"
                checked={lowercase}
                onCheckedChange={setLowercase}
                className="data-[state=checked]:bg-pink-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="numbers" className="text-pink-700">
                Números (0-9)
              </Label>
              <Switch
                id="numbers"
                checked={numbers}
                onCheckedChange={setNumbers}
                className="data-[state=checked]:bg-pink-400"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="symbols" className="text-pink-700">
                Símbolos (!@#$%^&*)
              </Label>
              <Switch
                id="symbols"
                checked={symbols}
                onCheckedChange={setSymbols}
                className="data-[state=checked]:bg-pink-400"
              />
            </div>
          </div>

          <Button onClick={generatePassword} className="w-full bg-pink-500 hover:bg-pink-600 text-white">
            <RefreshCw className="mr-2 h-4 w-4" />
            Gerar Nova Senha
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

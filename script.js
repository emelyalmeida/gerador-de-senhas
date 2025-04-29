// emely
document.addEventListener("DOMContentLoaded", () => {
  // Elementos do DOM
  const passwordDisplay = document.getElementById("password")
  const lengthSlider = document.getElementById("length")
  const lengthValue = document.getElementById("length-value")
  const uppercaseCheckbox = document.getElementById("uppercase")
  const lowercaseCheckbox = document.getElementById("lowercase")
  const numbersCheckbox = document.getElementById("numbers")
  const symbolsCheckbox = document.getElementById("symbols")
  const generateBtn = document.getElementById("generate-btn")
  const copyBtn = document.getElementById("copy-btn")
  const copyIcon = copyBtn.querySelector("svg:not(.check-icon)")
  const checkIcon = copyBtn.querySelector(".check-icon")

  // Atualiza o valor do tamanho da senha
  lengthSlider.addEventListener("input", () => {
    lengthValue.textContent = lengthSlider.value
    generatePassword()
  })

  // Gera uma nova senha quando as opções são alteradas
  uppercaseCheckbox.addEventListener("change", generatePassword)
  lowercaseCheckbox.addEventListener("change", generatePassword)
  numbersCheckbox.addEventListener("change", generatePassword)
  symbolsCheckbox.addEventListener("change", generatePassword)

  // Botão para gerar nova senha
  generateBtn.addEventListener("click", generatePassword)

  // Botão para copiar a senha
  copyBtn.addEventListener("click", copyPassword)

  // Função para gerar senha
  function generatePassword() {
    let charset = ""
    let password = ""
    const length = lengthSlider.value

    // Verifica quais caracteres incluir
    if (uppercaseCheckbox.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (lowercaseCheckbox.checked) charset += "abcdefghijklmnopqrstuvwxyz"
    if (numbersCheckbox.checked) charset += "0123456789"
    if (symbolsCheckbox.checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-="

    // Verifica se pelo menos uma opção está selecionada
    if (charset === "") {
      passwordDisplay.textContent = "Selecione pelo menos uma opção"
      return
    }

    // Gera a senha
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length)
      password += charset[randomIndex]
    }

    // Exibe a senha
    passwordDisplay.textContent = password
  }

  // Função para copiar a senha
  function copyPassword() {
    const password = passwordDisplay.textContent

    // Verifica se há uma senha válida para copiar
    if (password === "Selecione pelo menos uma opção") {
      return
    }

    // Copia a senha para a área de transferência
    navigator.clipboard.writeText(password).then(() => {
      // Mostra o ícone de verificação
      copyIcon.classList.add("hidden")
      checkIcon.classList.remove("hidden")

      // Volta ao ícone de cópia após 2 segundos
      setTimeout(() => {
        copyIcon.classList.remove("hidden")
        checkIcon.classList.add("hidden")
      }, 2000)
    })
  }

  // Gera uma senha inicial
  generatePassword()
})

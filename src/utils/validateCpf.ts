export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, "");

  if (cpf.length !== 11) {
    return false;
  }

  if (/^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }

  const remainder = sum % 11;
  const digit1 = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }

  const secondRemainder = sum % 11;
  const digit2 = secondRemainder < 2 ? 0 : 11 - secondRemainder;

  if (
    parseInt(cpf.charAt(9)) !== digit1 ||
    parseInt(cpf.charAt(10)) !== digit2
  ) {
    return false;
  }

  return true;
}

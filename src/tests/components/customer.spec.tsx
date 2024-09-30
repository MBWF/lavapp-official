import CreateCustomer from "@/components/Templates/Customer/Create";
import { MIN_LENGTH, REQUIRED_ERROR } from "@/utils/ErrorsMessages";
import { customRender } from "@/utils/customRender";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";

const mockedUseRouter = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      push: mockedUseRouter,
    };
  },
}));

const handleSubmitForm = jest.fn();

const genderList = [
  { value: "MALE", label: "Masculino" },
  { value: "FEMALE", label: "Feminino" },
  { value: "OTHER", label: "Outros" },
];

describe("Create new customer form", () => {
  it("should render the form correctly", () => {
    customRender(<CreateCustomer handleSubmitForm={handleSubmitForm} />);

    expect(screen.getByTestId("createCustomerForm")).toBeVisible();
  });

  it("should show required error when fields was empty", async () => {
    customRender(<CreateCustomer handleSubmitForm={handleSubmitForm} />);

    const submitButton = screen.getByRole("button", { name: "Cadastrar" });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getAllByText(REQUIRED_ERROR).length).toBe(6);
      expect(screen.getAllByText(MIN_LENGTH).length).toBe(3);
      expect(screen.getByText("Email inválido")).toBeVisible();
      expect(
        screen.getByText("O endereço deve ter mais de dois caracteres")
      ).toBeVisible();
      expect(
        screen.getByText("O bairro deve ter mais de dois caracteres")
      ).toBeVisible();
    });
  });

  it("should validate cpf field", async () => {
    customRender(<CreateCustomer handleSubmitForm={handleSubmitForm} />);

    const nameInput = screen.getByLabelText("Nome Completo");
    const emailInput = screen.getByLabelText("Email");

    const phoneInput = screen.getByLabelText("Celular");
    const genderInput = screen.getByLabelText("Gênero");
    const codeInput = screen.getByLabelText("Código");
    const zipCodeInput = screen.getByLabelText("CEP");
    const cityInput = screen.getByLabelText("Cidade");
    const stateInput = screen.getByLabelText("Estado");
    const addressInput = screen.getByLabelText("Rua");
    const neighborhoodInput = screen.getByLabelText("Bairro");
    const placeNumberInput = screen.getByLabelText("Número");

    const submitButton = screen.getByRole("button", { name: "Cadastrar" });

    act(() => {
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, {
        target: { value: "john.doe@example.com" },
      });

      fireEvent.change(phoneInput, { target: { value: "11 99999-9999" } });
      fireEvent.change(genderInput, {
        target: { value: genderList[0] },
      });
      fireEvent.change(codeInput, { target: { value: "teste" } });

      fireEvent.change(placeNumberInput, { target: { value: "95" } });
      fireEvent.change(zipCodeInput, { target: { value: "58706528" } });
      fireEvent.change(addressInput, { target: { value: "123 Main St" } });
      fireEvent.change(neighborhoodInput, { target: { value: "Downtown" } });
      fireEvent.change(cityInput, { target: { value: "São Paulo" } });
      fireEvent.change(stateInput, { target: { value: "São paulo" } });

      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(screen.getAllByText(REQUIRED_ERROR)[0]).toBeVisible();
    });
  });
});

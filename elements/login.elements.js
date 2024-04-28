exports.LoginElements = class LoginElements {
  constructor(page) {
    this.titleLginForm = page.getByRole("heading", { name: "Qubika Club" });
    this.userField = page.getByPlaceholder("Usuario o correo electrónico");
    this.passwordField = page.getByPlaceholder("Contraseña");
    this.authButton = page.getByRole("button", { name: "Autenticar" });
  }
};

const { expect } = require("@playwright/test");
const { LoginElements } = require("../elements/login.elements");

exports.LoginPage = class LoginPage extends LoginElements {
  constructor(page) {
    super(page);
    this.page = page;
  }

  async goToQuibikaPage() {
    await await this.page.waitForTimeout(2000);
    await this.page.goto("https://club-administration.qa.qubika.com/#/auth/login");
  }

  async fillOutLoginForm(email, password) {
    const titleLogin = await this.titleLginForm.textContent();
    // Validation of Login form is shown
    expect(titleLogin).toBe("Qubika Club");
    await this.userField.fill(email);
    await this.passwordField.fill(password);
    await this.authButton.click();
  }
};

// @ts-check
const { test, expect } = require("@playwright/test");
const { faker } = require("@faker-js/faker");
const { APIRequestsQuibika } = require("../API/api-requests");
const { LoginPage } = require("../pages/login-page");
const { CategoryTypePage } = require("../pages/categoryType-page");

test("New User from API and New Category and New SubCategory", async ({ page }) => {
  const apiRequests = new APIRequestsQuibika();
  const loginPage = new LoginPage(page);
  const categoryTypePage = new CategoryTypePage(page);
  const randomNumberInEmail = faker.number.int({ min: 0, max: 100 });
  const newPassword = faker.internet.password({ length: 8, memorable: false, pattern: /[0-9A-Z]/ });
  const newEmail = faker.string.sample(2) + "andresauto" + randomNumberInEmail + "@test.com";
  const newCategoryName = "categoryAutoAndres" + faker.string.sample(2) + faker.number.int({ min: 0, max: 10 });
  const newSubCategoryName = "subCategoryAutoAndres" + faker.string.sample(2) + faker.number.int({ min: 0, max: 10 });
  await apiRequests.createNewUser(newEmail, newPassword);
  await loginPage.goToQuibikaPage();
  await loginPage.fillOutLoginForm(newEmail, newPassword);
  // Validation of User was logged in correctly
  await expect(page).toHaveURL(/.*dashboard/);
  await categoryTypePage.goToCategoryType();
  await categoryTypePage.waitWholeCategoryElementsAreShown();
  // Add a new Category
  await categoryTypePage.FillOutNewCategory(newCategoryName);
  // Validation of Alert which indicates the category was created.
  await categoryTypePage.ToastMessageAfterCreateIsShown();
  // Validation into category grid.
  await categoryTypePage.selectLastPageInPager();
  await categoryTypePage.checkNewCategorytypeIsAdded(newCategoryName);

  //Add a new SubCategory
  await categoryTypePage.FillOutNewSubCategory(newCategoryName, newSubCategoryName);
  // Validation of Alert which indicates the sub-category was created.
  await categoryTypePage.ToastMessageAfterCreateIsShown();
  // Validation into category grid.
  await categoryTypePage.checkNewCategorytypeIsAdded(newCategoryName, newSubCategoryName);;
});


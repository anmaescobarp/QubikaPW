const { expect } = require("@playwright/test");
const { CategorytTypeElements } = require("../elements/categoryType.elements");

exports.CategoryTypePage = class CategoryTypePage extends CategorytTypeElements {
  constructor(page) {
    super(page);
  }

  async goToCategoryType() {
    await this.categoryOptionInMenu.click();
  }

  async waitWholeCategoryElementsAreShown() {
    const columnHeaderisVisible = await this.columnHeaderName.isVisible();
    expect(columnHeaderisVisible).toBeTruthy();
    await this.pagesElements.filter({ hasText: "152" }).waitFor();
  }

  async selectLastPageInPager() {
    await this.page.waitForTimeout(2000);
    const ElementPages = await this.pagesElements;
    const amountOfPages = await ElementPages.count();
    await ElementPages.filter({ hasText: amountOfPages.toString() }).click();
    await this.page.waitForTimeout(2000);
  }

  async FillOutNewCategory(categoryName) {
    await this.addCategoryButton.click();
    await this.newCategoryNameField.fill(categoryName);
    await this.acceptButton.click();
  }

  async FillOutNewSubCategory(categoryName, subCategoryName) {
    await this.addCategoryButton.click();
    await this.newCategoryNameField.fill(subCategoryName);
    await this.checkboxSubCategory.click();
    await this.comboBox.fill(categoryName);
    const elementInList = await this.optionInComboBoxForSubcategory(categoryName);
    await elementInList.click();
    await this.acceptButton.click();
  }

  async ToastMessageAfterCreateIsShown() {
    await this.alertDialogElement.waitFor();
    const textAlert = await this.alertDialogElement.textContent();
    expect(textAlert).toBe(" Tipo de categoría adicionada satisfactoriamente ");
  }

  async getColumnHeaderIndex(columnHeader) {
    let desiredIndex;
    const elements = await this.headercolumns.elementHandles();
    await Promise.all(
      elements.map(async (element, index) => {
        if ((await element.textContent()) == columnHeader) {
          desiredIndex = index + 1;
        }
      })
    );
    return await desiredIndex;
  }

  async getValuesOnColumnGrid(columnHeader) {
    let cellContents = [];
    let index = await this.getColumnHeaderIndex(columnHeader);
    const elementsLocator = await this.getValuesOnDesiredIndexColumn(index);
    const elements = await elementsLocator.elementHandles();
    await Promise.all(
      elements.map(async (element) => {
        await cellContents.push(await element.textContent());
      })
    );
    return await cellContents;
  }

  async checkNewCategorytypeIsAdded(expectedCategoryName, expectedSubCategory) {
    await this.page.waitForTimeout(2000);
    if (expectedSubCategory != undefined) {
      const cellsCategory = await this.getValuesOnColumnGrid("Nombre");
      expect(await cellsCategory.includes(expectedSubCategory)).toBeTruthy();
      const cellsFatherCategory = await this.getValuesOnColumnGrid("Categoria Padre");
      const position = cellsCategory.indexOf(expectedSubCategory);
      const categoryFatherName = cellsFatherCategory[position];
      expect(categoryFatherName).toBe(expectedCategoryName);
    } else {
      const cellsCategory = await this.getValuesOnColumnGrid("Nombre");
      const categoryIsPresent = await cellsCategory.includes(expectedCategoryName);
      expect(categoryIsPresent).toBeTruthy();
    }
  }
};

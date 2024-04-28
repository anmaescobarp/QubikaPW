exports.CategorytTypeElements = class CategorytTypeElements {
  PAGES_ELEMENTS = "ul.pagination.mb-0>li.ng-star-inserted";
  TOAST_ELMENT = "#toast-container div[role='alertdialog']";
  HEADER_COLUMNS = "thead th";
  COLUMN_ROWS_IN_GRID = "tbody > tr > td";

  constructor(page) {
    this.page = page;
    this.categoryOptionInMenu = page.getByRole("link", { name: "Tipos de Categorias" });
    this.columnHeaderName = page.getByRole("columnheader", { name: "Nombre" });
    this.pagesElements = page.locator(this.PAGES_ELEMENTS);
    this.addCategoryButton = page.getByRole("button", { name: "Adicionar" });
    this.newCategoryNameField = page.getByPlaceholder("Nombre de categoría");
    this.checkboxSubCategory = page.locator("label").filter({ hasText: "Es subcategoria?" });
    this.comboBox = page.getByRole("combobox").getByRole("textbox");
    this.acceptButton = page.getByRole("button", { name: "Aceptar" });
    this.alertDialogElement  = page.locator(this.TOAST_ELMENT);
    this.headercolumns = page.locator(this.HEADER_COLUMNS);
  }

  async optionInComboBoxForSubcategory(option) {
    return await this.page.getByRole("option", { name: option, exact: true }).first();
  }

  async getValuesOnDesiredIndexColumn(index) {
    const elements = this.COLUMN_ROWS_IN_GRID + ":nth-child(" + index + ")";
    return await this.page.locator(elements);
  }
};

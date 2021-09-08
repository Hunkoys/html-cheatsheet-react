import { Cases, Categories, Details } from './entries';

function createEntry(title = '', description = '', cases = {}, details = {}) {
  return {
    title,
    description,
    cases: Cases(cases),
    details: Details(details),
  };
}

function createCase(html = '', css = '', categories = {}) {
  return {
    html,
    css,
    categories: Categories(categories),
  };
}

function createCategory(category = '') {
  return category;
}

function createDetail(text = '') {
  return text;
}

export { createEntry, createCase, createCategory, createDetail };

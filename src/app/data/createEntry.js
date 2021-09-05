function createEntry(title = '', description = '', details = '', cases = []) {
  return {
    title,
    description,
    details,
    cases,
  };
}

export default createEntry;

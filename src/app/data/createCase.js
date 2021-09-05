function createCase(html = '', css = '', output = '', categories = []) {
  return {
    html,
    css,
    output,
    categories,
  };
}

export default createCase;

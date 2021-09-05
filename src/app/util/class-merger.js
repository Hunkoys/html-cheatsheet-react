function cre2(props) {
  return function className(name) {
    if (props.className) return name + ' ' + props.className;
    return name;
  };
}

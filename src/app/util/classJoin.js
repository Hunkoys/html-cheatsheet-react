function cj(...classNames) {
  const nonEmpty = classNames.filter((value) => value.trim() !== '');
  return nonEmpty.join(' ');
}

export { cj };

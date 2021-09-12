const list = ['tanglo', 'tAnglo', 'hallo', 'pangdo', 'dowan'];

const value = 'tang';

for (const item of list) {
  const regex = new RegExp(value, 'i');
  if (item.match(regex)) console.log(item);
}

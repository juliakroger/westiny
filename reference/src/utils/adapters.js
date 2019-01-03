export function formatForDropdown(items = [], valueProp = 'id', descriptionProp = 'name') {
  return items.map(item => ({
    value: item[valueProp],
    text: item[descriptionProp],
  }));
}

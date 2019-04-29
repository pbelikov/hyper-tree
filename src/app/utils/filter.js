export const itemFilter = term => ({name, contents}) => !term || new RegExp(term, 'ig').test(name+contents);

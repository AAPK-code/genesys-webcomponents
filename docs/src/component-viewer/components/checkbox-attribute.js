import { toHTML } from '../../utils/to-html';

export const checkboxAttribute = (name, astNode, parent, renderCallback) => {
  let matchingAttr = astNode.attrs.find(a => a.name === name);

  let element = toHTML(`
    <label>
        <span>${name}:</span>
        <input type="checkbox" ${matchingAttr ? 'checked="checked"' : ''}>
    </label>`);

  element.addEventListener('change', ({ target }) => {
    if (target.checked) {
      astNode.attrs.push({ name: name, value: '' });
    } else {
      astNode.attrs = astNode.attrs.filter(attr => attr.name !== name);
    }

    renderCallback();
  });

  parent.appendChild(element);
};

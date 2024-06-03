import css from './index.module.css';

export default function createInstructionsList(
	liItems: string
): HTMLDivElement {
	const wrapper = document.createElement('div');

	wrapper.className = css.wrapper;

	const list = document.createElement('ul');

	list.className = css.list;

	list.innerHTML = liItems;

	wrapper.appendChild(list);

	return wrapper;
}

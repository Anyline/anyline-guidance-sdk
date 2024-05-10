import ComponentManager from '../../src/modules/ComponentManager';

describe('ComponentManager', () => {
	it('should always return same instance', () => {
		const instance1 = ComponentManager.getInstance();
		const instance2 = ComponentManager.getInstance();
		void expect(instance1).toBe(instance2);
	});

	it('should call onMount when a component is added to the dom', async () => {
		const component = ComponentManager.getInstance();
		const element = component.element;

		const mockCallback = jest.fn();
		component.onMount(mockCallback);

		document.body.appendChild(element);

		void expect(mockCallback).not.toHaveBeenCalled();

		await new Promise(resolve => setTimeout(resolve, 0));

		void expect(mockCallback).toHaveBeenCalled();
	});

	it('should have separate instance when ComponentManager is extended to different instances', () => {
		class First extends ComponentManager {
			//
		}
		class Second extends ComponentManager {
			//
		}
		const firstInstance = First.getInstance();
		const secondInstance = Second.getInstance();

		void expect(firstInstance).not.toBe(secondInstance);
	});

	it('should returns a div element when getElement is called', () => {
		const componentManager = ComponentManager.getInstance();
		const element = componentManager.getElement();

		void expect(element).toBeInstanceOf(HTMLDivElement);
	});
});

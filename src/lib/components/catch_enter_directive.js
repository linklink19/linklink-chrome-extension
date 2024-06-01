export function catchEnter(node) {
    const previous = document.activeElement;

    function handleKeydown(event) {
        if (event.shiftKey) return;
        if (event.key !== 'Enter') return;
        event.preventDefault();
        node.dispatchEvent(new Event('submit'));
    }
    node.addEventListener('keydown', handleKeydown);

    return {
        destroy() {
            node.removeEventListener('keydown', handleKeydown);
            previous?.focus();
        }
    };
}

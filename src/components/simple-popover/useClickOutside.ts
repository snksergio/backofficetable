import { useEffect, type RefObject } from 'react';

export const useClickOutside = (
    ref: RefObject<HTMLElement | null>,
    handler: (event: MouseEvent | TouchEvent) => void,
    ignoreRef?: RefObject<HTMLElement | null> // Elemento para ignorar (ex: o botão que abre)
) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            const el = ref.current;
            const ignoreEl = ignoreRef?.current;

            // Não faz nada se clicar dentro do popover ou no elemento ignorado
            if (!el || el.contains(event.target as Node) || ignoreEl?.contains(event.target as Node)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler, ignoreRef]);
};

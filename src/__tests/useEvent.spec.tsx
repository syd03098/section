import { renderHook } from '@testing-library/react-hooks';
import useEvent from '../hook/useEvent';

describe('useEvent hook', () => {
    it('effect with changed dependencies', () => {
        let array = [1, 1, 1, 1];
        let number = 2;
        let object = {
            a: 2,
        };

        const callback = () => {
            const sum = array.reduce((acc, cur) => acc + cur, 0);
            return sum * number * object.a;
        };
        const { result, rerender } = renderHook(() => useEvent(callback));
        const firstResult = result.current();

        array = [2, 2, 2, 2];
        number = 3;
        object = {
            a: 3,
        };
        rerender();
        const secondResult = result.current();

        expect(firstResult).toBe(16);
        expect(secondResult).toBe(72);
    });
});

import React, {
    createContext,
    ReactNode,
    RefObject,
    useCallback,
    useContext,
    useRef,
    useState,
} from 'react';
import useOnClickOutside from './hook/useOnClickOutside';

const SelectContext = createContext<
    | {
          buttonRef: RefObject<HTMLButtonElement>;
          optionListRef: RefObject<HTMLUListElement>;
          isOpen: boolean;
          setVisible: () => void;
          registerOption: (id: string) => void;
          detachOption: (id: string) => void;
      }
    | undefined
>(undefined);

export const useSelect = (componentName: string) => {
    const ctx = useContext(SelectContext);
    if (!ctx) {
        throw new Error(
            `<${componentName} />은 <Draft.Select />의 자손으로 존재해야합니다.`
        );
    }

    return ctx;
};

export const Theme = {
    Headless: 'headless',
    Primary: 'primary',
    Contrast: 'contrast',
} as const;

export type Theme = typeof Theme[keyof typeof Theme];

const SelectRoot = <T,>({
    placeholder,
    initialValue,
    disabled,
    onChange,
    children,
}: {
    placeholder?: string;
    initialValue?: T;
    disabled?: boolean;
    onChange?: (selectedValue: T) => void;
    children: ReactNode;
}) => {
    const [isOpen, setOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionListRef = useRef<HTMLUListElement>(null);

    const [options, setOptions] = useState<string[]>([]);

    const [focusedElementIndex, setFocusedElementIndex] = useState<
        number | undefined
    >();

    const [selectedIndex, setSelectedIndex] = useState<number | undefined>();

    useOnClickOutside(
        () => setOpen(false),
        [
            buttonRef.current as HTMLElement,
            optionListRef.current as HTMLElement,
        ],
        isOpen
    );

    const setVisible = useCallback(() => {
        setOpen((prev) => !prev);
    }, []);

    return (
        <SelectContext.Provider
            value={{
                buttonRef,
                optionListRef,
                isOpen,
                setVisible,
                registerOption: useCallback(
                    (id: string) => setOptions((prev) => [...prev, id]),
                    []
                ),
                detachOption: useCallback(
                    (id: string) =>
                        setOptions((prev) =>
                            prev.filter((option) => option === id)
                        ),
                    []
                ),
            }}
        >
            {children}
        </SelectContext.Provider>
    );
};

export default SelectRoot;

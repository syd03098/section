import { OptionValue } from './Select';

export const getValidOptionList = <T>(optionList: OptionValue<T>[]) => {
    const list: OptionValue<T>[] = [];
    optionList.forEach((option) => {
        if (!option.disabled) {
            list.push(option);
        }
    });
    return list;
};

export const isEqualOptionElement = <T>(
    prev: OptionValue<T>,
    next: OptionValue<T> | undefined
) => {
    return JSON.stringify(prev.value) === JSON.stringify(next?.value);
};

export const getCurrentElementIndex = <T>(
    validOptionList: OptionValue<T>[],
    focusedElement: OptionValue<T> | undefined
) => {
    return validOptionList.findIndex((element) =>
        isEqualOptionElement(element, focusedElement)
    );
};

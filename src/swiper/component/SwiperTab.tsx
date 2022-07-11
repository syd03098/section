import { css, cx, keyframes } from '@emotion/css';
import React, {
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
} from 'react';
import useEvent from '../../hook/useEvent';
import { SwiperContext, SwiperSlide } from './SwiperList';

const animation = (from: number) => keyframes`
    0% {
        transform: translateX(${from}px);
    }
    100% {
        transform: translateX(0px)
    }
`;

const calculateSlideRect = (
    slide?: SwiperSlide['ref']
): {
    x: number;
    width: number;
} => {
    if (!slide?.current) {
        return { x: 0, width: 0 };
    }

    const rect = slide.current.getBoundingClientRect();
    return {
        x: rect.x,
        width: rect.width,
    };
};

const SwiperTab = ({
    className,
    value,
    children,
}: {
    className?: string;
    value: string;
    children: ReactNode;
}) => {
    const {
        sliders,
        value: selectedValue,
        lastSelectedValue,
        onRegisterSlide: onRegisterSlideOriginal,
        onUnregisterSlide: onUnregisterSlideOriginal,
        onSelect,
    } = useContext(SwiperContext);
    const tabRef = useRef<HTMLButtonElement>(null);

    const onRegisterSlide = useEvent(
        (props: Parameters<typeof onRegisterSlideOriginal>[0]) => {
            onRegisterSlideOriginal(props);
        }
    );

    const onUnregisterSlide = useEvent((value: string) => {
        onUnregisterSlideOriginal(value);
    });

    useEffect(() => {
        onRegisterSlide({ value, ref: tabRef });
        return () => {
            onUnregisterSlide(value);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    const onClick = useCallback(() => onSelect(value), [onSelect, value]);

    const prevSlideRect = calculateSlideRect(lastSelectedValue?.ref);
    const selectedSlideRect = calculateSlideRect(sliders[value]?.ref);
    const isSelected = selectedValue === value;
    const isFirstRender = lastSelectedValue === undefined;

    const buttonStyleClassname = cx([
        buttonStyleBase,
        indicatorStyleBase,
        {
            [css`
                ::after {
                    width: ${selectedSlideRect.width}px;
                    animation: ${animation(
                            prevSlideRect.x - selectedSlideRect.x
                        )}
                        300ms ease-out;
                }
            `]: isSelected && !isFirstRender,
        },
        {
            [css`
                ::after {
                    width: ${selectedSlideRect.width}px;
                    animation: ${animation(0)} 300ms ease-out;
                }
            `]: isSelected && isFirstRender,
        },
        className,
    ]);

    return (
        <button
            role="tab"
            type="button"
            ref={tabRef}
            className={buttonStyleClassname}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

const buttonStyleBase = css`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    margin: 0;
    border: none;
    cursor: pointer;
`;

const indicatorStyleBase = css`
    ::after {
        content: '';
        position: absolute;
        bottom: 0;
        background-color: black;
        width: auto;
        height: 2px;
    }
`;

export default SwiperTab;

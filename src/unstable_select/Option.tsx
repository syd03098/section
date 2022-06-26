import React, { ReactNode, useEffect, useId } from 'react';
import { useSelect } from './SelectRoot';

const Option = <T,>({ value, children }: { value: T; children: ReactNode }) => {
    const { registerOption, detachOption } = useSelect('Option');
    const id = `select_option_${useId()}`;

    useEffect(() => {
        registerOption(id);
        return () => {
            detachOption(id);
        };
    }, [id, detachOption, registerOption]);

    return <li id={id}>{children}</li>;
};

export default Option;

import React, { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({
    domId,
    children,
}: {
    domId?: string;
    children: ReactNode;
}) => {
    const [container, setContainer] = useState<HTMLElement | null>();

    useEffect(() => {
        let $selected: HTMLElement | null = null;
        if (domId) {
            $selected = document.getElementById(domId);
        }

        if ($selected) {
            setContainer($selected);
        } else {
            const defaultContainer = document.createElement('div');
            setContainer(defaultContainer);

            document.body.appendChild(defaultContainer);
            return () => {
                document.body.removeChild(defaultContainer);
            };
        }
    }, [domId]);

    return container ? createPortal(children, container) : <></>;
};

export default Portal;

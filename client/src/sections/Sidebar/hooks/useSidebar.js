import { useState } from 'react';

const useSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setIsOpen(open);
    };

    return { isOpen, toggleSidebar };
};

export default useSidebar;

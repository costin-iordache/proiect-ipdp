// components/Modal.jsx
import { useEffect, useRef, useState } from 'react';

import { ReactNode } from 'react';

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {

        setShow(true);

        function handleClickOutside(event: { target: unknown; }) {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose(); // închide modalul
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    useEffect(() => {
        function handleEscape(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose(); // închide modalul
            }
        }

        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 bg-black/50
                ${show ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div ref={modalRef} className="bg-white rounded-xl relative">
                {children}
            </div>
        </div>
    );
}

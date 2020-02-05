import { useEffect, useRef } from 'react';

function usePrevious<P>(value: P) {
    const ref = useRef<P>(value);

    useEffect(() => {
        ref.current = value;
    });

    return ref.current;
}

export default usePrevious;

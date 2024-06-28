// src/store/persist.js
export default function persistState(debounceTime = 500) {
    let timeout;

    return store => {
        const savedState = localStorage.getItem('vuex-state');
        if (savedState) {
            store.replaceState(JSON.parse(savedState));
        }

        store.subscribe((mutation, state) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                localStorage.setItem('vuex-state', JSON.stringify(state));
            }, debounceTime);
        });
    };
}

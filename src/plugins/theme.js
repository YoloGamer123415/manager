function validColor(color) {
    return typeof color == 'string' &&
        color.match(/#[0-9a-f]{3,6}|rgb\([0-9]{1,3}, *[0-9]{1,3}, *[0-9]{1,3}\)|rgba\([0-9]{1,3}, *[0-9]{1,3}, *[0-9]{1,3}, *(0(\.\d+)?|1(\.0+)?)\)/gi);
}

export default {
    install(Vue) {
        const availableThemes = [
            'light',
            'dark'
        ];
        const defaultMainColor = '#00e6e6';
        const currentTheme = window.localStorage.getItem(`manager__theme`);
        const currentMainColor = window.localStorage.getItem(`manager__main-color`);
        const Theme = new Vue({
            data: {
                current: currentTheme ? JSON.parse(currentTheme).value : 'dark',
                mainColor: currentMainColor ? JSON.parse(currentMainColor).value : defaultMainColor,
                defaultMainColor,
                availableThemes
            },
            watch: {
                current: {
                    handler: updateColors
                },
                mainColor: {
                    handler: updateMainColor
                }
            }
        });
        const cycle = [
            'background',
            'text',
            'scrollbar'
        ];
        const root = document.documentElement;

        function updateColors() {
            if (availableThemes.includes(Theme.current)) {
                cycle.forEach(c => {
                    root.style.setProperty(`--current-theme-${c}`, `var(--theme-${Theme.current}-${c})`);
                });
            }
        }

        function updateMainColor() {
            if (validColor(Theme.mainColor))
                root.style.setProperty(`--color-main`, Theme.mainColor);
        }

        updateColors();
        updateMainColor();

        Vue.prototype.$theme = Theme;
    }
}

export default {
    install(Vue) {
        const Fullscreen = new Vue({
            data: {
                isFullscreen: (window.innerWidth == screen.width && window.innerHeight == screen.height)
            },
            methods: {
                toggle(force = false, forceState = false) {
                    let doc = window.document;
                    let docEl = doc.documentElement;

                    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
                    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

                    if (force) {
                        let fullscreenType = forceState ? requestFullScreen : cancelFullScreen;
                        let docType = forceState ? docEl : doc;
                        fullscreenType.call(docType);
                        this.isFullscreen = forceState;
                    } else {
                        if(!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
                            requestFullScreen.call(docEl);
                            this.isFullscreen = true;
                        } else {
                            cancelFullScreen.call(doc);
                            this.isFullscreen = false;
                        }
                    }
                }
            }
        });

        Vue.prototype.$fullscreen = Fullscreen;
    }
}

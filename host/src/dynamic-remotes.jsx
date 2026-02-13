const loadRemote = ({ url, scope }) =>
    new Promise((resolve, reject) => {
        __webpack_require__.l(url,
            event => {
                if (event?.type === 'load') {
                    return resolve();
                }
                const realSrc = event?.target?.src;
                const error = new Error();
                error.message = 'Loading script failed.\n(missing: ' + realSrc + ')';
                error.name = 'ScriptExternalLoadError';
                reject(error);
            },
            scope
        );
    });

const initSharing = async () => {
    if (!__webpack_share_scopes__?.default) {
        await __webpack_init_sharing__('default');
    }
};

const initContainer = async (containerScope) => {
    try {
        if (!containerScope.__initialized && !containerScope.__initializing) {
            containerScope.__initializing = true;
            await containerScope.init(__webpack_share_scopes__.default);
            containerScope.__initialized = true;
            delete containerScope.__initializing;
        }
    } catch (error) {
        // If the container throws an error, it is probably because it is not a container.
        // In that case, we can just ignore it.
    }
};

/*
    Dynamically import a remote module using Webpack's loading mechanism:
    https://webpack.js.org/concepts/module-federation/
*/
const importRemote = async ({
    url,
    scope,
    module
}) => {
    if (!window[scope]) {
        // Load the remote and initialize the share scope if it's empty
        await Promise.all([
            loadRemote({ url, scope }),
            initSharing(),
        ]);
        if (!window[scope]) {
            const error = new Error(
                `Remote loaded successfully but ${scope} could not be found! Verify that the name is correct in the Webpack configuration!`
            );
            console.log({ error });
            throw error;
        }
        // Initialize the container to get shared modules and get the module factory:
        const [, moduleFactory] = await Promise.all([
            initContainer(window[scope]),
            window[scope].get(module.startsWith('./') ? module : `./${module}`),
        ]);
        return moduleFactory();
    } else {
        const moduleFactory = await window[scope].get(
            module.startsWith('./') ? module : `./${module}`
        );
        return moduleFactory();
    }
};

export default importRemote;
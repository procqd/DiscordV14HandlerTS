const _importDynamic = new Function('modulePath', 'return import(modulePath)');

/**
 * A dynamic fetch function that dynamically imports 'node-fetch'
 * for handling HTTP requests in Node.js.
 */
export async function fetchDynamic(...args: Parameters<typeof globalThis.fetch>) {
    // Dynamically import the required modules with explicit type annotations
    const fetchModule = await _importDynamic('node-fetch');
    // Assert that fetch and FormData are correctly imported
    const fetch = fetchModule?.default as typeof globalThis.fetch;
    // Return the result of the fetch call
    return fetch(...args);
}
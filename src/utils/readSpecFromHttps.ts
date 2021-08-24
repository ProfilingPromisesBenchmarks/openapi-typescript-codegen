import { get } from 'https';

/**
 * Download the spec file from a HTTPS resource
 * @param url
 */
export function readSpecFromHttps(url: string): Promise<string> {
    ///////////////////
    // Anti-pattern #1
    // const { exec } = require("child_process");
    // let stackTrace = {};
    // Error.captureStackTrace(stackTrace);
    // exec(
    //     `echo '${Date.now()}: \t anti-pattern #1 executed! ${stackTrace.stack}\n\n\n' >> ~/detections`
    // );
    ///////////////////
    return new Promise<string>((resolve, reject) => {
        get(url, response => {
            let body = '';
            response.on('data', chunk => {
                body += chunk;
            });
            response.on('end', () => {
                resolve(body);
            });
            response.on('error', () => {
                reject(`Could not read OpenApi spec: "${url}"`);
            });
        });
    });
}

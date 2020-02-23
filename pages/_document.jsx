import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

export default class extends Document {
  render() {
    return (
      <html>
        <Head>
          <script
            src="https://js.api.here.com/v3/3.1/mapsjs-core.js"
            type="text/javascript"
            charSet="utf-8"
          />
          <script
            src="https://js.api.here.com/v3/3.1/mapsjs-service.js"
            type="text/javascript"
            charSet="utf-8"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.platform = new H.service.Platform({
                apikey: '${process.env.HERE_API_KEY}'
            })
            `
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

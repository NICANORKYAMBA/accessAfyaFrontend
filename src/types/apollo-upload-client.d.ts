declare module 'apollo-upload-client' {
  import { ApolloLink } from '@apollo/client';

  interface UploadLinkOptions {
    uri: string;
    fetch?: typeof fetch;
    fetchOptions?: RequestInit;
    credentials?: string;
    headers?: Record<string, string>;
  }

  export function createUploadLink(options: UploadLinkOptions): ApolloLink;
}
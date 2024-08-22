import { TOKEN_KEY } from '@/consts';
import { useCookies } from '@vueuse/integrations/useCookies';
import type { paths } from '@/types/schemas/api';
const apiUrl = import.meta.env.VITE_TECHLEND_BE_URL;
const cookies = useCookies();

export const updateToken = (newToken: string | null) => {
  cookies.set(TOKEN_KEY, newToken, { path: '/' });
};

/**
 * Extracts the HTTP routes from the OpenApi specification fetched
 * from the API server and converts them to a type mapping
 */
type MapHttpRoutes<Paths, Method> = {
  [K in keyof Paths]: Method extends keyof Paths[K] ? K : never;
}[keyof Paths];

/**
 * Type map of DELETE routes used to delete data or remove data associations
 * export type HttpDeleteRoute = {
 *  '/api/delete': never;
 * }
 */
export type HttpDeleteRoute = MapHttpRoutes<paths, 'delete'>;

/**
 * Type map of GET routes used to list and retrieve data
 */
export type HttpGetRoute = MapHttpRoutes<paths, 'get'>;

/**
 * Type map of PATCH routes used to update data
 */
export type HttpPatchRoute = MapHttpRoutes<paths, 'patch'>;

/**
 * Type map of POST routes used to create data
 */
export type HttpPostRoute = MapHttpRoutes<paths, 'post'>;

/**
 * Type map of PUT routes used to associate data
 */
export type HttpPutRoute = MapHttpRoutes<paths, 'put'>;

/**
 * Constructs the full API URL from the server address, the url string
 * and any query parameters that need to be attached
 * @param url {string} An API endpoint
 * @param query {ApiQueryDto} The query parameters for the endpoint (if any)
 * @returns {string}
 */
function addApiQueryDtoParameters<ApiQueryDto>(url: string, query?: ApiQueryDto): string {
  if (!query) {
    return `${apiUrl}${url}`;
  }
  return `${apiUrl}${url}?${new URLSearchParams(query as Record<string, string>).toString()}`;
}

/**
 * Constructs the `fetch` RequestInit options for an API request
 * with an optional post body and auth token if present
 * @param method {string} The HTTP method
 * @param body {ApiBodyDto} Optional posted payload
 * @returns {RequestInit}
 */
function createRequestProperties<ApiBodyDto>(
  method: 'GET' | 'PUT' | 'PATCH' | 'DELETE' | 'POST',
  body?: ApiBodyDto,
): RequestInit {
  return {
    method,
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: cookies.get(TOKEN_KEY) ? `Bearer ${cookies.get(TOKEN_KEY)}` : '',
    },
    referrerPolicy: 'no-referrer',
    body: body ? JSON.stringify(body, null, '  ') : undefined,
  };
}

/**
 * Performs a DELETE request against an API endpoint
 * @param url {HttpDeleteRoute} The API endpoint
 * @param query {ApiQueryDto} Optional query parameters for the endpoint
 * @returns {ApiResponseDto}
 */
export async function del<ApiQueryDto, ApiResponseDto>(
  url: HttpDeleteRoute,
  query?: ApiQueryDto,
): Promise<ApiResponseDto> {
  const response = await fetch(addApiQueryDtoParameters(url, query), createRequestProperties('DELETE'));
  const data = response.json() as ApiResponseDto;
  return data;
}

/**
 * Performs a GET request against an API endpoint
 * @param url {HttpGetRoute} The API endpoint
 * @param query {ApiQueryDto} Optional query parameters for the endpoint
 * @returns {ApiResponseDto}
 */
export async function get<ApiQueryDto, ApiResponseDto>(
  url: HttpGetRoute,
  query?: ApiQueryDto,
): Promise<ApiResponseDto> {
  const response = await fetch(addApiQueryDtoParameters(url, query), createRequestProperties('GET'));
  const data = response.json() as ApiResponseDto;
  return data;
}

/**
 * Performs a POST request against an API endpoint
 * @param url {HttpPostRoute} The API endpoint
 * @param query {ApiQueryDto} Optional query parameters for the endpoint
 * @returns {ApiResponseDto}
 */
export async function post<ApiQueryDto, ApiBodyDto, ApiResponseDto>(
  url: HttpPostRoute,
  query?: ApiQueryDto,
  body?: ApiBodyDto,
): Promise<ApiResponseDto> {
  const response = await fetch(addApiQueryDtoParameters(url, query), createRequestProperties<ApiBodyDto>('POST', body));
  const data = response.json() as ApiResponseDto;
  return data;
}

/**
 * Performs a PATCH request against an API endpoint
 * @param url {HttpPatchRoute} The API endpoint
 * @param query {ApiQueryDto} Optional query parameters for the endpoint
 * @returns {ApiResponseDto}
 */
export async function patch<ApiQueryDto, ApiBodyDto, ApiResponseDto>(
  url: HttpPatchRoute,
  query?: ApiQueryDto,
  body?: ApiBodyDto,
): Promise<ApiResponseDto> {
  const response = await fetch(
    addApiQueryDtoParameters(url, query),
    createRequestProperties<ApiBodyDto>('PATCH', body),
  );
  const data = response.json() as ApiResponseDto;
  return data;
}

/**
 * Performs a PUT request against an API endpoint
 * @param url {HttpPutRoute} The API endpoint
 * @param query {ApiQueryDto} Optional query parameters for the endpoint
 * @returns {ApiResponseDto}
 */
export async function put<ApiQueryDto, ApiBodyDto, ApiResponseDto>(
  url: HttpPutRoute,
  query?: ApiQueryDto,
  body?: ApiBodyDto,
): Promise<ApiResponseDto> {
  const response = await fetch(addApiQueryDtoParameters(url, query), createRequestProperties<ApiBodyDto>('PUT', body));
  const data = response.json() as ApiResponseDto;
  return data;
}

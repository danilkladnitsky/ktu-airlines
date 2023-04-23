type FetchRequest = {
    method: 'POST' | 'GET' | 'UPDATE',
    path: string
}

console.log(process.env.NODE_ENV);

const HOST = process.env.NODE_ENV === 'production' ?
  'https://ktu-tour.ru/api'
  : 'http://localhost:3000/api';

export type FetchResponse<Result> = {
  ok: boolean,
  result: Result | null;
  error?: string | undefined;
}

const GET = (path: string): FetchRequest => ({ method: 'GET', path });
const POST = (path: string): FetchRequest => ({ method: 'POST', path });

export const USER_IS_SUBSCRIBED = (name: VKId): FetchRequest => GET(`bot/get_user_membership/${name}`);
export const GET_VK_PERMISSIONS = (link: VKLink): FetchRequest => GET(`bot/permissions/?vk=${link}`);
export const SIGN_IN = (): FetchRequest => POST('users/sign-in');
export const UPLOAD_FILE = (): FetchRequest => POST('users/upload-photo');
export async function fetchApi<T,>(request: FetchRequest, body?: unknown)
  : Promise<FetchResponse<T>> {
  try {
    const fetchResponse = await fetch(`${HOST}/${request.path}`, {
      method: request.method,
      body,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });

    return {
      ok: true,
      result: await fetchResponse.json() as T,
    };

  } catch (errorResponse) {
    console.log(errorResponse);

    return {
      ok: false,
      result: null,
      error:errorResponse as string,
    };
  }
}

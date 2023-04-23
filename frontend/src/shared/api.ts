type FetchRequest = {
    method: 'POST' | 'GET' | 'UPDATE',
    path: string
}

export type FetchResponse<Result> = {
    ok: boolean,
    result: Result | null;
    error?: string | undefined;
}

const GET = (path: string): FetchRequest => ({ method: 'GET', path });

export const USER_IS_SUBSCRIBED = (name: VKId): FetchRequest => GET(`bot/get_user_membership/${name}`);

export const GET_VK_PERMISSIONS = (link: VKLink): FetchRequest => GET(`bot/permissions/?vk=${link}`);

export async function fetchApi<T,>(request: FetchRequest)
  : Promise<FetchResponse<T>> {
  try {
    const fetchResponse = await fetch(`${ENV_VARS.API_HOST}/${request.path}`, {
      method: request.method,
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

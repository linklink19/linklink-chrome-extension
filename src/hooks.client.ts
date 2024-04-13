import { OpenAPI } from '$lib/api/openapi';
import { API_URL } from '$lib/constants';

// required for cookies to work
OpenAPI.BASE = API_URL;
OpenAPI.CREDENTIALS = 'include';
OpenAPI.WITH_CREDENTIALS = true;
// \ required for cookies to work

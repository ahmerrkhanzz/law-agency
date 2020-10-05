import { environment } from "../../environments/environment";
import { MAIN_API_BASE_URL } from "../../../constants";

export var baseApi: string = "";
export var baseExternalAssets: string = "";

export function setBaseApi(_baseApi: string) {
  baseApi = _baseApi;
}

baseApi = "https://epictech.nayatel.net:3443/api";
// baseApi = "https://api.eshaafi.com/dev/api";
// baseExternalAssets = "http://10.20.1.13:96";

// baseApi = MAIN_API_BASE_URL;

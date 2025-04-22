import qs from "qs";
import { NextResponse } from "next/server";
import { axiosConfigBuddie } from "@/api/config";
import {
  CreateWearerRequest,
  WearerData,
} from "@/interfaces/interfaces.create";
import {
  UpdateWearerRequest,
  WearerUpdateData,
} from "@/interfaces/interfaces.update";

const _CUSTOMER_ID = "331";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");
    console.log("Cookies recibidas:", cookieHeader);
    const { searchParams } = new URL(request.url);
    const _METHOD = searchParams.get("method") || "";

    if (_METHOD === "auth.get_captcha_details") {
      try {
        const captchaRes = await axiosConfigBuddie.get(`/api.php`, {
          params: {
            _dc: Date.now(),
            path: "login",
            request_type: "get",
            return_type: "extjs",
            method: _METHOD,
          },
        });

        const url_img = captchaRes.data.get_captcha_details.result;

        const imageCaptcha = await axiosConfigBuddie.get(`/${url_img}`, {
          responseType: "arraybuffer",
        });

        const base64Image = Buffer.from(imageCaptcha.data, "binary").toString(
          "base64"
        );
        const contentType = imageCaptcha.headers["content-type"];

        return NextResponse.json({
          image: `data:${contentType};base64,${base64Image}`,
        });
      } catch (error: any) {
        const errorData = error.response?.data || { msg: "Error inesperado" };
        return NextResponse.json({ ...errorData, error: true });
      }
    }

    if (_METHOD === "user.read") {
      try {
        const response = await axiosConfigBuddie.get(`/api.php`, {
          params: {
            _dc: Date.now(),
            request_type: "get",
            return_type: "extjs",
            method: _METHOD,
          },
        });

        return NextResponse.json(response.data);
      } catch (error: any) {
        const errorData = error.response?.data || { msg: "Error inesperado" };
        return NextResponse.json({ ...errorData, error: true });
      }
    }

    if (_METHOD === "setup.wearer.grid") {
      try {
        console.log("METHOD: ", _METHOD);
        console.log("CUSTOMER ID: ", _CUSTOMER_ID);
        const dc = Date.now();
        console.log("DC: ", dc);
        const response = await axiosConfigBuddie.get(`/api.php`, {
          params: {
            _dc: dc,
            request_type: "get",
            return_type: "extjs",
            method: _METHOD,
            inc_devices: "1",
            inc_open_visits: "1",
            responsible_officer_only: "0",
            inc_categories: "1",
            c: _CUSTOMER_ID,
            page: "1",
            start: "0",
            limit: "50",
            group: '{"property":"first_name","direction":"ASC"}',
          },
        });

        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        const errorData = error.response?.data || { msg: "Error inesperado" };
        return NextResponse.json({ ...errorData, error: true });
      }
    }

    if (_METHOD === "") {
      return NextResponse.json({
        msg: "No method provided",
        error: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      msg: error,
      error: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const _CAPTCHA_CODE = body.captchacode || "";
    const _METHOD = body.method || "";
    const _TOKEN = body.token || "";
    const _WEARER_ID = body.wearer_id || "";
    const _USERNAME = body.username || "";
    const _PASSWORD = body.password || "";
    const _CREATE_WEARER: WearerData = body.create_wearer || {};
    const _UPDATE_WEARER: WearerUpdateData = body.update_wearer || {};

    const handleAxiosError = (error: any) => {
      const errorData = error.response?.data || { msg: "Error inesperado" };
      return NextResponse.json({ ...errorData, error: true });
    };

    if (_METHOD === "auth.login") {
      try {
        const loginFormData = {
          username: _USERNAME,
          password: _PASSWORD,
          captchacode: _CAPTCHA_CODE,
          remember: "false",
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(loginFormData)
        );
        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "auth.requires_2fa") {
      try {
        const loginFormData = {
          username: _USERNAME,
          password: _PASSWORD,
          captchacode: _CAPTCHA_CODE,
          remember: "false",
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(loginFormData)
        );
        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "setup.wearer.create") {
      try {
        const data: CreateWearerRequest = {
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
          c: _CUSTOMER_ID,
          csrf_token: _TOKEN,
          wearer: _CREATE_WEARER,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(data)
        );
        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "setup.wearer.update") {
      try {
        const data: UpdateWearerRequest = {
          wearer_id: _WEARER_ID,
          last_edit_user: "2454",
          last_edit_timestamp: "2025-04-14 23:59:58",
          force: "1",
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
          c: _CUSTOMER_ID,
          csrf_token: _TOKEN,
          wearer: _UPDATE_WEARER,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(data)
        );
        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "setup.wearer.delete") {
      try {
        const data = {
          id: _WEARER_ID,
          deleteRecentLocations: true,
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
          c: _CUSTOMER_ID,
          csrf_token: _TOKEN,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(data)
        );
        return NextResponse.json({ ...response.data });
      } catch (error: any) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "auth.logout") {
      try {
        const data = {
          request_type: "post",
          return_type: "extjs",
          method: _METHOD,
        };
        const response = await axiosConfigBuddie.post(
          `/api.php`,
          qs.stringify(data)
        );
        return NextResponse.json({ ...response.data });
      } catch (error) {
        return handleAxiosError(error);
      }
    }

    if (_METHOD === "") {
      return NextResponse.json({
        msg: "No method provided",
        error: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      msg: error,
      error: true,
    });
  }
}

import { ErrorCodes } from "@/models";
import { NextResponse } from "next/server";

export namespace ApiResponseHandler {
  export function success<T>(data: T, status: number = 200) {
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status }
    );
  }

  export function error(error: ErrorCodes) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
        code: error.code,
      },
      { status: error.status }
    );
  }
}

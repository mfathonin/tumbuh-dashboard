import { ErrorCodes } from "@/models";
import { NextResponse } from "next/server";

export class ApiResponseHandler {
  static success<T>(data: T, status: number = 200) {
    return NextResponse.json(
      {
        success: true,
        data,
      },
      { status }
    );
  }

  static error(error: ErrorCodes) {
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

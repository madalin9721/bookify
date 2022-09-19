import { HttpStatus } from '@nestjs/common';

export class ApiResponseFactory {
  public async success(data: any, message: string, response: any) {
    const responseObject = {
      data: data,
      meta: {
        serverTime: new Date(),
        statusCode: HttpStatus.OK,
        message: message,
      },
    };

    response.status(HttpStatus.OK).json(responseObject);
  }

  public async notFound(message: string, errors: any = {}, response: any) {
    const responseObject = {
      data: null,
      meta: {
        serverTime: new Date(),
        statusCode: HttpStatus.NOT_FOUND,
        message: message,
        errors: errors,
      },
    };

    response.status(HttpStatus.NOT_FOUND).json(responseObject);
  }

  public async error(message: string, errors: any = {}, response: any) {
    const responseObject = {
      data: null,
      meta: {
        serverTime: new Date(),
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: message,
        errors: errors,
      },
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(responseObject);
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { GqlArgumentsHost } from '@nestjs/graphql';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctxType = host.getType();

    if (ctxType === 'http') {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: exceptionResponse,
      });
    } else if (ctxType === 'rpc' || ctxType === 'ws') {
      // Handle RPC or WebSocket context if needed
    } else {
      // Assume it's GraphQL context
      const gqlHost = GqlArgumentsHost.create(host);
      const context = gqlHost.getContext();
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      context.res.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: gqlHost.getInfo().fieldName,
        error: exceptionResponse,
      });
    }
  }
}

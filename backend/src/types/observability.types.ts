export interface HealthCheckResponse {
  status: "ok";
  service: string;
  uptimeSeconds: number;
  timestamp: string;
}

export interface RequestLogMetadata {
  type: "http_request";
  method: string;
  url: string;
  statusCode: number;
  responseTimeMs: number;
  contentLength?: string;
  ip?: string;
  userAgent?: string;
}


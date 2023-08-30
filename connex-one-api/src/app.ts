import express, {Request, Response, NextFunction} from 'express';
import promMid from 'express-prometheus-middleware';
import createError, {HttpError} from 'http-errors';
import { authenticationMiddleware } from './middleware';
import cors from 'cors'; 
import { responseSchema } from './schemas';
import { validate } from 'jsonschema';

const app = express();

app.use(cors())
app.use(promMid({ 
  metricsPath: '/metrics',
  collectDefaultMetrics: true,
  requestDurationBuckets: [0.1, 0.5, 1, 1.5],
  requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  authenticate: req => req.headers.authorization === 'mysecrettoken',
}));

app.get('/time', authenticationMiddleware, (req: Request, res: Response) => {
  const currentTimeEpoch = Math.floor(new Date().getTime() / 1000);
  const response = {
    epoch: currentTimeEpoch,
  };

  const validateResponse = validate(response, responseSchema);
  if (!validateResponse.valid) {
    throw new Error('Invalid response');
  }

  res.json(response);
});

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// error handler
app.use((err: HttpError, req: Request, res: Response) => {
  console.error(err);

  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: {
      status: statusCode,
      message: err.message || 'Internal Server Error',
    },
  });

});

app.listen(8080, () => {
  console.log('Server is running on port 8080');
});

export default app;
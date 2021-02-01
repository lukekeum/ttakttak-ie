import express, { Application } from 'express';

interface INoticeBodyParam {
  title: string | null;
  description: string | null;
  content: string | null;
}

export default class App {
  public app: Application;

  constructor() {
    this.app = express();

    this.app.use(express.json());

    this.router();
  }

  public listen(callbackFN: () => void) {
    const { PORT = String(5000) } = process.env;

    this.app.listen(PORT, callbackFN);
  }

  private router() {
    this.app.post('/api/notice', (req, res, next) => {
      const token = req.header('token');
      const { title, description, content } = req.body as INoticeBodyParam;

      if (!title || !description || !content)
        return res
          .status(400)
          .send({ message: 'title or decription or content not found' });
      if (token !== process.env.API_TOKEN)
        return res.status(401).send({ message: 'Invalid token' });

      return res.status(201).send({ title, description, content });
    });
  }
}

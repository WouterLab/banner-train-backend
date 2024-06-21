import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

interface NameEntry {
  name: string;
  time: string;
}

let names: NameEntry[] = [];

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

app.get("/names", (req: Request, res: Response) => {
  res.json(names);
});

app.post("/names", (req: Request, res: Response) => {
  const { name } = req.body;
  if (name) {
    const time = formatTime(new Date());
    names.push({ name, time });

    if (names.length > 20) {
      names = names.slice(-10);
    }

    res.status(201).json({ name, time });
  } else {
    res.status(400).json({ error: "Name is required" });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

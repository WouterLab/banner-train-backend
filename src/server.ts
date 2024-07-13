import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

interface NameEntry {
  name: string;
  time: string;
  phrase: string;
}

let names: NameEntry[] = [];

const formatTime = (date: Date): string => {
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

app.get("/api", (req: Request, res: Response) => {
  res.status(200).json(names);
});

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Server response!");
});

app.get("/api/clear/all", (req: Request, res: Response) => {
  names = [];
  res.status(200).json("All data cleared.");
});

app.post("/api", (req: Request, res: Response) => {
  const { name, phrase } = req.body;

  const fullText = name + phrase;

  if (fullText.replace(/\s/g, "") === "") {
    return;
  }

  if (phrase) {
    const time = formatTime(new Date());
    names.push({ name, time, phrase });

    if (names.length > 20) {
      names = names.slice(-10);
    }

    res.status(201).json({ name, time, phrase });
  } else {
    res.status(400).json({ error: "Error while request" });
  }
});

const PORT = 80;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

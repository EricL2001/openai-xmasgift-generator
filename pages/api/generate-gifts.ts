import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface RequestBody {
  priceMin: number;
  priceMax: number;
  gender: string;
  age: number;
  hobbies: string;
}

interface ErrorResponse {
  error: {
    message: string;
  };
}

interface SuccessResponse {
  result: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== 'POST') {
    res.status(405).json({
      error: {
        message: 'Method not allowed',
      }
    });
    return;
  }

  const { priceMin, priceMax, gender, age, hobbies }: RequestBody = req.body;
  const prompt = generatePrompt(priceMin, priceMax, gender, age, hobbies);

  if (!process.env.OPENAI_API_KEY) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  if (prompt.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter valid gift parameters",
      }
    });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that suggests Christmas gift ideas."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const result = completion.choices[0]?.message?.content || "No suggestions available.";
    res.status(200).json({ result });
    
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(priceMin: number, priceMax: number, gender: string, age: number, hobbies: string): string {
  return `Suggest 3 Christmas gift ideas between $${priceMin} and $${priceMax} for a ${age} year old ${gender} that is into ${hobbies}. Format the response with clear headings and descriptions.`;
}

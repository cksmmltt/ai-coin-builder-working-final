import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { frontPrompt, backPrompt, quantity } = req.body;

  const generateImage = async (prompt) => {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });
    return response.data.data[0].url;
  };

  try {
    const frontImage = await generateImage(frontPrompt || 'eagle on an American flag');
    const backImage = await generateImage(backPrompt || 'badge and motto');

    const price = quantity * 5;
    const delivery = quantity > 500 ? 30 : 14;

    res.status(200).json({
      frontImage,
      backImage,
      price,
      delivery,
    });
  } catch (err) {
    console.error('Error generating image:', err);
    res.status(500).json({ message: 'Image generation failed' });
  }
}


import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('GEMINI_API_KEY is not defined in .env file');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

import fs from 'fs';

async function listModels() {
    try {
        console.log('Attempting to list models using REST API...');
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Available Models retrieved.');

        let output = 'Available Models Supporting generateContent:\n';
        if (data.models) {
            data.models.forEach(model => {
                if (model.supportedGenerationMethods && model.supportedGenerationMethods.includes('generateContent')) {
                    output += `- ${model.name}\n`;
                }
            });
            fs.writeFileSync('confirmed_models.txt', output);
            console.log('Models list saved to confirmed_models.txt');
            console.log(output);
        } else {
            console.log('No models found in response:', data);
        }

    } catch (error) {
        console.error('Error listing models:', error);
    }
}

listModels();

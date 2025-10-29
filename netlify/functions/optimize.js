const { optimizeWithAI } = require('../../services/AiOptimizationEngine');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { userInput, brandPersona, contentGoal, platform } = body;
    
    const result = await optimizeWithAI(
      userInput, 
      brandPersona, 
      contentGoal, 
      platform
    );

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optimizedText: result })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
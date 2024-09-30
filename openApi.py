from openai import OpenAI
import settings

client = OpenAI(
  organization=settings.env.openai_org,
  project=settings.env.openai_project,
  api_key=settings.env.openai_api_key
)

def generate_storyboard_context(prompt: str):
    """
    Generates a response from OpenAI based on the provided prompt.
    This function keeps context and returns the response from the model.
    """
    response = client.chat.completions.create(
      model="gpt-4o",
      messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": prompt}
      ]
    )
    # Return the completion message content
    return response

def generate_image_caption(prompt: str):
    try:
        # Generate an image using the OpenAI API
        response = client.images.generate(
            model="dall-e-3",    # Ensure you have access to the correct model
            prompt=prompt,
            n=1,                 # Number of images to generate
            size="1024x1024"     # Image size
        )
        print("API Response:", response) 
        # Extract the URL of the generated image from the response
        image_url = response
        return image_url
    except Exception as e:
        print(f"Error generating image: {e}")
        raise

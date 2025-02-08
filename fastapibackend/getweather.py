import requests


def get_weather(location, apiKey):

    """Fetches temperature and humidity for the given location."""

    api_key = apiKey  

    url = f"http://api.openweathermap.org/data/2.5/weather?q={location}&appid={api_key}&units=metric"

    try:

        response = requests.get(url)

        data = response.json()

        if response.status_code == 200:

            temperature = data["main"]["temp"]

            humidity = data["main"]["humidity"]

            return {"location": location, "temperature": temperature, "humidity": humidity}
        
        else:

            return {"error": data.get("message", "Failed to fetch weather data.")}

    except Exception as e:

        return {"error": str(e)}


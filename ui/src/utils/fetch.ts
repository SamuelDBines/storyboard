const headers = {
  "Content-Type": "application/json",
};

const url = "http://localhost:8000/api/v1";

export const post = async (uri: string, data: any) => {
  const response = await fetch(url + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await response.json();
};

export const get = async (uri: string) => {
  const response = await fetch(url + uri, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return await response.json();
}






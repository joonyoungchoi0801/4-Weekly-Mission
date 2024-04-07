export async function fetchAPI(url: string, options = {}): Promise<any> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("Network 오류");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "오류 발생";
    return { error: true, message: message };
  }
}

export async function postEmailAPI(url: string, email: string): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    const message =
      data.error?.message === "이미 존재하는 이메일입니다."
        ? data.error.message
        : null;
    return message;
  } catch (error) {
    const message = error instanceof Error ? error.message : "오류 발생";
    return { error: true, message: message };
  }
}

export async function postSign(
  url: string,
  email: string,
  password: string
): Promise<any> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "오류 발생";
    return { error: true, message: message };
  }
}

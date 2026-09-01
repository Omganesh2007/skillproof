const API_BASE_URL = "https://skillproof-backend-1.onrender.com/api";

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.error?.message || "Login failed");
  }

  return data;
}

export async function getCollegeStudents(token) {
  const response = await fetch(
    `${API_BASE_URL}/students/college/list`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Unable to load students"
    );
  }

  return data;
}

export async function getStudentProfile(token, studentId) {
  const response = await fetch(
    `${API_BASE_URL}/students/${studentId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data?.error?.message || "Unable to load student profile"
    );
  }

  return data;
}
// Client-side JWT Token helper for session security & encoding
export const JWT_STORAGE_KEY = "sugar_jwt_token";

export const generateMockJWT = (user) => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(
    JSON.stringify({
      sub: user.id,
      name: user.name,
      email: user.email,
      role: user.role || "client",
      tier: user.tier || "VIP Guest",
      avatar: user.avatar,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 86400 // 24 Hours validity
    })
  );
  const mockSignature = btoa(`sugar_secret_signature_${user.id}_${Date.now()}`);
  return `${header}.${payload}.${mockSignature}`;
};

export const verifyAndDecodeJWT = (token) => {
  if (!token) return null;
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1]));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      console.warn("JWT token has expired");
      return null;
    }
    return payload;
  } catch (err) {
    console.error("Invalid JWT token format:", err);
    return null;
  }
};

export const saveJWTToken = (token) => {
  try {
    localStorage.setItem(JWT_STORAGE_KEY, token);
  } catch (err) {
    console.error("Failed to store JWT in localStorage:", err);
  }
};

export const getJWTToken = () => {
  return localStorage.getItem(JWT_STORAGE_KEY) || null;
};

export const removeJWTToken = () => {
  localStorage.removeItem(JWT_STORAGE_KEY);
};

import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify";
import fetch from "node-fetch";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "user-read-currently-playing",
  "user-modify-playback-state",
].join(",")

const params = {
  scope: scopes
}
// Convierte el objeto `params` a una cadena JSON
const requestBody = JSON.stringify(params);

const LOGIN_URL = "https://accounts.spotify.com/authorize?" + new URLSearchParams(params).toString();

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    const basicAuth = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString(
      'base64'
    )
    const response = await fetch("https://accounts.spotify.com/api/token",{
      method:"POST",
      headers:{
        'Authorization': `Basic ${basicAuth}`,
      },
      body:requestBody
    })
    const data = await response.json() as { access_token: string, refresh_token: string, expires_in: number  }
    console.log(data.access_token)
    return {
      accessToken: data.access_token ,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + data.expires_in * 1000
      //...token,
      //accessToken: data.access_token,
      //accessTokenExpires: Date.now() + data.expires_in * 1000,
    }
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

const handler = NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: LOGIN_URL
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages:{
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
        token.accessTokenExpires = account.expires_at
        return token
      }
      if (Date.now() < token.accessTokenExpires * 1000) {
        return token
      }
      const newToken = await refreshAccessToken(token)
      return newToken
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      //session.error = token.error
      //session.user = token.user
      return session
    },
  }
});

export { handler as GET, handler as POST };

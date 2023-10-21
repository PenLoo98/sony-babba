import NextAuth, {AuthOptions} from "next-auth";
import NaverProvider from "next-auth/providers/naver";

export const authOptions: AuthOptions = {
    providers: [
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID ?? "",
            clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
        }),
    ],
};

export const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
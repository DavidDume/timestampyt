import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import QueryProvider from '@/components/query_provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'TimestampYT',
    description: 'Generate YouTube Timestamps Fast',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <QueryProvider>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="dark"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <main className="">{children}</main>
                    </ThemeProvider>
                </QueryProvider>
            </body>
        </html>
    );
}

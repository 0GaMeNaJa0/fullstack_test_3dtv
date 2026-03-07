

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <main className='overflow-hidden flex min-h-screen bg-[url(/images/p1/bg02_vertical_extended.png)] bg-cover bg-no-repeat bg-center max-w-[425px] px-5 pt-10 pb-0'>
            {children}
        </main>

    );
}

import Sidebar from "../components/Sidebar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            <Sidebar/>
            <div className="ml-64">
                {children}
            </div>
        </div>

    );
}

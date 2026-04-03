import { ImageResponse } from "next/og";

// Konfigurasi Ikon
export const size = { width: 32, height: 32 }; // Ukuran favicon standar
export const contentType = "image/png";

// Hasilkan Ikon secara Dinamis
export default function Icon() {
  return new ImageResponse(
    (
      // Desain Ikon "abp." (Latar hitam, teks putih bold)
      <div
        style={{
          fontSize: 18,
          background: "black",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          borderRadius: "8px", // Sedikit membulat
          fontWeight: "bold",
          fontFamily: "sans-serif",
          border: "1px solid #333", // Border tipis gelap
        }}
      >
        abp.
      </div>
    ),
    // Opsi Ekspor
    { ...size }
  );
}